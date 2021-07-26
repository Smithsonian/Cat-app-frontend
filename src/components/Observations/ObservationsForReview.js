import { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import { AuthContext } from '../../context/AuthContext';

const ObservationsForReview = () => {
  const { signOut } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [observations, setObservations] = useState([]);

  const getObservations = useCallback(async () => {
    setLoading(true);
    if (axios.defaults.headers.common['token']) {
      try {
        const {
          data: { observations, error }
        } = await axios.post(`${process.env.REACT_APP_OBSERVATION_API}/observations`, {
          forReview: true
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
  }, [signOut]);

  useEffect(() => {
    getObservations();
  }, [getObservations]);

  const columns = [
    {
      name: 'ID',
      selector: row => <Link to={`/observation/${row._id}`}>{row._id}</Link>,
      sortable: true
    },
    { name: 'Deployment ID', selector: row => row.deployment_id },
    {
      name: 'Date',
      selector: row => moment(row.date_time_original).format('MM/DD/YYYY')
    },
    { name: 'Reason for review', selector: row => row.reasonReview }
  ];

  return loading ? (
    'Loading...'
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
