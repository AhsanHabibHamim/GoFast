import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import warehouses from '../../Data/warehouses.json';
 // Assuming you have firebaseAuth set up
import useAuth from './../../hooks/useAuth';
import UseAxios from '../../hooks/UseAxios';

const regions = [...new Set(warehouses.map(w => w.region))];

const getDistrictsByRegion = (region) =>
  warehouses.filter(w => w.region === region).map(w => w.district);

function generateTrackingId() {
  // Example: QP-20240627-6DIGIT
  const date = new Date();
  const ymd = date.toISOString().slice(0,10).replace(/-/g,'');
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `QP-${ymd}-${rand}`;
}

const SendParcel = () => {

const axiosSecure = UseAxios();

  const [parcelType, setParcelType] = useState('document');
  const [senderRegion, setSenderRegion] = useState('');
  const [receiverRegion, setReceiverRegion] = useState('');
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { user } = useAuth(); // <-- get user from auth

  const senderDistricts = senderRegion ? getDistrictsByRegion(senderRegion) : [];
  const receiverDistricts = receiverRegion ? getDistrictsByRegion(receiverRegion) : [];

  // Pricing calculation function with breakdown
  const getPriceBreakdown = (type, weight, sender, receiver) => {
    weight = parseFloat(weight);
    const withinCity = sender === receiver;
    let base = 0, extra = 0, extraNote = '', total = 0;

    if (type === 'document') {
      base = withinCity ? 60 : 80;
      total = base;
      return {
        breakdown: [
          { label: withinCity ? 'Within City Document' : 'Outside City Document', value: `৳${base}` }
        ],
        total
      };
    } else {
      if (weight <= 3) {
        base = withinCity ? 110 : 150;
        total = base;
        return {
          breakdown: [
            { label: withinCity ? 'Within City Non-Document (≤3kg)' : 'Outside City Non-Document (≤3kg)', value: `৳${base}` }
          ],
          total
        };
      } else {
        const extraKg = Math.ceil(weight - 3);
        if (withinCity) {
          base = 110;
          extra = extraKg * 40;
          total = base + extra;
          extraNote = `Extra ${extraKg}kg × ৳40 = ৳${extra}`;
          return {
            breakdown: [
              { label: 'Within City Non-Document (first 3kg)', value: '৳110' },
              { label: extraNote, value: `+৳${extra}` }
            ],
            total
          };
        } else {
          base = 150;
          extra = extraKg * 40;
          total = base + extra + 40;
          extraNote = `Extra ${extraKg}kg × ৳40 = ৳${extra}`;
          return {
            breakdown: [
              { label: 'Outside City Non-Document (first 3kg)', value: '৳150' },
              { label: extraNote, value: `+৳${extra}` },
              { label: 'Additional Charge', value: '+৳40' }
            ],
            total
          };
        }
      }
    }
  };

  const onSubmit = async (data) => {
    const senderDistrict = data.senderWarehouse;
    const receiverDistrict = data.receiverWarehouse;
    const { breakdown, total } = getPriceBreakdown(
      parcelType,
      data.parcelWeight,
      senderDistrict,
      receiverDistrict
    );

    // Use user.email from auth
    const userEmail = user?.email || "unknown";

    // Prepare parcel data for backend
    const parcelData = prepareParcelData(data, total, userEmail);

    // Console log the data object
    console.log("Parcel Data to Save:", parcelData);

    // Build breakdown HTML
    const breakdownHtml = `
      <div style="text-align:left">
        <h3 style="margin-bottom:8px;font-size:1.1em;">Delivery Cost Breakdown</h3>
        <ul style="padding-left:18px;margin-bottom:12px;">
          ${breakdown.map(item => `<li style="margin-bottom:4px;"><b>${item.label}:</b> ${item.value}</li>`).join('')}
        </ul>
        <div style="font-weight:bold;font-size:1.1em;margin-bottom:12px;">Total: <span style="color:#16a34a">৳${total}</span></div>
      </div>
    `;

    const result = await Swal.fire({
      title: 'Confirm Your Booking',
      html: breakdownHtml,
      showCancelButton: true,
      confirmButtonText: 'Proceed to Pay',
      cancelButtonText: 'Back to Editing',
      reverseButtons: true,
      customClass: {
        confirmButton: 'swal2-confirm btn btn-success',
        cancelButton: 'swal2-cancel btn btn-outline'
      }
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.post('/parcels', parcelData);
        console.log("Backend Response:", res.data); // <-- Add this line
        if (res.data?.insertedId || res.data?.success) {
          Swal.fire({
            icon: 'success',
            title: 'Booking Done!',
            text: 'আপনার বুকিং সফলভাবে সম্পন্ন হয়েছে।',
            confirmButtonText: 'OK'
          });
          reset();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed!',
            text: 'বুকিং সংরক্ষণ করা যায়নি।',
            confirmButtonText: 'OK'
          });
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Server error. Try again later.',
          confirmButtonText: 'OK'
        });
        console.error(err);
      }
    }
    // No else needed, user can edit form if cancelled
  };

  const prepareParcelData = (formData, price, userEmail) => ({
    tracking_id: generateTrackingId(),
    parcel_type: parcelType,
    parcel_name: formData.parcelName,
    parcel_weight: parseFloat(formData.parcelWeight),
    sender: {
      name: formData.senderName,
      address: formData.senderAddress,
      contact: formData.senderContact,
      region: formData.senderRegion,
      warehouse: formData.senderWarehouse,
      pickup_instruction: formData.pickupInstruction || ""
    },
    receiver: {
      name: formData.receiverName,
      address: formData.receiverAddress,
      contact: formData.receiverContact,
      region: formData.receiverRegion,
      warehouse: formData.receiverWarehouse,
      delivery_instruction: formData.deliveryInstruction || ""
    },
    price,
    created_by: userEmail,
    created_time: new Date().toISOString(),
    payment_status: "unpaid",
    delivery_status: "undelivered"
  });


  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl p-8 mt-8 shadow">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Add Parcel</h1>
      <hr className="mb-6" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Enter your parcel details</h2>
          <div className="flex items-center gap-6 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="document"
                checked={parcelType === 'document'}
                onChange={() => setParcelType('document')}
                className="accent-green-500"
              />
              <span className="text-green-700 font-semibold">Document</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="non-document"
                checked={parcelType === 'non-document'}
                onChange={() => setParcelType('non-document')}
                className="accent-gray-400"
              />
              <span className="text-gray-700 font-semibold">Not-Document</span>
            </label>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Parcel Name"
                className="input input-bordered w-full"
                {...register('parcelName', { required: 'Parcel Name is required' })}
              />
              {errors.parcelName && <span className="text-red-500 text-xs">{errors.parcelName.message}</span>}
            </div>
            <div>
              <input
                type="number"
                placeholder="Parcel Weight (KG)"
                className="input input-bordered w-full"
                {...register('parcelWeight', {
                  required: 'Parcel Weight is required',
                  min: { value: 0.1, message: 'Weight must be at least 0.1 KG' }
                })}
              />
              {errors.parcelWeight && <span className="text-red-500 text-xs">{errors.parcelWeight.message}</span>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {/* Sender Details */}
          <div>
            <h3 className="font-bold text-lg mb-2">Sender Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Sender Name"
                  className="input input-bordered w-full"
                  {...register('senderName', { required: 'Sender Name is required' })}
                />
                {errors.senderName && <span className="text-red-500 text-xs">{errors.senderName.message}</span>}
              </div>
              <div>
                <select
                  className="input input-bordered w-full"
                  {...register('senderWarehouse', { required: 'Sender Warehouse is required' })}
                >
                  <option value="">Select Wire house</option>
                  {senderDistricts.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {errors.senderWarehouse && <span className="text-red-500 text-xs">{errors.senderWarehouse.message}</span>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Address"
                  className="input input-bordered w-full"
                  {...register('senderAddress', { required: 'Sender Address is required' })}
                />
                {errors.senderAddress && <span className="text-red-500 text-xs">{errors.senderAddress.message}</span>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Sender Contact No"
                  className="input input-bordered w-full"
                  {...register('senderContact', {
                    required: 'Sender Contact No is required',
                    pattern: {
                      value: /^[0-9+\- ]{6,20}$/,
                      message: 'Enter a valid contact number'
                    }
                  })}
                />
                {errors.senderContact && <span className="text-red-500 text-xs">{errors.senderContact.message}</span>}
              </div>
              <div>
                <select
                  className="input input-bordered w-full"
                  {...register('senderRegion', { required: 'Sender Region is required' })}
                  value={senderRegion}
                  onChange={e => setSenderRegion(e.target.value)}
                >
                  <option value="">Select your region</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                {errors.senderRegion && <span className="text-red-500 text-xs">{errors.senderRegion.message}</span>}
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Pickup Instruction (optional)"
                  className="input input-bordered w-full"
                  {...register('pickupInstruction')}
                />
              </div>
            </div>
          </div>
          {/* Receiver Details */}
          <div>
            <h3 className="font-bold text-lg mb-2">Receiver Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Receiver Name"
                  className="input input-bordered w-full"
                  {...register('receiverName', { required: 'Receiver Name is required' })}
                />
                {errors.receiverName && <span className="text-red-500 text-xs">{errors.receiverName.message}</span>}
              </div>
              <div>
                <select
                  className="input input-bordered w-full"
                  {...register('receiverWarehouse', { required: 'Receiver Warehouse is required' })}
                >
                  <option value="">Select Wire house</option>
                  {receiverDistricts.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {errors.receiverWarehouse && <span className="text-red-500 text-xs">{errors.receiverWarehouse.message}</span>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Address"
                  className="input input-bordered w-full"
                  {...register('receiverAddress', { required: 'Receiver Address is required' })}
                />
                {errors.receiverAddress && <span className="text-red-500 text-xs">{errors.receiverAddress.message}</span>}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Receiver Contact No"
                  className="input input-bordered w-full"
                  {...register('receiverContact', {
                    required: 'Receiver Contact No is required',
                    pattern: {
                      value: /^[0-9+\- ]{6,20}$/,
                      message: 'Enter a valid contact number'
                    }
                  })}
                />
                {errors.receiverContact && <span className="text-red-500 text-xs">{errors.receiverContact.message}</span>}
              </div>
              <div>
                <select
                  className="input input-bordered w-full"
                  {...register('receiverRegion', { required: 'Receiver Region is required' })}
                  value={receiverRegion}
                  onChange={e => setReceiverRegion(e.target.value)}
                >
                  <option value="">Select your region</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
                {errors.receiverRegion && <span className="text-red-500 text-xs">{errors.receiverRegion.message}</span>}
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Delivery Instruction (optional)"
                  className="input input-bordered w-full"
                  {...register('deliveryInstruction')}
                />
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          * PickUp Time 4pm-7pm Approx.
        </p>
        <button
          type="submit"
          className="btn btn-success w-full md:w-auto px-8 font-bold"
        >
          Proceed to Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default SendParcel;