import { useState, useContext, Fragment } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { v4 as uuid_v4 } from 'uuid';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
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
      <Col className='mb-2'>
        <Row>
          <Col xs={1}>
            <Button variant='info' onClick={() => setProtocolShow(true)}>
              <FontAwesomeIcon icon={faLightbulb} />
            </Button>
            <ProtocolModal show={protocolShow} onHide={() => setProtocolShow(false)} />
          </Col>
        </Row>
      </Col>
      <Col>
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
            <Button
              variant='success'
              type='submit'
              disabled={!currentObservation.isCat || currentObservation.notID}
            >
              Save metadata
            </Button>
          </Row>
        </Form>
      </Col>
      <Col className='mb-2'>
        {!currentObservation.specimen && (
          <Row className='justify-content-around'>
            <Col md={4}>
              <Row>
                <Button
                  variant='warning'
                  onClick={() => updateObservationNotCat(currentObservation, true)}
                  disabled={!currentObservation.isCat || currentObservation.notID}
                >
                  Not a cat
                </Button>
              </Row>
            </Col>
            <Col md={4}>
              <Row>
                <Button
                  variant='danger'
                  onClick={() => updateObservationNotCat(currentObservation)}
                  disabled={!currentObservation.isCat || currentObservation.notID}
                >
                  Unidentifiable
                </Button>
              </Row>
            </Col>
          </Row>
        )}
      </Col>
    </Fragment>
  );
};

export default MetadataForm;
