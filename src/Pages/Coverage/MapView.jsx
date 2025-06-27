import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import districtsData from '../../Data/Warehouses.json';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapView = () => {
  const mapRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);

  // Only use entries with valid district, latitude, and longitude
  const validDistricts = districtsData.filter(
    d =>
      d.district &&
      typeof d.latitude === 'number' &&
      typeof d.longitude === 'number'
  );

  const handleSearch = () => {
    const query = searchText.trim().toLowerCase();
    if (!query) return;

    const index = validDistricts.findIndex(
      d =>
        d.district &&
        d.district.trim().toLowerCase() === query
    );
    const matched = validDistricts[index];

    if (matched && mapRef.current && index !== -1) {
      const { latitude, longitude } = matched;

      mapRef.current.setView([latitude, longitude], 10, {
        animate: true,
      });

      setActiveIndex(index);
      setError('');
    } else {
      setActiveIndex(null);
      setError(`District not found for "${searchText}". Try again.`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-2">
        <input
          type="text"
          placeholder="Search District..."
          className="input input-bordered w-full max-w-md"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        {error && activeIndex === null && (
          <div>
            <p className="text-red-500 text-sm">{error}</p>
            <ul className="text-xs mt-2">
              {validDistricts.map(d => (
                <li key={d.district}>{d.district}</li>
              ))}
            </ul>
          </div>
        )}
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>

      <div className="h-[500px] w-full rounded-lg shadow-md">
        <MapContainer
          center={[23.8103, 90.4125]}
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full"
          whenCreated={(mapInstance) => {
            mapRef.current = mapInstance;
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          />

          {validDistricts.map((district, index) => (
            <Marker
              key={index}
              position={[district.latitude, district.longitude]}
              eventHandlers={{
                click: () => setActiveIndex(index),
              }}
            >
              <Popup
                position={[district.latitude, district.longitude]}
                autoPan={true}
                onClose={() => setActiveIndex(null)}
              >
                {activeIndex === index ? (
                  <div className="space-y-1">
                    <h2 className="font-bold">{district.district}</h2>
                    <p><strong>Areas:</strong> {district.covered_area?.join(', ')}</p>
                    <a
                      href={district.flowchart}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Flowchart
                    </a>
                  </div>
                ) : null}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
