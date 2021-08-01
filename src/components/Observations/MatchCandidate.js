import { useContext } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ImageGallery from 'react-image-gallery';
import { renderLeftNav, renderRightNav } from '../../utils/imageGalleryHelpers';
import { ObservationContext } from '../../context/ObservationsContext';
import { AuthContext } from '../../context/AuthContext';

const MatchCandidate = ({ candidate }) => {
  const { currentObservation, setCurrentObservation } = useContext(ObservationContext);
  const { signOut } = useContext(AuthContext);
  const matchToCat = async obsId => {
    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_OBSERVATION_API}/observations/${obsId}/cat/${candidate._id}`
      );
      setCurrentObservation(data);
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

  return (
    <Col>
      <Row>
        <Carousel fade controls={false}>
          {candidate.observations.map(observation => (
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
                <Button variant='secondary' as={Link} to={`/observation/${observation._id}`}>
                  Observation: {observation._id}
                </Button>
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
        <Button className='mt-2' onClick={() => matchToCat(currentObservation._id)}>
          Match to cat {candidate._id}
        </Button>
      </Row>
    </Col>
  );
};

export default MatchCandidate;
