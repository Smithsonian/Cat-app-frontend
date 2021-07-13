import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ImageGallery from 'react-image-gallery';
import { Link } from 'react-router-dom';
import { renderLeftNav, renderRightNav } from '../../utils/imageGalleryHelpers';

const ObservationItem = ({ observation: { _id, images } }) => {
  return (
    <Row className='justify-content-center'>
      <Card style={{ width: '18rem' }} className='mb-3'>
        <ImageGallery
          showPlayButton={false}
          renderLeftNav={renderLeftNav}
          renderRightNav={renderRightNav}
          items={images.map(image => ({
            original: `${process.env.REACT_APP_IMAGE_BUCKET}/${image.image_id}_o.jpg`,
            thumbnail: `${process.env.REACT_APP_IMAGE_BUCKET}/${image.image_id}_m.jpg`
          }))}
        />
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
