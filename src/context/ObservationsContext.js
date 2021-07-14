import { createContext, useState } from 'react';
import useObservations from '../utils/useObservations';

export const ObservationContext = createContext();

const ObservationState = ({ children }) => {
  const initialQuery = {
    minLon: -76.97261,
    maxLon: -77.09106,
    minLat: 38.87531,
    maxLat: 38.91299,
    date_time_original: {
      gte: Date.parse(
        new Date().getFullYear() - 1,
        new Date().getMonth() - 6,
        new Date().getDate()
      ),
      lt: Date.now()
    }
  };
  const [searchForm, setSearchForm] = useState(initialQuery);
  const [queryMainMap, setQueryMainMap] = useState(initialQuery);
  const [loadingMap, observationsNewMap, observationsReviewMap, errorMap] =
    useObservations(queryMainMap);

  /*  const getNewObservations = useCallback(async () => {
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
  }, [query]); */

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
        observationsNewMap,
        observationsReviewMap,
        errorMap,
        setQueryMainMap,
        searchForm,
        setSearchForm
      }}
    >
      {children}
    </ObservationContext.Provider>
  );
};

export default ObservationState;
