import React from 'react';
import { Table } from 'react-bootstrap';

const MembersTable = ({ membersList }) => {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th># User Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>role</th>
        </tr>
      </thead>
      <tbody>
        {membersList.map(({ id, firstname, lastname, username, role, created_at }) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{firstname} </td>
            <td>{lastname}</td>
            <td>@{username}</td>
            <td>{role}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MembersTable;
