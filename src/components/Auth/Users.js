import { useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTag, faUnlock, faLock, faKey } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';

const Users = () => {
  const { usersInApp, toggleRole, toggleStatus, changePassword } = useContext(AuthContext);

  const columns = [
    {
      name: 'Name',
      selector: ({ name }) => name,
      sortable: true
    },
    {
      name: 'Email',
      selector: ({ email }) => email,
      sortable: true
    },
    {
      name: 'Status',
      selector: ({ active }) => (
        <h6>
          <Badge bg={active ? 'success' : 'danger'}>{active ? 'Active' : 'Disabled'}</Badge>
        </h6>
      )
    },
    {
      name: 'Role',
      selector: ({ role }) => (
        <h6>
          <Badge bg={role === 'user' ? 'dark' : 'warning'}>{role}</Badge>
        </h6>
      )
    },
    {
      name: 'Change role | Change status | Send new password',
      selector: ({ _id, active }) => (
        <Row>
          <Col>
            <Button variant='info' onClick={() => toggleRole(_id)}>
              <FontAwesomeIcon icon={faUserTag} />
            </Button>
          </Col>
          <Col>
            <Button variant={active ? 'success' : 'danger'} onClick={() => toggleStatus(_id)}>
              <FontAwesomeIcon icon={active ? faUnlock : faLock} />
            </Button>
          </Col>
          <Col>
            <Button variant='warning' onClick={() => changePassword(_id)}>
              <FontAwesomeIcon icon={faKey} />
            </Button>
          </Col>
        </Row>
      )
    }
  ];
  return (
    <DataTable
      title='Users'
      columns={columns}
      data={usersInApp}
      pagination
      highlightOnHover
    ></DataTable>
  );
};

export default Users;
