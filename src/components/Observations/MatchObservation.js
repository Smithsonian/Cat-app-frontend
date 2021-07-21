import { useState, useEffect, useCallback, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import moment from 'moment';
import { AuthContext } from '../../context/AuthContext';
import { ObservationContext } from '../../context/ObservationsContext';
import Loading from '../Navigation/Loading';
import { renderLeftNav, renderRightNav } from '../../utils/imageGalleryHelpers';

const MatchObservation = () => {
  const {
    user: { role }
  } = useContext(AuthContext);
  const {
    currentObservation,
    setCurrentObservation,
    setQueryCandidates,
    removeIdentification,
    observationCandidates
  } = useContext(ObservationContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getSingle = useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { observation, error }
      } = await axios.get(`${process.env.REACT_APP_OBSERVATION_API}/observations/${id}`);
      if (error) {
        setError(error);
        setLoading(false);
      }
      setCurrentObservation(observation);
      setQueryCandidates({
        status: observation.status,
        pattern: observation.pattern,
        primaryColor: observation.primaryColor,
        secondaryColor: observation.secondaryColor,
        specimen: { exists: true },
        location: {
          geoWithin: {
            centerSphere: [observation.location.coordinates, 5 / 3959]
          }
        }
      });
      setLoading(false);
    } catch (error) {
      setError('Service is offline. Contact your admin');
      setLoading(false);
    }
  }, [id, setCurrentObservation, setQueryCandidates]);

  useEffect(() => {
    getSingle();
  }, [getSingle]);

  if (error) return <div>{error.message}</div>;
  return !loading && currentObservation ? (
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
      <Row className='mb-3 mt-5'>
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
        <Col md={6} className={'px3 mb-5'}>
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
                  original: `${process.env.REACT_APP_IMAGE_BUCKET}/${image.image_id}_o.jpg`,
                  thumbnail: `${process.env.REACT_APP_IMAGE_BUCKET}/${image.image_id}_m.jpg`
                }))}
              />
            </Col>
            <Col>
              <Row className='justify-content-around'>
                {currentObservation.specimen && (
                  <Fragment>
                    <Button className='mb-3'>Specimen ID: {currentObservation.specimen}</Button>
                    <Button
                      onClick={() => removeIdentification(currentObservation._id)}
                      variant='danger'
                    >
                      Delete ID
                    </Button>
                  </Fragment>
                )}
              </Row>
            </Col>
          </Row>
        </Col>
        <Col md={6} className='px-3'>
          <Row className='flex-column justify-content-between h-100'></Row>
        </Col>
      </Row>
    </Fragment>
  ) : (
    <Row className='justify-content-center align-items-center'>
      <Loading />
    </Row>
  );
};
export default MatchObservation;
