import { useState, useContext, Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
import { v4 as uuid_v4 } from 'uuid';
import { toast } from 'react-toastify';
import { ObservationContext } from '../../context/ObservationsContext';
import ProtocolModal from './ProtocolModal';
import { patternList, genericList, sexList } from '../../utils/searchFormHelpers';

const MetadataForm = ({ currentObservation }) => {
  const { updateObservationMeta, updateObservationNotCat } = useContext(ObservationContext);
  const [metaDataForm, setMetaDataForm] = useState(currentObservation);
  const { pattern, bicolor, longHair, sex, notched, collar } = metaDataForm;
  const [edited, setEdited] = useState(false);
  const [protocolShow, setProtocolShow] = useState(false);

  const handleChange = event => {
    setMetaDataForm(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
    !edited && setEdited(true);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!edited) return toast.info('Nothing to update');
    updateObservationMeta(metaDataForm);
    setEdited(false);
  };

  return (
    <Fragment>
      <Row className='justify-content-between'>
        <Col>
          <span className='fw-bold'>Observed on: </span>
          {moment(currentObservation.date_time_original).format('MMMM Do YYYY, h:mm:ss a')}
        </Col>
        <Col>
          <span className='fw-bold'>Latitude:</span> {currentObservation.location.coordinates[1]}
          <span className='fw-bold'> / </span>
          <span className='fw-bold'>Longitude:</span> {currentObservation.location.coordinates[0]}
        </Col>
        <Col xs={1}>
          <Button variant='info' onClick={() => setProtocolShow(true)}>
            💡
          </Button>
          <ProtocolModal show={protocolShow} onHide={() => setProtocolShow(false)} />
        </Col>
      </Row>
      <Form onSubmit={handleSubmit} className='mb-3'>
        <Row className='align-items-center'>
          <Col sm={4}>
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
          </Col>
          <Col sm={4}>
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
          </Col>
          <Col sm={4}>
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
          </Col>
        </Row>
        <Row className='mt-5'>
          <Button variant='success' type='submit' disabled={!currentObservation.isCat}>
            Save metadata
          </Button>
        </Row>
      </Form>
      {!currentObservation.specimen && (
        <Button
          variant='warning'
          onClick={() => updateObservationNotCat(currentObservation)}
          disabled={!currentObservation.isCat}
        >
          This is not a cat!
        </Button>
      )}
    </Fragment>
  );
};

export default MetadataForm;
