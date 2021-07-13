import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ImageGallery from 'react-image-gallery';
import Loading from '../Navigation/Loading';
import StaticMap from './StaticMap';
import { renderLeftNav, renderRightNav } from '../../utils/imageGalleryHelpers';

const SingleObservation = () => {
  const { id } = useParams();
  const [observation, setObservation] = useState();
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
      setObservation(observation);
      setLoading(false);
    } catch (error) {
      setError('Service is offline. Contact your admin');
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getSingle();
  }, [getSingle]);

  if (error) return <div>{error.message}</div>;
  return !loading && observation ? (
    <Row>
      <Col md={4}>
        <Row className='mb-3'>
          <Col>
            <ImageGallery
              renderLeftNav={renderLeftNav}
              renderRightNav={renderRightNav}
              thumbnailPosition='left'
              items={observation.images.map(image => ({
                original: `${process.env.REACT_APP_IMAGE_BUCKET}/${image.image_id}_o.jpg`,
                thumbnail: `${process.env.REACT_APP_IMAGE_BUCKET}/${image.image_id}_m.jpg`
              }))}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <StaticMap
              lat={observation.location.coordinates[1]}
              lng={observation.location.coordinates[0]}
            />
          </Col>
        </Row>
      </Col>
      <Col md={4}>
        <Row>
          <Col></Col>
        </Row>
        <Row>
          <Col>t</Col>
        </Row>
      </Col>
    </Row>
  ) : (
    <Row className='justify-content-center align-items-center'>
      <Loading />
    </Row>
  );
};

export default SingleObservation;
