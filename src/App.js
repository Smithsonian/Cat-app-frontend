import { Switch, Route } from 'react-router-dom';
import ObservationsState from './context/ObservationsContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import SignIn from './components/Auth/SignIn';
import Admin from './components/Auth/Admin';
import NavigationBar from './components/Navigation/NavigationBar';
import Observations from './components/Observations/Observations';
import './assets/css/styles.css';

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
