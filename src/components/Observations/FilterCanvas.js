import { useState, Fragment, useContext } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { v4 as uuid_v4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ObservationContext } from '../../context/ObservationsContext';
import { patternList, genericList } from '../../utils/searchFormHelpers';

const FilterCanvas = ({ currentObservation }) => {
  const { setQueryCandidates } = useContext(ObservationContext);
  const [matchFilter, setMatchFilter] = useState({
    pattern: currentObservation.pattern,
    bicolor: currentObservation.bicolor,
    longHair: currentObservation.longHair,
    coordinates: currentObservation.location.coordinates,
    distance: 0.5
  });
  const { pattern, bicolor, longHair, distance } = matchFilter;
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
    toggleShow();
  };

  return (
    <Fragment>
      <Button
        variant='success'
        onClick={toggleShow}
        className='position-fixed rounded-circle'
        style={{
          zIndex: '10000',
          width: '4rem',
          height: '4rem',
          fontSize: '1.5rem',
          bottom: 5,
          right: 5
        }}
      >
        <FontAwesomeIcon icon={faSearch} />
      </Button>
      <Offcanvas show={show} onHide={toggleShow} placement='end'>
        <Fragment>
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
                <Form.Group className='mb-3' controlId='longHair'>
                  <Form.Label>Radius: {distance} km</Form.Label>
                  <Form.Range
                    name='distance'
                    value={distance}
                    onChange={handleChange}
                    min={0.01}
                    max={1.0}
                    step={0.01}
                  ></Form.Range>
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
