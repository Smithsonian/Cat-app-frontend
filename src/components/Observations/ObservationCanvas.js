import { useContext, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat } from '@fortawesome/free-solid-svg-icons';
import { ObservationContext } from '../../context/ObservationsContext';
import SingleObservationDetails from './SingleObservationDetails';

const ObservationCanvas = () => {
  const { currentObservation, showCanvas, setShowCanvas } = useContext(ObservationContext);
  const toggleShow = () => setShowCanvas(prev => !prev);

  return (
    <Fragment>
      <Button
        variant='success'
        onClick={toggleShow}
        className='position-fixed rounded-circle'
        style={{
          zIndex: '10000',
          width: '4rem',
          height: '4rem',
          fontSize: '1.5rem',
          bottom: 5,
          right: 5
        }}
      >
        <FontAwesomeIcon icon={faCat} />
      </Button>
      <Offcanvas show={showCanvas} onHide={toggleShow} placement='end' className='canvas'>
        {currentObservation ? (
          <Fragment>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title as={Link} to={`/observation/${currentObservation._id}`}>
                Observation: {currentObservation._id}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <SingleObservationDetails currentObservation={currentObservation} />
            </Offcanvas.Body>
          </Fragment>
        ) : (
          <Fragment>
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body>
              <Row className='justify-content-center'>No observation has been selected</Row>
            </Offcanvas.Body>
          </Fragment>
        )}
      </Offcanvas>
    </Fragment>
  );
};

export default ObservationCanvas;
