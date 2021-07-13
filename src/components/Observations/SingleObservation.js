import { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleObservation = () => {
  const { id } = useParams();

  const getSingle = useCallback(async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_OBSERVATION_API}/observations/${id}`);
    console.log(data);
  }, [id]);

  useEffect(() => {
    getSingle();
  }, [getSingle]);

  return <div>hello</div>;
};

export default SingleObservation;
