import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import useObservations from '../utils/useObservations';
import { initialForm } from '../utils/searchFormHelpers';
import { AuthContext } from '../context/AuthContext';

export const ObservationContext = createContext();

const ObservationState = ({ children }) => {
  const { signOut } = useContext(AuthContext);
  const [showCanvas, setShowCanvas] = useState(false);
  const [currentObservation, setCurrentObservation] = useState();
  const [counters, setCounters] = useState([]);
  const [deployments, setDeployments] = useState([]);
  const [searchForm, setSearchForm] = useState(initialForm);
  const [queryMainMap, setQueryMainMap] = useState(initialForm);
  const [loadingMap, observationsMap, setObservationsMap] = useObservations(queryMainMap, true);
  const [queryCandidates, setQueryCandidates] = useState({});
  const [loadingCandidates, observationCandidates] = useObservations(queryCandidates);

  const getDeployments = useCallback(async () => {
    if (axios.defaults.headers.common['token']) {
      try {
        const {
          data: { deployments }
        } = await axios.get(`${process.env.REACT_APP_OBSERVATION_API}/observations/deployments`);
        setDeployments(deployments);
      } catch ({ response }) {
        if (response) {
          const {
            data: { error }
          } = response;
          if (error) {
            toast.error(error);
          }
        } else {
          toast.error('Network error');
          setTimeout(() => {
            signOut();
          }, 3000);
        }
      }
    }
  }, [signOut]);

  const getCounters = useCallback(async () => {
    if (axios.defaults.headers.common['token']) {
      try {
        const {
          data: { counters }
        } = await axios.get(`${process.env.REACT_APP_OBSERVATION_API}/observations/counters`);
        setCounters(counters);
      } catch ({ response }) {
        if (response) {
          const {
            data: { error }
          } = response;
          if (error) {
            toast.error(error);
          }
        } else {
          toast.error('Network error');
          setTimeout(() => {
            signOut();
          }, 3000);
        }
      }
    }
  }, [signOut]);

  const updateObservationMeta = async observation => {
    const { _id, pattern, bicolor, longHair, sex, notched, collar } = observation;
    const fieldsToUpdate = { pattern, bicolor, longHair, sex, notched, collar };
    try {
      const {
        data: { updatedObservation }
      } = await axios.patch(
        `${process.env.REACT_APP_OBSERVATION_API}/observations/${_id}`,
        fieldsToUpdate
      );
      renderUpdatedObservation(_id, updatedObservation);
      toast.success('Updated');
    } catch ({ response }) {
      if (response) {
        const {
          data: { error }
        } = response;
        if (error) {
          toast.error(error);
        }
      } else {
        toast.error('Network error');
        setTimeout(() => {
          signOut();
        }, 3000);
      }
    }
  };

  const updateObservationNotCat = async observation => {
    const { _id } = observation;
    const fieldsToUpdate = { isCat: false, forReview: true, reasonReview: 'No cat' };
    try {
      const {
        data: { updatedObservation }
      } = await axios.patch(
        `${process.env.REACT_APP_OBSERVATION_API}/observations/${_id}`,
        fieldsToUpdate
      );
      renderUpdatedObservation(_id, updatedObservation);
      toast.success('Updated');
    } catch ({ response }) {
      if (response) {
        const {
          data: { error }
        } = response;
        if (error) {
          toast.error(error);
        }
      } else {
        toast.error('Network error');
        setTimeout(() => {
          signOut();
        }, 3000);
      }
    }
  };

  const saveNewCat = async obsId => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_OBSERVATION_API}/observations/${obsId}/newcat`
      );
      renderUpdatedObservation(obsId, data);
      toast.success('Identification created');
    } catch ({ response }) {
      if (response) {
        const {
          data: { error }
        } = response;
        if (error) {
          toast.error(error);
        }
      } else {
        toast.error('Network error');
        setTimeout(() => {
          signOut();
        }, 3000);
      }
    }
  };

  const removeIdentification = async obsId => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_OBSERVATION_API}/observations/${obsId}/removeid`
      );
      renderUpdatedObservation(obsId, data);
      toast.info('Identification removed');
    } catch ({ response }) {
      if (response) {
        const {
          data: { error }
        } = response;
        if (error) {
          toast.error(error);
        }
      } else {
        toast.error('Network error');
        setTimeout(() => {
          signOut();
        }, 3000);
      }
    }
  };

  const renderUpdatedObservation = (id, observation) => {
    setCurrentObservation(observation);
    setObservationsMap(prev => prev.map(obs => (obs._id === id ? observation : obs)));
  };

  useEffect(() => {
    getDeployments();
  }, [getDeployments]);

  useEffect(() => {
    getCounters();
  }, [getCounters]);

  return (
    <ObservationContext.Provider
      value={{
        counters,
        deployments,
        setQueryMainMap,
        loadingMap,
        observationsMap,
        setObservationsMap,
        searchForm,
        setSearchForm,
        setQueryCandidates,
        loadingCandidates,
        observationCandidates,
        currentObservation,
        setCurrentObservation,
        showCanvas,
        setShowCanvas,
        updateObservationMeta,
        updateObservationNotCat,
        saveNewCat,
        removeIdentification
      }}
    >
      {children}
    </ObservationContext.Provider>
  );
};

export default ObservationState;
