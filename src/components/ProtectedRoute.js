import { useContext, Fragment } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { AuthContext } from '../context/AuthContext';
import NavigationBar from './NavigationBar';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? (
    <Fragment>
      <NavigationBar />
      <Container>
        <Route {...rest} render={() => <Component />} />
      </Container>
    </Fragment>
  ) : (
    <Redirect to='/' />
  );
};

export default ProtectedRoute;
