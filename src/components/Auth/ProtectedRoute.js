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

  if (!isAuthenticated) return <Redirect to={{ pathname: '/', state: { next: pathname } }} />;
  if (admin && role === 'user') return <Redirect to='/observations' />;

  return (
    <Fragment>
      <Container fluid>
        <ObservationsState>
          <Route {...rest} render={() => <Component />} />
        </ObservationsState>
      </Container>
    </Fragment>
  );
};

export default ProtectedRoute;
