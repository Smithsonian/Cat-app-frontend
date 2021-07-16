import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import useObservations from '../utils/useObservations';
import { initialForm } from '../utils/searchFormHelpers';
import axios from 'axios';

export const ObservationContext = createContext();

const ObservationState = ({ children }) => {
  const [showCanvas, setShowCanvas] = useState(false);
  const [currentObservation, setCurrentObservation] = useState();
  const [queryMainMap, setQueryMainMap] = useState(initialForm);
  const [loadingMap, observationsMap, setObservationsMap] = useObservations(queryMainMap);
  const [queryCandidates, setQueryCandidates] = useState({});
  const [loadingCandidates, observationCandidates] = useObservations(queryCandidates);

  const updateObservation = async observation => {
    const { _id, status, pattern, primaryColor, secondaryColor } = observation;
    const fieldsToUpdate = { status, pattern, primaryColor, secondaryColor };
    try {
      const {
        data: { error, updatedObservation }
      } = await axios.patch(
        `${process.env.REACT_APP_OBSERVATION_API}/observations/${_id}`,
        fieldsToUpdate
      );
      if (error) return toast.error(`$Error: ${error}`);
      setCurrentObservation(updatedObservation);
      setObservationsMap(prev => prev.map(obs => (obs._id === _id ? updatedObservation : obs)));
      toast.success('Updated');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <ObservationContext.Provider
      value={{
        loadingMap,
        observationsMap,
        setQueryMainMap,
        currentObservation,
        setCurrentObservation,
        showCanvas,
        setShowCanvas,
        updateObservation
      }}
    >
      {children}
    </ObservationContext.Provider>
  );
};

export default ObservationState;
