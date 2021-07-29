import Carousel from 'react-bootstrap/Carousel';
import ImageGallery from 'react-image-gallery';
import { renderLeftNav, renderRightNav } from '../../utils/imageGalleryHelpers';

const MatchCandidate = ({ candidate }) => {
  return (
    <div>
      <Carousel fade controls={false}>
        {candidate.observations.map(observation => (
          <Carousel.Item>
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
            <Carousel.Caption>
              <h3>{observation._id}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default MatchCandidate;
