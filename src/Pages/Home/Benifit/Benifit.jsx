import React from "react";
import liveTracking from "../../../assets/live-tracking.png";
import safeDelivery from "../../../assets/live-tracking.png";
import callCenter from "../../../assets/live-tracking.png";

const benefits = [
	{
		img: liveTracking,
		title: "Live Parcel Tracking",
		desc: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
	},
	{
		img: safeDelivery,
		title: "100% Safe Delivery",
		desc: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
	},
	{
		img: callCenter,
		title: "24/7 Call Center Support",
		desc: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
	},
];

const Benifit = () => {
	return (
		<section className="py-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-5 text-green-500 drop-shadow">
        Our Benefits
      </h2>
          <div className="w-full mx-auto space-y-8">
				{benefits.map((item, idx) => (
					<div
						key={idx}
						className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow p-6 md:p-8 gap-6"
					>
						<img
							src={item.img}
							alt={item.title}
							className="w-32 h-32 object-contain"
						/>
						<div className="flex-1">
							<h3 className="text-xl md:text-2xl font-bold text-[#03373D] mb-2">
								{item.title}
							</h3>
							<p className="text-gray-600 text-base">{item.desc}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Benifit;