export const theme = {
  attribution:
    '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
};

export const draw = {
  rectangle: true,
  polyline: false,
  polygon: false,
  circle: false,
  marker: false,
  circlemarker: false
};

export const getNewBoundsCreated = ({
  layer: {
    _bounds: {
      _northEast: { lat: maxLat, lng: minLon },
      _southWest: { lat: minLat, lng: maxLon }
    }
  }
}) => ({ minLon, maxLon, minLat, maxLat });

export const getNewBoundsEdit = ({ layers: { _layers } }) => {
  const {
    _bounds: {
      _northEast: { lat: maxLat, lng: minLon },
      _southWest: { lat: minLat, lng: maxLon }
    }
  } = Object.values(_layers)[0];
  return { minLon, maxLon, minLat, maxLat };
};
