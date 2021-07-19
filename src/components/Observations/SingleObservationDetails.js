import { Fragment, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ImageGallery from 'react-image-gallery';
import moment from 'moment';
import { ObservationContext } from '../../context/ObservationsContext';
import { renderLeftNav, renderRightNav } from '../../utils/imageGalleryHelpers';
import MetadataForm from './MetadataForm';

const SingleObservationDetails = ({ currentObservation }) => {
  const { saveNewCat } = useContext(ObservationContext);
  return (
    <Fragment>
      <Row className='mb-3'>
        <Col lg={6}>
          {`Observed on: ${moment(currentObservation.date_time_original).format('MMMM Do YYYY, h:mm:ss a')}`}
        </Col>
        <Col
          lg={6}
        >{`Latitude: ${currentObservation.location.coordinates[1]}, Longitude: ${currentObservation.location.coordinates[0]}`}</Col>
      </Row>
      <Row>
        <Col lg={6}>
          <Row className='flex-column justify-content-between h-100'>
            <Col>
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
            <Col>
              <Row className='align-items-end justify-content-around h-100'>
                {currentObservation.specimen ? (
                  <Fragment>
                    <Col>
                      <Button variant='danger'>Delete ID</Button>
                      <Button>Specimen ID: {currentObservation.specimen}</Button>
                    </Col>
                  </Fragment>
                ) : (
                  <Button onClick={() => saveNewCat(currentObservation._id)}>Save as new cat</Button>
                )}
              </Row>
            </Col>
          </Row>
        </Col>
        <Col lg={6}>
          <MetadataForm currentObservation={currentObservation} />
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </Fragment>
  );
};

export default SingleObservationDetails;
