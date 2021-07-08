import { memo, useState, useContext } from 'react';
import { GoogleMap, LoadScript, Rectangle, Marker } from '@react-google-maps/api';
import { ObservationContext } from '../context/ObservationsContext';

const Map = () => {
  const { observations } = useContext(ObservationContext);
  const [bounds, setBounds] = useState({
    north: 0,
    south: 0,
    east: 0,
    west: 0
  });

  const containerStyle = {
    width: '100%',
    minHeight: 'calc(100vh - 80px)'
  };

  const center = {
    lat: 38.9072,
    lng: -77.0369
  };

  const onLoad = rectangle => {
    console.log('rectangle: ', rectangle);
  };
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Rectangle onLoad={onLoad} bounds={bounds} editable draggable />
        {observations.map(({ _id, latitude, longitude }) => (
          <Marker
            icon={
              'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
            }
            key={_id}
            position={{
              lat: parseFloat(latitude),
              lng: parseFloat(longitude)
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default memo(Map);
