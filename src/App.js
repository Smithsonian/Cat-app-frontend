import { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ObservationsState from './context/ObservationsContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import SignIn from './components/Auth/SignIn';
import Admin from './components/Auth/Admin';
import NavigationBar from './components/Navigation/NavigationBar';
import Observations from './components/Observations/Observations';
import SingleObservation from './components/Observations/SingleObservation';
import './assets/css/styles.css';

const App = () => {
  return (
    <Fragment>
      <ToastContainer position='top-center' autoClose={3000} />
      <Switch>
        <Route exact path='/' component={SignIn} />
        <ObservationsState>
          <NavigationBar />
          <ProtectedRoute exact path='/observation/:id' component={SingleObservation} />
          <ProtectedRoute exact path='/observations' component={Observations} />
          <ProtectedRoute exact path='/admin' component={Admin} />
        </ObservationsState>
      </Switch>
    </Fragment>
  );
};

export default App;
