import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useObservations = query => {
  const [loading, setLoading] = useState(false);
  const [observationsNew, setObservationsNew] = useState([]);
  const [observationsReview, setObservationsReview] = useState([]);
  const [error, setError] = useState(null);

  const getObservations = useCallback(async () => {
    setLoading(true);
    if (axios.defaults.headers.common['token']) {
      try {
        const {
          data: { observations, error }
        } = await axios.post(`${process.env.REACT_APP_OBSERVATION_API}/observations`, query);
        if (error) {
          reportError(error);
          setLoading(false);
        }
        setObservationsNew(observations);
        setLoading(false);
      } catch (error) {
        reportError('Service is offline. Contact your admin');
        setLoading(false);
      }
    }
  }, [query]);

  const reportError = error => {
    setError(error);
    setTimeout(() => setError(null), 3000);
  };

  useEffect(() => {
    getObservations();
  }, [getObservations]);

  return [loading, observationsNew, observationsReview, error];
};

export default useObservations;
