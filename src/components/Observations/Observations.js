import { useContext, Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ObservationContext } from '../../context/ObservationsContext';
import Loading from '../Navigation/Loading';
import SearchModal from '../Search/SearchModal';
import Map from '../Leaflet/Map';
import ObservationList from './ObservationList';

const Observations = () => {
  const { loading, newObservations, observationsForReview } = useContext(ObservationContext);

  return (
    <Fragment>
      <Row>
        <SearchModal />
      </Row>
      <Row>
        <Col md={8}>
          <Map />
        </Col>
        {!loading ? (
          <Fragment>
            <Col md={2}>
              <ObservationList title={'New observations'} observations={newObservations} />
            </Col>
            <Col md={2}>
              <ObservationList title={'For review'} observations={observationsForReview} />
            </Col>
          </Fragment>
        ) : (
          <Col md={4}>
            <Row className='flex-column justify-content-center align-items-center h-100'>
              <Loading />
            </Row>
          </Col>
        )}
      </Row>
    </Fragment>
  );
};

export default Observations;
