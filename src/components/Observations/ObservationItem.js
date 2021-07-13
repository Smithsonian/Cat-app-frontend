import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';

const ObservationItem = ({ observation: { images } }) => {
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
          <Button variant='primary' block>
            Process observation
          </Button>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default ObservationItem;
