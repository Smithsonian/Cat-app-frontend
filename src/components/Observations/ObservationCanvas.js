import { useState, useContext, Fragment } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ObservationContext } from '../../context/ObservationsContext';

const ObservationCanvas = () => {
  const {} = useContext(ObservationContext);
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(prev => !prev);

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
      <Offcanvas show={show} onHide={toggleShow} placement='end' style={{ width: '50%' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Process observations</Offcanvas.Title>
        </Offcanvas.Header>

        <Form>
          <Offcanvas.Body></Offcanvas.Body>
        </Form>
      </Offcanvas>
    </Fragment>
  );
};

export default ObservationCanvas;
