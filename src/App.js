import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import SignIn from './components/SignIn';
import Observations from './components/Observations';

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={SignIn} />
      <ProtectedRoute exact path='/observations' component={Observations} />
    </Switch>
  );
};

export default App;
