import React from "react";
import Image from "/brands/clients7.png";
import Services from './../Services/Services';

const OurTeamCard = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* This is Card 1 */}
      <div className="card shadow-md bg-base-100 hover:shadow-xl transition duration-300">
        <div className="card-body items-start ">
          
          <h3 className="card-title text-xl font-semibold">
            Ahsan Habib Hamim
          </h3>
          <div><img src={Image} alt=""></img></div>
          <p className="text-sm text-gray-600 -mt-2">
            Junior Web Developer, Amazon WEB Service (AWS)
          </p>
        </div>
      </div>
      {/* This is Card 2 */}
      <div className="card shadow-md bg-base-100 hover:shadow-xl transition duration-300">
         <div className="card-body items-start ">
          
          <h3 className="card-title text-xl font-semibold">
            Ahsan Habib Hamim
          </h3>
          <div><img src={Image} alt=""></img></div>
          <p className="text-sm text-gray-600 -mt-2">
            Junior Web Developer, Amazon WEB Service (AWS)
          </p>
        </div>
      </div>
      {/* This is Card 3 */}
      <div className="card shadow-md bg-base-100 hover:shadow-xl transition duration-300">
         <div className="card-body items-start ">
          
          <h3 className="card-title text-xl font-semibold">
            Ahsan Habib Hamim
          </h3>
          <div><img src={Image} alt=""></img></div>
          <p className="text-sm text-gray-600 -mt-2">
            Junior Web Developer, Amazon WEB Service (AWS)
          </p>
        </div>
      </div>
      {/* This is Card 4 */}
      <div className="card shadow-md bg-base-100 hover:shadow-xl transition duration-300">
         <div className="card-body items-start ">
          
          <h3 className="card-title text-xl font-semibold">
            Ahsan Habib Hamim
          </h3>
          <div><img src={Image} alt=""></img></div>
          <p className="text-sm text-gray-600 -mt-2">
            Junior Web Developer, Amazon WEB Service (AWS)
          </p>
        </div>
      </div>
      {/* This is Card 5 */}
      <div className="card shadow-md bg-base-100 hover:shadow-xl transition duration-300">
         <div className="card-body items-start ">
          
          <h3 className="card-title text-xl font-semibold">
            Ahsan Habib Hamim
          </h3>
          <div><img src={Image} alt=""></img></div>
          <p className="text-sm text-gray-600 -mt-2">
            Junior Web Developer, Amazon WEB Service (AWS)
          </p>
        </div>
      </div>
      {/* This is Card 6 */}
      <div className="card shadow-md bg-base-100 hover:shadow-xl transition duration-300">
         <div className="card-body items-start ">
          
          <h3 className="card-title text-xl font-semibold">
            Ahsan Habib Hamim
          </h3>
          <div><img src={Image} alt=""></img></div>
          <p className="text-sm text-gray-600 -mt-2">
            Junior Web Developer, Amazon WEB Service (AWS)
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurTeamCard;
