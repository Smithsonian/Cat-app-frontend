import { useState, useEffect, useCallback, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const useObservations = query => {
  const { signOut } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [observationsNew, setObservationsNew] = useState([]);
  const [observationsReview, setObservationsReview] = useState([]);

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
          data: { observationsNew, observationsForReview, error }
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
        setObservationsNew(observationsNew);
        setObservationsReview(observationsForReview);
        setLoading(false);
      } catch (error) {
        toast.error('Service is offline. Contact your admin');
        setLoading(false);
        setTimeout(() => {
          signOut();
        }, 3000);
      }
    }
  }, [query]);

  useEffect(() => {
    getObservations();
  }, [getObservations]);

  return [loading, observationsNew, observationsReview];
};

export default useObservations;
