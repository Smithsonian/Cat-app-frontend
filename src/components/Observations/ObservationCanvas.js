import { useContext, Fragment } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ImageGallery from 'react-image-gallery';
import moment from 'moment';
import { ObservationContext } from '../../context/ObservationsContext';
import { renderLeftNav, renderRightNav } from '../../utils/imageGalleryHelpers';
import MetadataForm from './MetadataForm';

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
        <Container>
          {currentObservation ? (
            <Fragment>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Observation: {currentObservation._id} </Offcanvas.Title>
              </Offcanvas.Header>
              <Row className='mb-3'>
                <Col lg={6}>
                  {`Observed on: ${moment(currentObservation.date_time_original).format(
                    'MMMM Do YYYY, h:mm:ss a'
                  )}`}
                </Col>
                <Col
                  lg={6}
                >{`Latitude: ${currentObservation.location.coordinates[1]}, Longitude: ${currentObservation.location.coordinates[0]}`}</Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <ImageGallery
                    lazyLoad={true}
                    showPlayButton={false}
                    renderLeftNav={renderLeftNav}
                    renderRightNav={renderRightNav}
                    thumbnailPosition='left'
                    items={currentObservation.images.map(image => ({
                      fullscreen: `${process.env.REACT_APP_IMAGE_BUCKET}/${image.image_id}_o.jpg`,
                      original: `${process.env.REACT_APP_IMAGE_BUCKET}/${image.image_id}_m.jpg`,
                      thumbnail: `${process.env.REACT_APP_IMAGE_BUCKET}/${image.image_id}_m.jpg`
                    }))}
                  />
                </Col>
                <Col lg={6}>
                  <MetadataForm />
                </Col>
              </Row>
              <Row>
                <Col></Col>
              </Row>
              <Form>
                <Offcanvas.Body></Offcanvas.Body>
              </Form>
            </Fragment>
          ) : (
            'No selection'
          )}
        </Container>
      </Offcanvas>
    </Fragment>
  );
};

export default ObservationCanvas;
