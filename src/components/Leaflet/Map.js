import { useContext, memo } from 'react';
import { Button } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { Link } from 'react-router-dom';
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
  cameraIcon,
  bounds,
  center
} from '../../utils/leafletConfig';

const Map = () => {
  const {
    observationsMap,
    setObservationsMap,
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
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      bounds={bounds}
      className='leaflet-container'
    >
      <FeatureGroup>
        <EditControl
          draw={draw}
          onCreated={onCreated}
          onEdited={onEdited}
          onDeleted={() => setObservationsMap([])}
        />
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
            <Popup>
              <Button as={Link} to={`/deployment/${deployment_id}`} className='popup-link'>
                Deployment: {deployment_id}
              </Button>
            </Popup>
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
