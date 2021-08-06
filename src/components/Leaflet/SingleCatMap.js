import { useContext } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { v4 as uuid_v4 } from 'uuid';
import { ObservationContext } from '../../context/ObservationsContext';
import { theme, greenIcon, redIcon } from '../../utils/leafletConfig';

const SingleCatMap = ({ observations }) => {
  const { setCurrentObservation, setShowCanvas } = useContext(ObservationContext);

  return (
    <MapContainer center={[38.9072, -77.0369]} zoom={12} className='single-cat-map'>
      <TileLayer {...theme} />
      <MarkerClusterGroup key={uuid_v4()} zIndexOffset={1000}>
        {observations &&
          observations.map(observation => {
            const {
              _id,
              forReview,
              location: {
                coordinates: [lng, lat]
              }
            } = observation;
            return (
              <Marker
                key={_id}
                position={[lat, lng]}
                icon={forReview ? greenIcon : redIcon}
                zIndexOffset={1000}
                eventHandlers={{
                  click: () => {
                    setCurrentObservation(observation);
                    setShowCanvas(true);
                  }
                }}
              ></Marker>
            );
          })}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default SingleCatMap;
