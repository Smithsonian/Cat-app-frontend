import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const ObservationContext = createContext();

const ObservationState = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [newObservations, setNewObservations] = useState([]);
  const [observationsForReview, setObservationsForReview] = useState([]);
  const [searchForm, setSearchForm] = useState({
    minLon: -76.93198,
    maxLon: -76.93199,
    minLat: 38.90013,
    maxLat: 38.90014
  });
  const [query, setQuery] = useState({});
  const [paginationNew, setPaginationNew] = useState({});
  const [paginationReview, setPaginationReview] = useState({});
  const [error, setError] = useState(null);

  const getNewObservations = useCallback(async () => {
    if (axios.defaults.headers.common['token']) {
      setLoading(true);
      const {
        data: { observations, pagination, error }
      } = await axios.get(
        `${process.env.REACT_APP_OBSERVATION_API}/observations?${new URLSearchParams(query)}`
      );
      if (error) {
        reportError(error);
        setLoading(false);
      }
      setNewObservations(observations);
      setPaginationNew(pagination);
      setLoading(false);
    }
  }, [query]);

  const getObservationsForReview = useCallback(async () => {
    if (axios.defaults.headers.common['token']) {
      setLoading(true);
      const {
        data: { observations, pagination, error }
      } = await axios.get(
        `${process.env.REACT_APP_OBSERVATION_API}/observations?forReview=true&${new URLSearchParams(
          query
        )}`
      );
      if (error) {
        reportError(error);
        setLoading(false);
      }
      setObservationsForReview(observations);
      setPaginationReview(pagination);
      setLoading(false);
    }
  }, [query]);

  const reportError = error => {
    setError(error);
    setTimeout(() => setError(null), 3000);
  };

  useEffect(() => {
    getNewObservations();
  }, [getNewObservations]);

  useEffect(() => {
    getObservationsForReview();
  }, [getObservationsForReview]);

  return (
    <ObservationContext.Provider
      value={{
        loading,
        error,
        newObservations,
        observationsForReview,
        searchForm,
        setSearchForm,
        setQuery
      }}
    >
      {children}
    </ObservationContext.Provider>
  );
};

export default ObservationState;
