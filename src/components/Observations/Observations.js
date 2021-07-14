import { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchModal from '../Search/SearchModal';
import Map from '../Leaflet/Map';

const Observations = () => {
  return (
    <Fragment>
      <Row>
        <SearchModal />
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
