import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Map = () => {
  const containerStyle = {
    width: '400px',
    height: '400px'
  };

  const center = {
    lat: -3.745,
    lng: -38.523
  };

  return (
    <LoadScript googleMapsApiKey='AIzaSyCwFhNfWkO90DI57HdNmE68nWV2210PEIg'>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
