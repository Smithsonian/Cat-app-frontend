import { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchCanvas from '../Search/SearchCanvas';
import ObservationCanvas from './ObservationCanvas';
import { ToastContainer } from 'react-toastify';
import Map from '../Leaflet/Map';
import 'react-toastify/dist/ReactToastify.css';

const Observations = () => {
  return (
    <Fragment>
      <Row>
        <ToastContainer position='top-center' autoClose={3000} />
        <SearchCanvas />
        <ObservationCanvas />
      </Row>
      <Row>
        <Col>
          <Map />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Observations;
