import { useState, useCallback, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import useDidUpdateEffect from '../utils/useDidUpdateEffect';
import { AuthContext } from '../context/AuthContext';

const useObservations = (query, map) => {
  const { signOut } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [observations, setObservations] = useState([]);

  const getObservations = useCallback(async () => {
    setLoading(true);
    const sanitizedQuery = Object.entries(query).reduce(
      (a, [k, v]) => (v ? ((a[k] = v), a) : a),
      {}
    );
    if (axios.defaults.headers.common['token']) {
      try {
        const {
          data: { observations }
        } = await axios.post(
          `${process.env.REACT_APP_OBSERVATION_API}/observations`,
          sanitizedQuery
        );
        if (observations.length === 0) {
          toast.info('No results, try again');
          setObservations([]);
          setLoading(false);
          return;
        }
        if (map) {
          toast.success(`${observations.length} observation(s) found`);
        }
        setObservations(observations);
        setLoading(false);
      } catch ({ response }) {
        if (response) {
          const {
            data: { error }
          } = response;
          if (error) {
            toast.error(error);
            setLoading(false);
          }
        } else {
          toast.error('Network error');
          setLoading(false);
          setTimeout(() => {
            signOut();
          }, 3000);
        }
      }
    }
  }, [query, signOut, map]);

  useDidUpdateEffect(() => {
    getObservations();
  }, [getObservations]);

  return [loading, observations, setObservations];
};

export default useObservations;
