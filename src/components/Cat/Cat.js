import { Fragment, useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import ImageGallery from 'react-image-gallery';
import moment from 'moment';
import Loading from '../Navigation/Loading';
import { AuthContext } from '../../context/AuthContext';
import ObservationCanvas from '../Observations/ObservationCanvas';
import SingleCatMap from '../Leaflet/SingleCatMap';
import { renderLeftNav, renderRightNav } from '../../utils/imageGalleryHelpers';

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
      <Row className='mb-5'>
        <ObservationCanvas />
        <Col lg='8'>
          <DataTable
            title={`Cat: ${id}`}
            columns={columns}
            data={cat.matches}
            pagination
            paginationPerPage={5}
            highlightOnHover
          />
        </Col>
        <Col lg={4}>
          <Carousel fade controls={false}>
            {cat.matches &&
              cat.matches.map(observation => (
                <Carousel.Item key={observation._id}>
                  <ImageGallery
                    lazyLoad={true}
                    showPlayButton={false}
                    renderLeftNav={renderLeftNav}
                    renderRightNav={renderRightNav}
                    thumbnailPosition='left'
                    items={observation.images.map(image => ({
                      fullscreen: `${process.env.REACT_APP_IMAGE_BUCKET}/${image.image_id}_o.jpg`,
                      original: `${process.env.REACT_APP_IMAGE_BUCKET}/${image.image_id}_o.jpg`,
                      thumbnail: `${process.env.REACT_APP_IMAGE_BUCKET}/${image.image_id}_m.jpg`
                    }))}
                  />
                  <Row>
                    <Button variant='primary' as={Link} to={`/observation/${observation._id}`}>
                      Observation: {observation._id}
                    </Button>
                  </Row>
                </Carousel.Item>
              ))}
          </Carousel>
        </Col>
      </Row>
      <Row>
        <Col>
          <SingleCatMap observations={cat.matches} />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Cat;
