import { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchModal from './SearchModal';
import Map from './Map';

const Observations = () => {
  return (
    <Fragment>
      <Row>
        <SearchModal />
      </Row>
      <Row>
        <Col md={6}>
          <Map />
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
    </Fragment>
  );
};

export default Observations;
