import { createContext, useState } from 'react';
import useObservations from '../utils/useObservations';
import { initialForm } from '../utils/searchFormHelpers';

export const ObservationContext = createContext();

const ObservationState = ({ children }) => {
  const [currentObservation, setCurrentObservation] = useState({});
  const [queryMainMap, setQueryMainMap] = useState(initialForm);
  const [loadingMap, observationsMap] = useObservations(queryMainMap);

  return (
    <ObservationContext.Provider
      value={{
        loadingMap,
        observationsMap,
        setQueryMainMap,
        currentObservation,
        setCurrentObservation
      }}
    >
      {children}
    </ObservationContext.Provider>
  );
};

export default ObservationState;
