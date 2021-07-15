import { useState, useContext, Fragment } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ImageGallery from 'react-image-gallery';
import { ObservationContext } from '../../context/ObservationsContext';
import { renderLeftNav, renderRightNav } from '../../utils/imageGalleryHelpers';

const ObservationCanvas = () => {
  const { currentObservation } = useContext(ObservationContext);
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
        <Row>
          <Col>
            <ImageGallery
              renderLeftNav={renderLeftNav}
              renderRightNav={renderRightNav}
              thumbnailPosition='left'
              items={currentObservation.images.map(image => ({
                original: `${process.env.REACT_APP_IMAGE_BUCKET}/${image.image_id}_o.jpg`,
                thumbnail: `${process.env.REACT_APP_IMAGE_BUCKET}/${image.image_id}_m.jpg`
              }))}
            />
          </Col>
        </Row>
        <Form>
          <Offcanvas.Body></Offcanvas.Body>
        </Form>
      </Offcanvas>
    </Fragment>
  );
};

export default ObservationCanvas;
