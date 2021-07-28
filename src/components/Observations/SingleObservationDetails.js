import { Fragment, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ImageGallery from 'react-image-gallery';
import { Link } from 'react-router-dom';
import { ObservationContext } from '../../context/ObservationsContext';
import { AuthContext } from '../../context/AuthContext';
import StaticMap from '../Leaflet/StaticMap';
import { renderLeftNav, renderRightNav } from '../../utils/imageGalleryHelpers';
import MetadataForm from './MetadataForm';

const SingleObservationDetails = ({ currentObservation, fullscreen }) => {
  const { saveNewCat, removeIdentification } = useContext(ObservationContext);
  const {
    user: { role }
  } = useContext(AuthContext);

  return (
    <Fragment>
      {role !== 'user' && currentObservation.forReview && (
        <Col>
          <Row className='justify-content-center'>
            Reason for approval: {currentObservation.reasonReview}
          </Row>
          <Row className='justify-content-center'>
            <Col md={fullscreen & 1}>
              <Row>
                <Button variant='success'>Approve</Button>
              </Row>
            </Col>
            <Col md={fullscreen & 1}>
              <Row>
                <Button variant='danger'>Reject</Button>
              </Row>
            </Col>
          </Row>
        </Col>
      )}
      <Row className='my-5'>
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
              {currentObservation.isCat && (
                <Row className='justify-content-around mb-3'>
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
                      <Button className='mb-3' onClick={() => saveNewCat(currentObservation._id)}>
                        Save as new cat
                      </Button>
                      <Button as={Link} to={`/match/${currentObservation._id}`} variant='info'>
                        Match to specimen
                      </Button>
                    </Fragment>
                  )}
                </Row>
              )}
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
