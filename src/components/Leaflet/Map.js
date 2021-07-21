import { useContext, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { v4 as uuid_v4 } from 'uuid';
import { ObservationContext } from '../../context/ObservationsContext';
import {
  theme,
  draw,
  getNewBoundsCreated,
  getNewBoundsEdit,
  greenIcon,
  redIcon,
  cameraIcon
} from '../../utils/leafletConfig';

const Map = () => {
  const {
    observationsMap,
    setQueryMainMap,
    deployments,
    setCurrentObservation,
    setShowCanvas,
    setSearchForm
  } = useContext(ObservationContext);

  const onCreated = event => {
    const newBounds = getNewBoundsCreated(event);
    setSearchForm(prev => ({ ...prev, ...newBounds }));
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
      {deployments.map(
        ({
          deployment_id,
          location: {
            coordinates: [lng, lat]
          }
        }) => (
          <Marker key={deployment_id} position={[lat, lng]} icon={cameraIcon} zIndexOffset={-1000}>
            <Popup>Deployment: {deployment_id}</Popup>
          </Marker>
        )
      )}
      <MarkerClusterGroup key={uuid_v4()} zIndexOffset={1000}>
        {observationsMap.map(observation => {
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

export default memo(Map);
