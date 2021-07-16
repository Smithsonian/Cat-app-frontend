import { useState, useCallback, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import useDidUpdateEffect from '../utils/useDidUpdateEffect';
import { AuthContext } from '../context/AuthContext';

const useObservations = query => {
  const { signOut } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [observations, setObservations] = useState([]);

  const getObservations = useCallback(async () => {
    setLoading(true);
    const sanitizedQuery = Object.entries(query).reduce(
      (a, [k, v]) => (v ? ((a[k] = v), a) : a),
      {}
    );
    console.log(sanitizedQuery);
    if (axios.defaults.headers.common['token']) {
      try {
        const {
          data: { observations, error }
        } = await axios.post(
          `${process.env.REACT_APP_OBSERVATION_API}/observations`,
          sanitizedQuery
        );
        if (error) {
          toast.error(error);
          setLoading(false);
          setTimeout(() => {
            signOut();
          }, 3000);
        }
        if (observations.length === 0) {
          toast.info('No results, try again');
          setObservations([]);
          setLoading(false);
          return;
        }
        setObservations(observations);
        setLoading(false);
      } catch (error) {
        toast.error('Service is offline. Contact your admin');
        setLoading(false);
        setTimeout(() => {
          signOut();
        }, 3000);
      }
    }
  }, [query, signOut]);

  useDidUpdateEffect(() => {
    getObservations();
  }, [getObservations]);

  return [loading, observations, setObservations];
};

export default useObservations;
