import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../Navigation/Loading';

const ObservationsForReview = () => {
  const { signOut } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [observations, setObservations] = useState([]);

  const getObservations = useCallback(async () => {
    setLoading(true);
    if (axios.defaults.headers.common['token']) {
      try {
        const {
          data: { observations }
        } = await axios.post(`${process.env.REACT_APP_OBSERVATION_API}/observations`, {
          forReview: true
        });
        if (observations.length === 0) {
          toast.info('Nothing to review');
          setObservations([]);
          setLoading(false);
          return;
        }
        setObservations(observations);
        setLoading(false);
      } catch ({ response }) {
        if (response) {
          const {
            data: { error }
          } = response;
          if (error) {
            toast.error(error);
            setLoading(false);
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

  useEffect(() => {
    getObservations();
  }, [getObservations]);

  const columns = [
    {
      name: 'ID',
      selector: ({ _id }) => <Link to={`/observation/${_id}`}>{_id}</Link>,
      sortable: true
    },
    {
      name: 'Deployment ID',
      selector: ({ deployment_id }) => (
        <Link to={`/deployment/${deployment_id}`}>{deployment_id}</Link>
      )
    },
    {
      name: 'Date',
      selector: ({ date_time_original }) => moment(date_time_original).format('MM/DD/YYYY')
    },
    { name: 'Reason for review', selector: ({ reasonReview }) => reasonReview },
    {
      name: 'Pattern, Bicolor, Long hair, Sex,  Notched, Collar',
      selector: ({ pattern, bicolor, longHair, sex, notched, collar }) =>
        `${pattern}, ${bicolor}, ${longHair}, ${sex}, ${notched}, ${collar}`
    }
  ];

  return loading ? (
    <Row className='flex-column justify-content-center align-items-center vh-100'>
      <Loading />
    </Row>
  ) : (
    <DataTable
      title='Observations for review'
      columns={columns}
      data={observations}
      pagination
      highlightOnHover
    />
  );
};

export default ObservationsForReview;
