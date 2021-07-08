import { useContext, Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchModal from './SearchModal';
import { ObservationContext } from '../context/ObservationsContext';
import Loading from './Loading';
import Map from './Map';
import ObservationList from './ObservationList';

const Observations = () => {
  const { loading, observations } = useContext(ObservationContext);
  return (
    <Fragment>
      <Row>
        <SearchModal />
      </Row>
      <Row>
        <Col md={6}>
          <Map />
        </Col>
        {!loading ? (
          <Fragment>
            <Col md={3}>
              <ObservationList title={'New observations'} observations={observations} />
            </Col>
            <Col md={3}>
              <ObservationList title={'For review'} observations={observations} />
            </Col>
          </Fragment>
        ) : (
          <Col md={6}>
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
