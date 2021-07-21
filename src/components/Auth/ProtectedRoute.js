import { useContext, Fragment } from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ObservationsState from '../../context/ObservationsContext';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ component: Component, admin, ...rest }) => {
  const { pathname } = useLocation();
  const {
    isAuthenticated,
    user: { role }
  } = useContext(AuthContext);

  return isAuthenticated ? (
    admin && role === 'user' ? (
      <Redirect to='/observations' />
    ) : (
      <Fragment>
        <Container fluid>
          <ObservationsState>
            <Route {...rest} render={() => <Component />} />
          </ObservationsState>
        </Container>
      </Fragment>
    )
  ) : (
    <Redirect to={{ pathname: '/', state: { next: pathname } }} />
  );
};

export default ProtectedRoute;
