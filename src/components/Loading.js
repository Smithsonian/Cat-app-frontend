import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import catGif from '../assets/cat.gif';

const Loading = () => {
  return (
    <Col md={4}>
      <Row className='flex-column'>
        <Image src={catGif} alt='Loading' />
        <h2 className='text-center'>Loading...</h2>
      </Row>
    </Col>
  );
};

export default Loading;
