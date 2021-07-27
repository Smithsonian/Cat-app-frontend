import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import protocol from '../../assets/protocol.png';

const ProtocolModal = props => {
  return (
    <Modal {...props} size='lg' aria-labelledby='protocol-modal' fullscreen centered>
      <Modal.Header closeButton>
        <Modal.Title id='protocol-modal'>Protocol</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Image src={protocol} />
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProtocolModal;
