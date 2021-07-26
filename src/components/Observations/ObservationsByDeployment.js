import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../Navigation/Loading';

const ObservationsByDeployment = () => {
  const { signOut } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [observations, setObservations] = useState([]);
  const { id } = useParams();

  const getObservations = useCallback(async () => {
    setLoading(true);
    if (axios.defaults.headers.common['token']) {
      try {
        const {
          data: { observations, error }
        } = await axios.post(`${process.env.REACT_APP_OBSERVATION_API}/observations`, {
          deployment_id: id,
          forReview: false
        });
        if (error) {
          toast.error(error);
          setLoading(false);
          setTimeout(() => {
            signOut();
          }, 3000);
        }
        if (observations.length === 0) {
          toast.info('Nothing to review');
          setObservations([]);
          setLoading(false);
          return;
        }
        setObservations(observations);
        setLoading(false);
      } catch (error) {
        toast.error('Service is offline. Contact your admin');
        setLoading(false);
        setTimeout(() => {
          signOut();
        }, 3000);
      }
    }
  }, [signOut, id]);

  useEffect(() => {
    getObservations();
  }, [getObservations]);

  const columns = [
    {
      name: 'ID',
      selector: ({ _id }) => <Link to={`/observation/${_id}`}>{_id}</Link>,
      sortable: true
    },
    { name: 'Deployment ID', selector: ({ deployment_id }) => deployment_id },
    {
      name: 'Date',
      selector: ({ date_time_original }) => moment(date_time_original).format('MM/DD/YYYY')
    },
    { name: 'Reason for review', selector: ({ reasonReview }) => reasonReview },
    {
      name: 'Status, Pattern, Primary color, Secondary color',
      selector: ({ status, pattern, primaryColor, secondaryColor }) =>
        `${status}, ${pattern}, ${primaryColor}, ${secondaryColor}`
    }
  ];

  return loading ? (
    <Row className='flex-column justify-content-center align-items-center vh-100'>
      <Loading />
    </Row>
  ) : (
    <DataTable
      title='Observations by deployment'
      columns={columns}
      data={observations}
      pagination
      highlightOnHover
    />
  );
};

export default ObservationsByDeployment;
