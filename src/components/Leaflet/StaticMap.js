import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { theme, greenIcon, redIcon } from '../../utils/leafletConfig';

const StaticMap = ({
  currentObservation: {
    location: {
      coordinates: [lng, lat]
    },
    forReview
  }
}) => {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      scrollWheelZoom={false}
      zoomControl={false}
      dragging={false}
      className='map-static'
    >
      <TileLayer {...theme} />
      <Marker position={[lat, lng]} icon={forReview ? greenIcon : redIcon}></Marker>
    </MapContainer>
  );
};

export default StaticMap;
