import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import SingleObservationDetails from './SingleObservationDetails';
import Loading from '../Navigation/Loading';
import StaticMap from './StaticMap';

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
    <SingleObservationDetails currentObservation={observation} />
  ) : (
    <Row className='justify-content-center align-items-center'>
      <Loading />
    </Row>
  );
};

export default SingleObservation;
