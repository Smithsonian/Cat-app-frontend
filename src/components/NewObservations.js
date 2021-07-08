import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Map from './map/Map';

const NewObservations = () => {
  const [observations, setObservations] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [error, setError] = useState(null);
  const getObservations = useCallback(async () => {
    const {
      data: { observations, pagination, error }
    } = await axios.get(`${process.env.REACT_APP_OBSERVATION_API}/observations`);
    if (error) {
      setError(error);
    }
    setObservations(observations);
    setPageInfo(pagination);
  }, []);

  useEffect(() => {
    getObservations();
  }, [getObservations]);
  return (
    <Row>
      <Col md={6}>
        <Map observations={observations} />
      </Col>
      <Col></Col>
      <Col></Col>
    </Row>
  );
};

export default NewObservations;
