import L from 'leaflet';

export const theme = {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
  url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
};

export const draw = {
  rectangle: true,
  polyline: false,
  polygon: false,
  circle: false,
  marker: false,
  circlemarker: false
};

export const greenIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const redIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const cameraIcon = new L.divIcon({
  html: '📷',
  iconSize: [20, 20],
  className: 'cameraMarker'
});

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
