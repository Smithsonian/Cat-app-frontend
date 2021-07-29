import { useState, Fragment, useContext } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuid_v4 } from 'uuid';
import { ObservationContext } from '../../context/ObservationsContext';
import { patternList, genericList, sexList } from '../../utils/searchFormHelpers';

const FilterCanvas = ({ currentObservation }) => {
  const { setQueryCandidates } = useContext(ObservationContext);
  const [matchFilter, setMatchFilter] = useState(currentObservation);
  const { pattern, bicolor, longHair, sex, notched, collar } = matchFilter;
  const [edited, setEdited] = useState(false);
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(prev => !prev);

  const handleChange = event => {
    setMatchFilter(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
    !edited && setEdited(true);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!edited) return toast.info(`Filters haven't changed`);
    setQueryCandidates(prev => ({ ...prev, ...matchFilter }));
    setEdited(false);
  };

  return (
    <Fragment>
      <Button
        variant='success'
        onClick={toggleShow}
        className='position-absolute rounded-circle'
        style={{
          zIndex: '10000',
          width: '4rem',
          height: '4rem',
          fontSize: '1.5rem',
          bottom: 5,
          right: 5
        }}
      >
        🐈
      </Button>
      <Offcanvas show={show} onHide={toggleShow} placement='end'>
        <Fragment>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title as={Link} to={`/observation/${currentObservation._id}`}>
              Observation: {currentObservation._id}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Form onSubmit={handleSubmit}>
              <Row className='align-items-center'>
                <Form.Group className='mb-3' controlId='pattern'>
                  <Form.Label>Pattern:</Form.Label>
                  <Form.Select name='pattern' value={pattern} onChange={handleChange}>
                    {patternList.map(option => (
                      <option key={uuid_v4()} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className='mb-3' controlId='bicolor'>
                  <Form.Label>Bicolor:</Form.Label>
                  <Form.Select name='bicolor' value={bicolor} onChange={handleChange}>
                    {genericList.map(option => (
                      <option key={uuid_v4()} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className='mb-3' controlId='longHair'>
                  <Form.Label>Long hair:</Form.Label>
                  <Form.Select name='longHair' value={longHair} onChange={handleChange}>
                    {genericList.map(option => (
                      <option key={uuid_v4()} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className='mb-3' controlId='sex'>
                  <Form.Label>Sex:</Form.Label>
                  <Form.Select name='sex' value={sex} onChange={handleChange}>
                    {sexList.map(option => (
                      <option key={uuid_v4()} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className='mb-3' controlId='notched'>
                  <Form.Label>Notched ear:</Form.Label>
                  <Form.Select name='notched' value={notched} onChange={handleChange}>
                    {genericList.map(option => (
                      <option key={uuid_v4()} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className='mb-3' controlId='collar'>
                  <Form.Label>Collar:</Form.Label>
                  <Form.Select name='collar' value={collar} onChange={handleChange}>
                    {genericList.map(option => (
                      <option key={uuid_v4()} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className='mt-5'>
                <Button variant='success' type='submit'>
                  Filter
                </Button>
              </Row>
            </Form>
          </Offcanvas.Body>
        </Fragment>
      </Offcanvas>
    </Fragment>
  );
};

export default FilterCanvas;
