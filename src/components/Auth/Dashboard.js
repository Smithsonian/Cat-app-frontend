import { Fragment, useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCameraRetro,
  faSearch,
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { ObservationContext } from '../../context/ObservationsContext';

const Dashboard = () => {
  const {
    counters: { deployments, total, forReview, notCat }
  } = useContext(ObservationContext);
  return (
    <Fragment>
      <Col md={3}>
        <Card bg='info' text={'white'} className='mb-2'>
          <Card.Header>
            <FontAwesomeIcon icon={faCameraRetro} />
          </Card.Header>
          <Card.Body>
            <Card.Title>Deployments: </Card.Title>
            <Card.Text>{deployments}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card bg='success' text={'white'} className='mb-2'>
          <Card.Header>
            <FontAwesomeIcon icon={faSearch} />
          </Card.Header>
          <Card.Body>
            <Card.Title>Observations:</Card.Title>
            <Card.Text>{total}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card bg='warning' text={'white'} className='mb-2'>
          <Card.Header>
            <FontAwesomeIcon icon={faCheckCircle} />
          </Card.Header>
          <Card.Body>
            <Card.Title>For review: </Card.Title>
            <Card.Text>{forReview}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card bg='danger' text={'white'} className='mb-2'>
          <Card.Header>
            <FontAwesomeIcon icon={faTimesCircle} />
          </Card.Header>
          <Card.Body>
            <Card.Title>Not a cat:</Card.Title>
            <Card.Text>{notCat}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Fragment>
  );
};

export default Dashboard;
