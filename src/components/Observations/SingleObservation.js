import { useState, useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import { ObservationContext } from '../../context/ObservationsContext';
import SingleObservationDetails from './SingleObservationDetails';
import Loading from '../Navigation/Loading';

const SingleObservation = () => {
  const { currentObservation, setCurrentObservation } = useContext(ObservationContext);
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
      setLoading(false);
    } catch (error) {
      setError('Service is offline. Contact your admin');
      setLoading(false);
    }
  }, [id, setCurrentObservation]);

  useEffect(() => {
    getSingle();
  }, [getSingle]);

  if (error) return <div>{error.message}</div>;
  return !loading && currentObservation ? (
    <SingleObservationDetails currentObservation={currentObservation} fullscreen />
  ) : (
    <Row className='justify-content-center align-items-center'>
      <Loading />
    </Row>
  );
};

export default SingleObservation;
