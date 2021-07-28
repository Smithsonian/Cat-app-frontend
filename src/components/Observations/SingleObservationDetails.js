import { Fragment, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ImageGallery from 'react-image-gallery';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { ObservationContext } from '../../context/ObservationsContext';
import { AuthContext } from '../../context/AuthContext';
import StaticMap from '../Leaflet/StaticMap';
import { renderLeftNav, renderRightNav } from '../../utils/imageGalleryHelpers';
import MetadataForm from './MetadataForm';

const SingleObservationDetails = ({ currentObservation, fullscreen }) => {
  const { saveNewCat, removeIdentification, updateObservationApproval } =
    useContext(ObservationContext);
  const {
    user: { role }
  } = useContext(AuthContext);

  return (
    <Fragment>
      {role !== 'user' && currentObservation.forReview && (
        <Row className='flex-column  align-items-center justify-content-center'>
          <Col>
            <Row className='justify-content-center'>
              Reason for approval: {currentObservation.reasonReview}
            </Row>
          </Col>
          <Col sm={fullscreen && 4}>
            <Row>
              <Col>
                <Row>
                  <Button
                    className='d-inline'
                    variant='success'
                    onClick={() => updateObservationApproval(currentObservation, true)}
                  >
                    Approve
                  </Button>
                </Row>
              </Col>
              <Col>
                <Row>
                  <Button
                    variant='danger'
                    onClick={() => updateObservationApproval(currentObservation)}
                  >
                    Reject
                  </Button>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      {role === 'user' && currentObservation.reasonReview !== 'None' && (
        <Row className='justify-content-center'>
          <h6>
            This observation has been flagged as
            <Badge bg='danger'>{currentObservation.reasonReview} </Badge>
          </h6>
        </Row>
      )}
      {role !== 'user' &&
        currentObservation.reasonReview !== 'None' &&
        !currentObservation.forReview && (
          <Row className='justify-content-center'>
            <h6>
              This observation has been flagged as
              <Badge bg='danger'>{currentObservation.reasonReview} </Badge>
              <Badge
                style={{ cursor: 'pointer' }}
                bg='info'
                onClick={() => updateObservationApproval(currentObservation)}
              >
                Click here to revert it
              </Badge>
            </h6>
          </Row>
        )}
      <Row>
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
              {currentObservation.isCat && !currentObservation.notID && (
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
