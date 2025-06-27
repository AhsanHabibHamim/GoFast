import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import UseAxios from '../../hooks/UseAxios';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const MyPercels = () => {
  const axiosSecure = UseAxios();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch parcels for the logged-in user
  const { data: parcels = [], isLoading, isError, error } = useQuery({
    queryKey: ['parcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/email/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email, // Only run if email exists
  });

  // Delete handler
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this parcel?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/parcels/email/${user?.email}/${id}`);
        if (res.data?.deletedCount || res.data?.success) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Parcel deleted successfully.',
            timer: 1500,
            showConfirmButton: false,
          });
          // Refetch parcels
          queryClient.invalidateQueries(['parcels', user?.email]);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed!',
            text: 'Could not delete parcel.',
          });
        }
      } catch {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Server error. Try again later.',
        });
      }
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-primary">📦 My Parcels</h1>
      {parcels.length === 0 ? (
        <div className="text-gray-500">No parcels found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Parcel Name</th>
                <th>Type</th>
                <th>Weight (kg)</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map(parcel => (
                <tr key={parcel.tracking_id}>
                  <td className="font-mono">{parcel.tracking_id}</td>
                  <td>{parcel.parcel_name}</td>
                  <td>{parcel.parcel_type}</td>
                  <td>{parcel.parcel_weight}</td>
                  <td>
                    <span className={`badge ${parcel.delivery_status === 'delivered' ? 'badge-success' : 'badge-warning'}`}>
                      {parcel.delivery_status}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${parcel.payment_status === 'paid' ? 'badge-success' : 'badge-error'}`}>
                      {parcel.payment_status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(parcel._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyPercels;