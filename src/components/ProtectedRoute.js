import { useContext, Fragment } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { AuthContext } from '../context/AuthContext';
import ObservationsState from '../context/ObservationsContext';
import NavigationBar from './NavigationBar';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? (
    <Fragment>
      <NavigationBar />
      <ObservationsState>
        <Container fluid>
          <Route {...rest} render={() => <Component />} />
        </Container>
      </ObservationsState>
    </Fragment>
  ) : (
    <Redirect to='/' />
  );
};

export default ProtectedRoute;
