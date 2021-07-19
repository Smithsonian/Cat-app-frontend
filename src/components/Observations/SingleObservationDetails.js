import { Fragment, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ImageGallery from 'react-image-gallery';
import moment from 'moment';
import { ObservationContext } from '../../context/ObservationsContext';
import { AuthContext } from '../../context/AuthContext';
import StaticMap from '../Leaflet/StaticMap';
import { renderLeftNav, renderRightNav } from '../../utils/imageGalleryHelpers';
import MetadataForm from './MetadataForm';
import { toast } from 'react-toastify';

const SingleObservationDetails = ({ currentObservation, fullscreen }) => {
  const { saveNewCat, removeIdentification } = useContext(ObservationContext);
  const {
    user: { role }
  } = useContext(AuthContext);
  return (
    <Fragment>
      {role !== 'user' && currentObservation.forReview && (
        <Row className='justify-content-around'>
          <Col sm={1}>
            <Button variant='success'>Approve</Button>
          </Col>
          <Col sm={1}>
            <Button variant='danger'>Reject</Button>
          </Col>
        </Row>
      )}
      <Row className={fullscreen ? 'mb-3 mt-5' : 'mb-3'}>
        <Col>
          <span className='fw-bold'>Observed on: </span>
          {moment(currentObservation.date_time_original).format('MMMM Do YYYY, h:mm:ss a')}
        </Col>
        <Col>
          <span className='fw-bold'>Latitude:</span> {currentObservation.location.coordinates[1]}
          <span className='fw-bold'> / </span>
          <span className='fw-bold'>Longitude:</span> {currentObservation.location.coordinates[0]}
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col md={fullscreen ? 6 : 12} className={!fullscreen ? 'px3 mb-5' : 'px-3'}>
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
                    <Button className='mb-3'>Specimen ID: {currentObservation.specimen}</Button>
                    <Button
                      onClick={() => removeIdentification(currentObservation._id)}
                      variant='danger'
                    >
                      Delete ID
                    </Button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Button
                      className='mb-3'
                      onClick={() =>
                        currentObservation.captureSide.length !== 0
                          ? saveNewCat(currentObservation._id)
                          : toast.warning(
                              'Please edit the captured side before creating a new identification'
                            )
                      }
                    >
                      Save as new cat
                    </Button>
                    <Button variant='info'>Match to specimen</Button>
                  </Fragment>
                )}
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md={fullscreen ? 6 : 12} className='px-3'>
          <Row className='flex-column justify-content-between h-100'>
            <MetadataForm currentObservation={currentObservation} />
            {fullscreen && <StaticMap currentObservation={currentObservation} />}
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SingleObservationDetails;
