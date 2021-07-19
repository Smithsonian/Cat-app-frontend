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
  const [loadingMap, observationsMap, setObservationsMap] = useObservations(queryMainMap, true);
  // eslint-disable-next-line
  const [queryCandidates, setQueryCandidates] = useState({});
  // eslint-disable-next-line
  const [loadingCandidates, observationCandidates] = useObservations(queryCandidates);

  const updateObservation = async observation => {
    const { _id, status, pattern, primaryColor, secondaryColor } = observation;
    const fieldsToUpdate = { status, pattern, primaryColor, secondaryColor };
    try {
      const {
        data: { updatedObservation }
      } = await axios.patch(
        `${process.env.REACT_APP_OBSERVATION_API}/observations/${_id}`,
        fieldsToUpdate
      );
      renderUpdatedObservation(_id, updatedObservation);
      toast.success('Updated');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const saveNewCat = async obsId => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_OBSERVATION_API}/observations/${obsId}/newcat`
      );
      renderUpdatedObservation(obsId, data);
      toast.success('Identification created');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const removeIdentification = async obsId => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_OBSERVATION_API}/observations/${obsId}/removeid`
      );
      renderUpdatedObservation(obsId, data);
      toast.info('Identification removed');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const renderUpdatedObservation = (id, observation) => {
    setCurrentObservation(observation);
    setObservationsMap(prev => prev.map(obs => (obs._id === id ? observation : obs)));
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
        updateObservation,
        saveNewCat,
        removeIdentification
      }}
    >
      {children}
    </ObservationContext.Provider>
  );
};

export default ObservationState;
