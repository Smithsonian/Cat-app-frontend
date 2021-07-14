import { useContext, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { v4 as uuid_v4 } from 'uuid';
import { ObservationContext } from '../../context/ObservationsContext';
import ObservationItem from '../Observations/ObservationItem';
import Loading from '../Navigation/Loading';
import { theme, draw, getNewBoundsCreated, getNewBoundsEdit } from '../../utils/leafletConfig';

const Map = () => {
  const { loadingMap, observationsNewMap, observationsReviewMap, setQueryMainMap } =
    useContext(ObservationContext);
  const onCreated = event => {
    const newBounds = getNewBoundsCreated(event);
    setQueryMainMap(prev => ({ ...prev, ...newBounds }));
  };

  const onEdited = event => {
    const newBounds = getNewBoundsEdit(event);
    setQueryMainMap(prev => ({ ...prev, ...newBounds }));
  };

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
      <FeatureGroup>
        <EditControl draw={draw} onCreated={onCreated} onEdited={onEdited} />
      </FeatureGroup>
      <TileLayer {...theme} />
      <MarkerClusterGroup key={uuid_v4()}>
        {observationsNewMap.map(observation => {
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
        {observationsReviewMap.map(observation => {
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
