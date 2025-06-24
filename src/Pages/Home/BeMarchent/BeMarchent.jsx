import React from "react";
import Location from "../../../assets/location-merchant.png";

const BeMarchent = () => {
  return (
    <div className="bg-gradient-to-r from-[#03373D] via-[#045C5C] to-[#0A8A7B] py-12 px-4 rounded-3xl shadow-xl">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        <img
          src={Location}
          className="max-w-sm "
          alt="Merchant Location"
        />
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow">
            Merchant & Customer Satisfaction is Our First Priority
          </h1>
          <p className="py-4 text-lg text-[#CAEB66] font-medium">
            We offer the lowest delivery charge with the highest value along with
            100% safety of your product. Quick Parcel delivers your parcels in
            every corner of Bangladesh right on time.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <button className="btn rounded-full bg-[#CAEB66] text-[#03373D] font-bold border-none px-8 hover:bg-[#b6d95a] transition">
              Become a Merchant
            </button>
            <button className="btn rounded-full btn-outline border-[#CAEB66] text-[#CAEB66] font-bold px-8 hover:bg-[#CAEB66] hover:text-[#03373D] transition">
              Become a Merchant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeMarchent;
