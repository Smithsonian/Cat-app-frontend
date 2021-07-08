import { useState, useContext, Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ObservationContext } from '../context/ObservationsContext';

const SearchModal = () => {
  const { searchForm, setSearchForm, setQuery } = useContext(ObservationContext);
  const [show, setShow] = useState(false);
  const { latitude, longitude } = searchForm;

  const toggleShow = () => setShow(prev => !prev);

  const handleChange = event => {
    setSearchForm({ ...searchForm, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setQuery(searchForm);
    toggleShow();
  };

  return (
    <Fragment>
      <Button
        variant='warning'
        onClick={toggleShow}
        className='rounded-circle'
        style={{ zIndex: '10000', position: 'absolute', bottom: 10, right: 10, fontSize: '2rem' }}
      >
        🔍
      </Button>
      <Modal show={show} onHide={toggleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Filter observations</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col>
                <Form.Control
                  placeholder='Latitude'
                  name='latitude'
                  value={latitude}
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder='Longitude'
                  name='longitude'
                  value={longitude}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' type='submit'>
              Search
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default SearchModal;
