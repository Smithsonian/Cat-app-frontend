import { Switch, Route } from 'react-router-dom';
import ObservationsState from './context/ObservationsContext';
import NavigationBar from './components/NavigationBar';
import ProtectedRoute from './components/ProtectedRoute';
import SignIn from './components/SignIn';
import Observations from './components/Observations';
import Admin from './components/Admin';

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={SignIn} />
      <ObservationsState>
        <NavigationBar />
        <ProtectedRoute exact path='/observations' component={Observations} />
        <ProtectedRoute exact path='/admin' component={Admin} />
      </ObservationsState>
    </Switch>
  );
};

export default App;
