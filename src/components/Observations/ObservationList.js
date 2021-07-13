import { Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ObservationItem from './ObservationItem';

const ObservationList = ({ title, observations }) => {
  return (
    <Fragment>
      <Row className='justify-content-center'>
        <h3>{title}</h3>
      </Row>
      <Row style={{ height: 'calc(100vh - 80px)', overflowX: 'hidden' }}>
        <Col>
          {observations.map(observation => (
            <ObservationItem key={observation._id} observation={observation} />
          ))}
        </Col>
      </Row>
    </Fragment>
  );
};

export default ObservationList;
