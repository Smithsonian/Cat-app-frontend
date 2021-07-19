import { Fragment, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ImageGallery from 'react-image-gallery';
import moment from 'moment';
import { ObservationContext } from '../../context/ObservationsContext';
import { renderLeftNav, renderRightNav } from '../../utils/imageGalleryHelpers';
import MetadataForm from './MetadataForm';

const SingleObservationDetails = ({ currentObservation, fullscreen }) => {
  const { saveNewCat, removeIdentification } = useContext(ObservationContext);
  return (
    <Fragment>
      <Row className={fullscreen ? 'mb-3 mt-5' : 'mb-3'}>
        <Col>
          {`Observed on: ${moment(currentObservation.date_time_original).format(
            'MMMM Do YYYY, h:mm:ss a'
          )}`}
        </Col>
        <Col>{`Latitude: ${currentObservation.location.coordinates[1]}, Longitude: ${currentObservation.location.coordinates[0]}`}</Col>
      </Row>
      <Row className='mb-3'>
        <Col md={fullscreen ? 6 : 12} className='px-3'>
          <Row className='flex-column justify-content-between h-100'>
            <Col className='mb-3'>
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
              <Row className='justify-content-around'>
                {currentObservation.specimen ? (
                  <Fragment>
                    <Button>Specimen ID: {currentObservation.specimen}</Button>
                    <Button
                      onClick={() => removeIdentification(currentObservation._id)}
                      variant='danger'
                    >
                      Delete ID
                    </Button>
                  </Fragment>
                ) : (
                  <Button onClick={() => saveNewCat(currentObservation._id)}>
                    Save as new cat
                  </Button>
                )}
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md={fullscreen ? 6 : 12} className='px-3'>
          <MetadataForm currentObservation={currentObservation} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default SingleObservationDetails;
