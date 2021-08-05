import { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import SignIn from './components/Auth/SignIn';
import Admin from './components/Auth/Admin';
import NavigationBar from './components/Navigation/NavigationBar';
import Observations from './components/Observations/Observations';
import ObservationsByDeployment from './components/Observations/ObservationsByDeployment';
import ObservationsForReview from './components/Observations/ObservationsForReview';
import SingleObservation from './components/Observations/SingleObservation';
import MatchObservation from './components/Observations/MatchObservation';
import Cat from './components/Cat/Cat';
import './assets/css/styles.css';

const App = () => {
  return (
    <Fragment>
      <ToastContainer position='top-center' autoClose={3000} />
      <NavigationBar />
      <Switch>
        <Route exact path='/' component={SignIn} />
        <ProtectedRoute exact path='/observation/:id' component={SingleObservation} />
        <ProtectedRoute exact path='/observations' component={Observations} />
        <ProtectedRoute exact path='/deployment/:id' component={ObservationsByDeployment} />
        <ProtectedRoute exact path='/review' admin component={ObservationsForReview} />
        <ProtectedRoute exact path='/match/:id' component={MatchObservation} />
        <ProtectedRoute exact path='/cat/:id' component={Cat} />
        <ProtectedRoute exact path='/admin' admin component={Admin} />
      </Switch>
    </Fragment>
  );
};

export default App;
