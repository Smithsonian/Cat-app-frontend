import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import Loading from '../Navigation/Loading';
import { AuthContext } from '../../context/AuthContext';
import ObservationCanvas from '../Observations/ObservationCanvas';
import SingleCatMap from '../Leaflet/SingleCatMap';
import { Fragment } from 'react';

const Cat = () => {
  const { id } = useParams();
  const { signOut } = useContext(AuthContext);
  const [cat, setCat] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCat = async () => {
      try {
        const {
          data: { cat }
        } = await axios.get(`${process.env.REACT_APP_OBSERVATION_API}/observations/cat/${id}`);
        setCat(cat);
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
    };
    getCat();
  }, [id, signOut]);

  const columns = [
    {
      name: 'Observation ID',
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
      name: 'Pattern, Bicolor, Long hair, Sex,  Notched ear, Collar',
      selector: ({ pattern, bicolor, longHair, sex, notched, collar }) =>
        `${pattern}, ${bicolor}, ${longHair}, ${sex}, ${notched}, ${collar}`
    }
  ];

  return loading ? (
    <Row className='flex-column justify-content-center align-items-center vh-100'>
      <Loading />
    </Row>
  ) : (
    <Fragment>
      <Row>
        <ObservationCanvas />
        <Col>
          <DataTable
            title={`Cat: ${id}`}
            columns={columns}
            data={cat.matches}
            pagination
            highlightOnHover
          />
        </Col>
        <Col>
          <SingleCatMap observations={cat.matches} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Cat;
