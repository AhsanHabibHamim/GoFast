import React from "react";
import OurTeamCard from "./OurTeamCard";

const OurTeam = () => {
  return (
    <div className="py-12 px-4 md:px-8 bg-green-200">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-5 text-green-500 drop-shadow">
        Our Team Member
      </h1>
      <OurTeamCard></OurTeamCard>
    </div>
  );
};

export default OurTeam;
