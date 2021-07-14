import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const ObservationItem = ({ observation: { _id, images } }) => {
  return (
    <Row className='justify-content-center'>
      <Card style={{ width: '18rem' }} className='mb-3'>
        <Carousel>
          {images.map(image => (
            <Carousel.Item key={image._id}>
              <Card.Img
                variant='top'
                src={`${process.env.REACT_APP_IMAGE_BUCKET}/${image.image_id}_m.jpg`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
        <Card.Body>
          <Button as={Link} to={`/observation/${_id}`} variant='primary' block>
            Process observation
          </Button>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default ObservationItem;
