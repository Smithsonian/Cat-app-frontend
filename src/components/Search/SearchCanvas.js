import { useState, useContext, Fragment } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid_v4 } from 'uuid';
import { ObservationContext } from '../../context/ObservationsContext';
import { patternList, sexList, genericList } from '../../utils/searchFormHelpers';

const SearchCanvas = () => {
  const { setQueryMainMap, searchForm, setSearchForm, setObservationsMap } =
    useContext(ObservationContext);
  const [show, setShow] = useState(false);
  const {
    project_id,
    deployment_id,
    pattern,
    bicolor,
    longHair,
    sex,
    notched,
    collar,
    minLon,
    maxLon,
    minLat,
    maxLat,
    date_time_original
  } = searchForm;

  const toggleShow = () => setShow(prev => !prev);

  const handleChange = event => {
    setSearchForm(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleChangeDate = event =>
    setSearchForm(prev => ({
      ...prev,
      date_time_original: {
        ...date_time_original,
        [event.target.name]: event.target.value
      }
    }));

  const handleSubmit = event => {
    event.preventDefault();
    setQueryMainMap(searchForm);
    toggleShow();
  };

  return (
    <Fragment>
      <Button
        variant='warning'
        onClick={toggleShow}
        className='position-fixed rounded-circle'
        style={{
          zIndex: '10000',
          width: '4rem',
          height: '4rem',
          fontSize: '1.5rem',
          bottom: 5,
          left: 5
        }}
      >
        <FontAwesomeIcon icon={faSearch} />
      </Button>
      <Offcanvas show={show} onHide={toggleShow} placement='start'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter observations</Offcanvas.Title>
        </Offcanvas.Header>

        <Form onSubmit={handleSubmit}>
          <Offcanvas.Body>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='project_id'>
                  <Form.Label>Project ID:</Form.Label>
                  <Form.Control
                    placeholder='Project ID'
                    name='project_id'
                    value={project_id}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='deployment_id'>
                  <Form.Label>Deployment ID:</Form.Label>
                  <Form.Control
                    placeholder='Deployment ID'
                    name='deployment_id'
                    value={deployment_id}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
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
              </Col>
              <Col>
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
              </Col>
            </Row>
            <Row>
              <Col>
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
              </Col>
              <Col>
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
              </Col>
            </Row>
            <Row>
              <Col>
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
              </Col>
              <Col>
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
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='minLon'>
                  <Form.Label>Min. longitude:</Form.Label>
                  <Form.Control
                    placeholder='Min. longitude'
                    name='minLon'
                    value={minLon}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='maxLon'>
                  <Form.Label>Max. longitude:</Form.Label>
                  <Form.Control
                    placeholder='Max. longitude'
                    name='maxLon'
                    value={maxLon}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='minLat'>
                  <Form.Label>Min. latitude:</Form.Label>
                  <Form.Control
                    placeholder='Min. latitude'
                    name='minLat'
                    value={minLat}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='maxLat'>
                  <Form.Label>Max. latitude:</Form.Label>
                  <Form.Control
                    placeholder='Max. latitude'
                    name='maxLat'
                    value={maxLat}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='initialDate'>
                  <Form.Label>After:</Form.Label>
                  <Form.Control
                    name='gte'
                    type='date'
                    value={date_time_original.gte}
                    onChange={handleChangeDate}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className='mb-3' controlId='endDate'>
                  <Form.Label>But before:</Form.Label>
                  <Form.Control
                    name='date_time_original[lt]'
                    type='date'
                    value={date_time_original.lt}
                    onChange={handleChangeDate}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className='mt-2'>
              <Button variant='warning' type='submit'>
                Search
              </Button>
            </Row>
            <Row className='mt-3'>
              <Button variant='info' onClick={() => setObservationsMap([])}>
                Clear map
              </Button>
            </Row>
          </Offcanvas.Body>
        </Form>
      </Offcanvas>
    </Fragment>
  );
};

export default SearchCanvas;
