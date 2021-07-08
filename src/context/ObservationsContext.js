import { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const ObservationContext = createContext();

const ObservationState = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [observations, setObservations] = useState([]);
  const [searchForm, setSearchForm] = useState({ latitude: '', longitude: '' });
  const [query, setQuery] = useState({});
  const [pageInfo, setPageInfo] = useState({});
  const [error, setError] = useState(null);

  const getObservations = useCallback(async () => {
    setLoading(true);
    const {
      data: { observations, pagination, error }
    } = await axios.get(`${process.env.REACT_APP_OBSERVATION_API}/observations`);
    if (error) {
      reportError(error);
      setLoading(false);
    }
    setObservations(observations);
    setPageInfo(pagination);
    setLoading(false);
  }, []);

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
