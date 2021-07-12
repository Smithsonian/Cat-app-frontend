import { memo, useState, useContext, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, MarkerClusterer } from '@react-google-maps/api';
import Row from 'react-bootstrap/Row';
import { ObservationContext } from '../context/ObservationsContext';
import {
  optionsMap,
  containerStyleMap,
  centerMap,
  optionsCluster,
  labelsCluster,
  clusterOnClick
} from '../utils/mapConfig';
import Loading from './Loading';

const Map = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });
  const [map, setMap] = useState(null);
  const { observations } = useContext(ObservationContext);

  const onLoadMap = useCallback(map => {
    console.log('Mount...');
    setMap(map);
  }, []);

  const onUnmountMap = useCallback(map => {
    console.log('Unmount...');
    setMap(null);
  }, []);

  if (loadError) return <div>Map cannot be loaded right now, sorry.</div>;

  if (!isLoaded)
    return (
      <Row
        className='flex-column justify-content-center align-items-center'
        style={containerStyleMap}
      >
        <Loading />
      </Row>
    );

  return (
    <GoogleMap
      options={optionsMap}
      mapContainerStyle={containerStyleMap}
      center={centerMap}
      zoom={10}
      onLoad={onLoadMap}
      onUnmount={onUnmountMap}
    >
      <MarkerClusterer options={optionsCluster} onClick={clusterOnClick}>
        {clusterer =>
          observations.map(
            (
              {
                _id,
                location: {
                  coordinates: [lng, lat]
                }
              },
              i
            ) => (
              <Marker
                icon={
                  'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
                }
                key={_id}
                position={{
                  lat,
                  lng
                }}
                label={labelsCluster[i % labelsCluster.length]}
                clusterer={clusterer}
              />
            )
          )
        }
      </MarkerClusterer>
    </GoogleMap>
  );
};

export default memo(Map);
