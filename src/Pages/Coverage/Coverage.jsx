import React from "react";
import MapView from "./MapView";


const Coverage = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">
        We are available in 64 districts
      </h1>

      {/* 🔍 Search Box Placeholder */}
      {/* <input
        type="text"
        placeholder="Search District"
        className="input input-bordered w-full max-w-md mx-auto block"
      /> */}

      {/* 🗺️ Map */}
      <MapView />
    </div>
  );
};

export default Coverage;
