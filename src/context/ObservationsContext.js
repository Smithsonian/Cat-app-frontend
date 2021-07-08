import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const ObservationContext = createContext();

const ObservationState = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [observations, setObservations] = useState([]);
  const [searchForm, setSearchForm] = useState({
    minLon: -76.93198,
    maxLon: -76.93199,
    minLat: 38.90013,
    maxLat: 38.90014
  });
  const [query, setQuery] = useState({});
  const [pageInfo, setPageInfo] = useState({});
  const [error, setError] = useState(null);

  const getObservations = useCallback(async () => {
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
      setObservations(observations);
      setPageInfo(pagination);
      setLoading(false);
    }
  }, [query]);

  const reportError = error => {
    setError(error);
    setTimeout(() => setError(null), 3000);
  };

  useEffect(() => {
    getObservations();
  }, [getObservations]);

  return (
    <ObservationContext.Provider
      value={{ loading, error, observations, searchForm, setSearchForm, setQuery }}
    >
      {children}
    </ObservationContext.Provider>
  );
};

export default ObservationState;
