import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import SignIn from './components/SignIn';
import NewObservations from './components/NewObservations';

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={SignIn} />
      <ProtectedRoute exact path='/observations' component={NewObservations} />
    </Switch>
  );
};

export default App;
