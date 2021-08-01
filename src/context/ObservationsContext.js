import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import useObservations from '../utils/useObservations';
import { initialForm } from '../utils/searchFormHelpers';
import useDidUpdateEffect from '../utils/useDidUpdateEffect';
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
  const [loadingCandidates, setLoadingCandidates] = useState(false);
  const [queryCandidates, setQueryCandidates] = useState({});
  const [candidates, setCandidates] = useState([]);

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

  const getCandidates = useCallback(async () => {
    if (axios.defaults.headers.common['token']) {
      setLoadingCandidates(true);
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_OBSERVATION_API}/observations/candidates`,
          queryCandidates
        );
        setCandidates(data);
        setLoadingCandidates(false);
      } catch ({ response }) {
        if (response) {
          const {
            data: { error }
          } = response;
          if (error) {
            toast.error(error);
            setLoadingCandidates(false);
          }
        } else {
          toast.error('Network error');
          setLoadingCandidates(false);
          setTimeout(() => {
            signOut();
          }, 3000);
        }
      }
    }
  }, [queryCandidates, signOut]);

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

  const updateObservationNotCat = async (observation, notCat) => {
    const { _id } = observation;
    const fieldsToUpdate = notCat
      ? { isCat: false, forReview: true, reasonReview: 'No cat' }
      : { notID: true, forReview: true, reasonReview: 'Unidentifiable' };
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

  const updateObservationApproval = async (observation, approve) => {
    const { _id } = observation;
    const fieldsToUpdate = { forReview: 'false' };
    if (approve) {
      fieldsToUpdate.reasonReview = observation.reasonReview;
    } else {
      fieldsToUpdate.reasonReview = 'None';
      if (observation.reasonReview === 'No cat') {
        fieldsToUpdate.isCat = true;
      } else if (observation.reasonReview === 'Unidentifiable') {
        fieldsToUpdate.notID = false;
      }
    }
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

  useEffect(() => getDeployments(), [getDeployments]);

  useEffect(() => getCounters(), [getCounters]);

  useDidUpdateEffect(() => getCandidates(), [getCandidates]);

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
        candidates,
        loadingCandidates,
        setQueryCandidates,
        currentObservation,
        setCurrentObservation,
        showCanvas,
        setShowCanvas,
        updateObservationMeta,
        updateObservationNotCat,
        updateObservationApproval,
        saveNewCat,
        removeIdentification
      }}
    >
      {children}
    </ObservationContext.Provider>
  );
};

export default ObservationState;
