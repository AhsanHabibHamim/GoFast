import Marquee from "react-fast-marquee";

const logos = [
  "/brands/clients1.png",
  "/brands/clients2.png",
  "/brands/clients3.png",
  "/brands/clients4.png",
  "/brands/clients5.png",
  "/brands/clients6.png",
  "/brands/clients7.png",
];

const ClientsLogoMerque = () => {
  return (
    <div className="py-4 mb-8 bg-gradient-to-b from-base-200 to-white">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-5 text-green-500 drop-shadow">
        Our Best Clent
      </h2>
      <Marquee speed={40} gradient={false} pauseOnHover={true}>
        {logos.map((logo, i) => (
          <div
            key={i}
            className="flex items-center justify-center mx-10"
          >
            <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:shadow-2xl border border-gray-100">
              <img
                src={logo}
                alt={`Client ${i + 1}`}
                className="h-20 w-auto object-contain"
                style={{ minWidth: "120px", maxWidth: "180px" }}
              />
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default ClientsLogoMerque;
