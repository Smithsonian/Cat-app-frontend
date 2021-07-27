import { useState, useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';
import { ObservationContext } from '../../context/ObservationsContext';
import { AuthContext } from '../../context/AuthContext';
import SingleObservationDetails from './SingleObservationDetails';
import Loading from '../Navigation/Loading';

const SingleObservation = () => {
  const { currentObservation, setCurrentObservation } = useContext(ObservationContext);
  const { signOut } = useContext(AuthContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const getSingle = useCallback(async () => {
    setLoading(true);
    try {
      const {
        data: { observation }
      } = await axios.get(`${process.env.REACT_APP_OBSERVATION_API}/observations/${id}`);
      setCurrentObservation(observation);
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
  }, [id, setCurrentObservation, signOut]);

  useEffect(() => {
    getSingle();
  }, [getSingle]);

  return !loading && currentObservation ? (
    <SingleObservationDetails currentObservation={currentObservation} fullscreen />
  ) : (
    <Row className='justify-content-center align-items-center'>
      <Loading />
    </Row>
  );
};

export default SingleObservation;
