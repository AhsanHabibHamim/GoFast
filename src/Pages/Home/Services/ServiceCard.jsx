const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="card shadow-md bg-base-100 hover:shadow-xl transition duration-300">
      <div className="card-body items-start space-y-3">
        <div>{icon}</div>
        <h3 className="card-title text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
