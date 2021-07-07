import { Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ProtectedRoute from './components/ProtectedRoute';
import SignIn from './components/SignIn';
import NewObservations from './components/NewObservations';

const App = () => {
  return (
    <Container>
      <Switch>
        <Route exact path='/' component={SignIn} />
        <ProtectedRoute exact path='/secret' component={NewObservations} />
      </Switch>
    </Container>
  );
};

export default App;
