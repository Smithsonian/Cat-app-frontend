import { useContext, Fragment } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
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
        className='position-absolute rounded-circle'
        style={{
          zIndex: '10000',
          width: '4rem',
          height: '4rem',
          fontSize: '1.5rem',
          bottom: 5,
          right: 5
        }}
      >
        🐈
      </Button>
      <Offcanvas show={showCanvas} onHide={toggleShow} placement='end' style={{ width: '50%' }}>
        {currentObservation ? (
          <Fragment>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Observation: {currentObservation._id} </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <SingleObservationDetails currentObservation={currentObservation} />
            </Offcanvas.Body>
          </Fragment>
        ) : (
          'No selection'
        )}
      </Offcanvas>
    </Fragment>
  );
};

export default ObservationCanvas;
