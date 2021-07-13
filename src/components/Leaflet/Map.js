import { useContext, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { v4 as uuid_v4 } from 'uuid';
import { ObservationContext } from '../../context/ObservationsContext';
import ObservationItem from '../Observations/ObservationItem';

const Map = () => {
  const { newObservations, observationsForReview } = useContext(ObservationContext);
  return (
    <MapContainer
      center={[38.9072, -77.0369]}
      zoom={13}
      scrollWheelZoom={true}
      bounds={[
        [50.505, -29.09],
        [52.505, 29.09]
      ]}
      className='leaflet-container'
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
      />
      <MarkerClusterGroup key={uuid_v4()}>
        {newObservations.map(observation => {
          const {
            _id,
            location: {
              coordinates: [lng, lat]
            }
          } = observation;
          return (
            <Marker key={_id} position={[lat, lng]}>
              <Popup>
                <ObservationItem observation={observation} />
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
      <MarkerClusterGroup key={uuid_v4()}>
        {observationsForReview.map(observation => {
          const {
            _id,
            location: {
              coordinates: [lng, lat]
            }
          } = observation;
          return (
            <Marker key={_id} position={[lat, lng]}>
              <Popup>
                <ObservationItem observation={observation} />
              </Popup>
            </Marker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default memo(Map);
