import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import useObservations from '../utils/useObservations';
import { initialForm } from '../utils/searchFormHelpers';
import { AuthContext } from '../context/AuthContext';

export const ObservationContext = createContext();

const ObservationState = ({ children }) => {
  const { signOut } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [currentObservation, setCurrentObservation] = useState();
  const [deployments, setDeployments] = useState([]);
  const [searchForm, setSearchForm] = useState(initialForm);
  const [queryMainMap, setQueryMainMap] = useState(initialForm);
  const [loadingMap, observationsMap, setObservationsMap] = useObservations(queryMainMap, true);
  // eslint-disable-next-line
  const [queryCandidates, setQueryCandidates] = useState({});
  // eslint-disable-next-line
  const [loadingCandidates, observationCandidates] = useObservations(queryCandidates);

  const getDeployments = useCallback(async () => {
    setLoading(true);
    if (axios.defaults.headers.common['token']) {
      try {
        const {
          data: { deployments, error }
        } = await axios.get(`${process.env.REACT_APP_OBSERVATION_API}/observations/deployments`);
        if (error) {
          toast.error(error);
          setLoading(false);
        }
        setDeployments(deployments);
        setLoading(false);
      } catch (error) {
        toast.error('Service is offline. Contact your admin');
        setLoading(false);
        setTimeout(() => {
          signOut();
        }, 3000);
      }
    }
  }, [signOut]);

  const updateObservation = async observation => {
    const { _id, status, pattern, primaryColor, secondaryColor, captureSide } = observation;
    const fieldsToUpdate = { status, pattern, primaryColor, secondaryColor, captureSide };
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

  useEffect(() => {
    getDeployments();
  }, [getDeployments]);

  return (
    <ObservationContext.Provider
      value={{
        loading,
        deployments,
        loadingMap,
        observationsMap,
        searchForm,
        setSearchForm,
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
