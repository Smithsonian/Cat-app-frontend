import { createContext, useState } from 'react';
import useObservations from '../utils/useObservations';
import { initialForm } from '../utils/searchFormHelpers';

export const ObservationContext = createContext();

const ObservationState = ({ children }) => {
  const [queryMainMap, setQueryMainMap] = useState(initialForm);
  const [loadingMap, observationsNewMap, observationsReviewMap] = useObservations(queryMainMap);

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
        setQueryMainMap
      }}
    >
      {children}
    </ObservationContext.Provider>
  );
};

export default ObservationState;
