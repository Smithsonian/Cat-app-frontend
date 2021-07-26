import Row from 'react-bootstrap/Row';
import NewUserCanvas from './NewUserCanvas';
import Dashboard from './Dashboard';
import Users from './Users';
import { Fragment } from 'react';

const Admin = () => {
  return (
    <Fragment>
      <Row className='mt-5'>
        <NewUserCanvas />
        <Dashboard />
      </Row>
      <Row>
        <Users />
      </Row>
    </Fragment>
  );
};

export default Admin;
