import { useContext } from 'react';
import DataTable from 'react-data-table-component';
import { AuthContext } from '../../context/AuthContext';

const Users = () => {
  const { usersInApp } = useContext(AuthContext);
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
      selector: ({ active }) => (active ? 'Active' : 'Inactive')
    },
    { name: 'Role', selector: ({ role }) => role }
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
