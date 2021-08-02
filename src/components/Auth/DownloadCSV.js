import { useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';
import fileDownload from 'js-file-download';
import { AuthContext } from '../../context/AuthContext';

const DownloadCSV = props => {
  const { signOut } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(moment().subtract(7, 'day').format('yyyy-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('yyyy-MM-DD'));
  const handleSubmit = async e => {
    e.preventDefault();
    if (endDate > moment().format('yyyy-MM-DD'))
      return toast.error('End date can not a future date');
    if (startDate > moment().format('yyyy-MM-DD'))
      return toast.error('Start date can not a future date');
    if (startDate > endDate) return toast.error('Start date can not greater than end date');
    if (axios.defaults.headers.common['token']) {
      try {
        const {
          data,
          headers: { 'content-disposition': filename }
        } = await axios.get(
          `${process.env.REACT_APP_CSV_SERVICE}/startDate/${startDate}/endDate/${endDate}`
        );
        fileDownload(data, filename.split('filename=')[1].replaceAll('"', ''));
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
    }
  };

  return (
    <Modal {...props} size='lg' aria-labelledby='protocol-modal' centered>
      <Modal.Header closeButton>
        <Modal.Title id='protocol-modal'>Protocol</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='startDate'>
                  <Form.Label>Start date:</Form.Label>
                  <Form.Control
                    type='date'
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='endDate'>
                  <Form.Label>End date:</Form.Label>
                  <Form.Control
                    type='date'
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Button variant='success' type='submit'>
                Download
              </Button>
            </Row>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DownloadCSV;
