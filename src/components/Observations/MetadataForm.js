import { useState, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { v4 as uuid_v4 } from 'uuid';
import { toast } from 'react-toastify';
import { ObservationContext } from '../../context/ObservationsContext';
import { statusList, patternList, colorList } from '../../utils/searchFormHelpers';

const MetadataForm = ({ currentObservation }) => {
  const { updateObservation } = useContext(ObservationContext);
  const [metaDataForm, setMetaDataForm] = useState(currentObservation);
  const { status, pattern, primaryColor, secondaryColor } = metaDataForm;
  const [edited, setEdited] = useState(false);

  const handleChange = event => {
    setMetaDataForm(prev => ({ ...prev, [event.target.name]: event.target.value }));
    !edited && setEdited(true);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!edited) return toast.info('Nothing to update');
    updateObservation(metaDataForm);
    setEdited(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className='align-items-center'>
        <Col sm={3}>
          <Form.Group className='mb-3' controlId='status'>
            <Form.Label>Status</Form.Label>
            <Form.Select name='status' value={status} onChange={handleChange}>
              {statusList.map(status => (
                <option key={uuid_v4()} value={status}>
                  {status}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3' controlId='pattern'>
            <Form.Label>Pattern</Form.Label>
            <Form.Select name='pattern' value={pattern} onChange={handleChange}>
              {patternList.map(pattern => (
                <option key={uuid_v4()} value={pattern}>
                  {pattern}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col sm={3}>
          <Form.Group className='mb-3' controlId='primaryColor'>
            <Form.Label>Primary color:</Form.Label>
            <Form.Select name='primaryColor' value={primaryColor} onChange={handleChange}>
              {colorList.map(color => (
                <option key={uuid_v4()} value={color}>
                  {color}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3' controlId='secondaryColor'>
            <Form.Label>Secondary color:</Form.Label>
            <Form.Select name='secondaryColor' value={secondaryColor} onChange={handleChange}>
              {colorList.map(color => (
                <option key={uuid_v4()} value={color}>
                  {color}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className='mt-5'>
        <Button variant='success' type='submit'>
          Save
        </Button>
      </Row>
    </Form>
  );
};

export default MetadataForm;
