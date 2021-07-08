import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';

const SignIn = () => {
  const { loading, isAuthenticated, signIn, error } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async data => {
    signIn(data);
  };

  if (isAuthenticated) return <Redirect to='/secret' />;
  return (
    <Container>
      <Row className='flex-column justify-content-center align-items-center vh-100'>
        {!loading ? (
          <Col md={4}>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group controlId='email' className='text-center'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  {...register('email', { required: true })}
                />
                {errors.email && <Alert variant='warning'>Email is required</Alert>}
              </Form.Group>
              <Form.Group controlId='password' className='text-center'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  {...register('password', { required: true })}
                />
                {errors.password && <Alert variant='warning'>Password is required</Alert>}
              </Form.Group>
              <Button type='submit' variant='primary' className='mt-5 w-100'>
                Submit
              </Button>
            </Form>
          </Col>
        ) : (
          <Loading />
        )}
      </Row>
    </Container>
  );
};

export default SignIn;
