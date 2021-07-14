import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export const ObservationContext = createContext();

const ObservationState = ({ children }) => {
  const [loadingMap, setLoadingMap] = useState(false);
  const [newObservations, setNewObservations] = useState([]);
  const [observationsForReview, setObservationsForReview] = useState([]);
  const [searchForm, setSearchForm] = useState({
    minLon: -76.93198,
    maxLon: -76.93199,
    minLat: 38.90013,
    maxLat: 38.90014
  });
  const [query, setQuery] = useState({
    date_time_original: {
      gte: Date.parse(
        new Date().getFullYear() - 1,
        new Date().getMonth() - 6,
        new Date().getDate()
      ),
      lt: Date.now()
    }
  });
  const [paginationNew, setPaginationNew] = useState({});
  const [paginationReview, setPaginationReview] = useState({});
  const [error, setError] = useState(null);

  const getObservations = useCallback(async () => {
    setLoadingMap(true);
    if (axios.defaults.headers.common['token']) {
      try {
        const {
          data: { observations, error }
        } = await axios.post(`${process.env.REACT_APP_OBSERVATION_API}/observations`, query);
        if (error) {
          reportError(error);
          setLoadingMap(false);
        }
        setNewObservations(observations);
        setLoadingMap(false);
      } catch (error) {
        reportError('Service is offline. Contact your admin');
        setLoadingMap(false);
        return <Redirect to='/' />;
      }
    }
  }, [query]);

  const getNewObservations = useCallback(async () => {
    if (axios.defaults.headers.common['token']) {
      try {
        const {
          data: { observations, pagination, error }
        } = await axios.get(
          `${process.env.REACT_APP_OBSERVATION_API}/observations?${new URLSearchParams(query)}`
        );
        if (error) {
          reportError(error);
        }
        setNewObservations(prev => [...prev, ...observations]);
        setPaginationNew(pagination);
      } catch (error) {
        reportError('Service is offline. Contact your admin');
      }
    }
  }, [query]);

  const getObservationsForReview = useCallback(async () => {
    if (axios.defaults.headers.common['token']) {
      try {
        const {
          data: { observations, pagination, error }
        } = await axios.get(
          `${
            process.env.REACT_APP_OBSERVATION_API
          }/observations?forReview=true&${new URLSearchParams(query)}`
        );
        if (error) {
          reportError(error);
        }
        setObservationsForReview(observations);
        setPaginationReview(pagination);
      } catch (error) {
        reportError('Service is offline. Contact your admin');
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

  /* useEffect(() => {
    getNewObservations();
  }, [getNewObservations]);

  useEffect(() => {
    getObservationsForReview();
  }, [getObservationsForReview]); */

  return (
    <ObservationContext.Provider
      value={{
        loadingMap,
        error,
        newObservations,
        observationsForReview,
        searchForm,
        setSearchForm,
        setQuery,
        paginationNew
      }}
    >
      {children}
    </ObservationContext.Provider>
  );
};

export default ObservationState;
