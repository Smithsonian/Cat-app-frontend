import { useState, useEffect, useCallback, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ImageGallery from 'react-image-gallery';
import { toast } from 'react-toastify';
import moment from 'moment';
import { AuthContext } from '../../context/AuthContext';
import { ObservationContext } from '../../context/ObservationsContext';
import FilterCanvas from './FilterCanvas';
import Loading from '../Navigation/Loading';
import MatchCandidate from './MatchCandidate';
import { renderLeftNav, renderRightNav } from '../../utils/imageGalleryHelpers';

const MatchObservation = () => {
  const {
    user: { signOut }
  } = useContext(AuthContext);
  const {
    loadingCandidates,
    currentObservation,
    setCurrentObservation,
    setQueryCandidates,
    removeIdentification,
    candidates
  } = useContext(ObservationContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const getSingle = useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { observation }
      } = await axios.get(`${process.env.REACT_APP_OBSERVATION_API}/observations/${id}`);
      setCurrentObservation(observation);
      setQueryCandidates({
        pattern: observation.pattern,
        bicolor: observation.bicolor,
        longHair: observation.longHair,
        coordinates: observation.location.coordinates,
        distance: 0.5
      });
      setLoading(false);
    } catch ({ response }) {
      if (response) {
        const {
          data: { error }
        } = response;
        if (error) {
          toast.error(error);
          setTimeout(() => {
            signOut();
          }, 3000);
        }
      } else {
        toast.error('Network error');
        setTimeout(() => {
          signOut();
        }, 3000);
      }
    }
  }, [id, setCurrentObservation, setQueryCandidates, signOut]);

  useEffect(() => {
    getSingle();
  }, [getSingle]);

  if (!loading && currentObservation && (currentObservation.notCat || currentObservation.notID))
    return (
      <Row className='flex-column justify-content-center align-items-center'>
        This observation is flagged as either "Not a cat" or "Unidentifiable", you can not find a
        match for it
      </Row>
    );
  return !loading && currentObservation ? (
    <Fragment>
      <Row>
        <FilterCanvas currentObservation={currentObservation} />
      </Row>
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
      <Row className='mb-3 h-50'>
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
        <Col md={6} className='px-3' style={{ overflowY: 'scroll', height: '800px' }}>
          {currentObservation.specimen ? (
            <Row className='justify-content-center align-items-center'>
              Cannot match an observation with an existent ID
            </Row>
          ) : loadingCandidates ? (
            <Row className='justify-content-center align-items-center'>
              <Loading />
            </Row>
          ) : candidates.length !== 0 ? (
            candidates.map(candidate => (
              <Row className='flex-column justify-content-between mb-3' key={candidate._id}>
                <MatchCandidate candidate={candidate} />
              </Row>
            ))
          ) : (
            <Row className='justify-content-center align-items-center'>
              Could not find potential canditates
            </Row>
          )}
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
