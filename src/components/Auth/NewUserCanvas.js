import { useState, useContext, Fragment } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useForm } from 'react-hook-form';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { v4 as uuid_v4 } from 'uuid';
import { AuthContext } from '../../context/AuthContext';

const NewUserCanvas = () => {
  const { createUser } = useContext(AuthContext);
  const initial = {
    name: '',
    email: '',
    role: 'user'
  };
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: initial
  });
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(prev => !prev);

  const onSubmit = async data => {
    await createUser(data);
    toggleShow();
  };

  return (
    <Fragment>
      <Button
        variant='warning'
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
        👤
      </Button>
      <Offcanvas show={show} onHide={toggleShow} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add new user</Offcanvas.Title>
        </Offcanvas.Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Offcanvas.Body>
            <Row>
              <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Name'
                  {...register('name', { required: true })}
                />
                {errors.name && <Alert variant='warning'>Name is required</Alert>}
              </Form.Group>
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Email'
                  {...register('email', { required: true })}
                />
                {errors.email && <Alert variant='warning'>Email is required</Alert>}
              </Form.Group>
              <Form.Group className='mb-3' controlId='role'>
                <Form.Label>User:</Form.Label>
                <Form.Select {...register('role', { required: true })}>
                  {['user', 'admin'].map(option => (
                    <option key={uuid_v4()} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Select>
                {errors.role && <Alert variant='warning'>Role is required</Alert>}
              </Form.Group>
            </Row>
            <Row className='mt-5'>
              <Button variant='info' type='submit'>
                Create user
              </Button>
            </Row>
          </Offcanvas.Body>
        </Form>
      </Offcanvas>
    </Fragment>
  );
};

export default NewUserCanvas;
