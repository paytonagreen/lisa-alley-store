import {useState} from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import PropTypes from "prop-types";

import Error from "../utils/ErrorMessage";
import Table from "../styles/Table";
import SickButton from "../styles/SickButton";

const possiblePermissions = [
  "ADMIN",
  "USER",
  "ITEMCREATE",
  "ITEMUPDATE",
  "ITEMDELETE",
  "PERMISSIONUPDATE",
];

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = (props) => {
  const { data, loading, error } = useQuery(ALL_USERS_QUERY);
  console.log(data);
  if(loading) return <p>Loading...</p>
  if(error) return <Error error={error}/>


  return (
    <div>
      <Error error={error} />
      <div>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              {possiblePermissions.map((permission) => (
                <th key={permission}>{permission}</th>
              ))}
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {data.users.map((user) => (
              <UserPermissions user={user} key={user.id} />
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

const UserPermissions = (props) => {
  const [permissions, setPermissions] = useState(props.user.permissions);
  const permissionsMutation = useMutation(UPDATE_PERMISSIONS_MUTATION, {
    variables: { permissions, userId: props.user.id },
  });
  const [updatePermissions] = permissionsMutation;
  const mutationLoading = permissionsMutation[1].loading;
  const mutationError = permissionsMutation[1].error;

  function handlePermissionChange(e) {
    const checkbox = e.target;
    //take copy of current permissions
    let updatedPermissions = [...permissions];
    if (checkbox.checked) {
      //add it in!
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(
        (permission) => permission !== checkbox.value
      );
    }
    console.log(updatedPermissions);
    setPermissions(updatedPermissions);
  };
  const user = props.user;
  return (
    <>
      {mutationError && (
        <tr>
          <td colSpan="8">
            <Error error={mutationError} />
          </td>
        </tr>
      )}
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {possiblePermissions.map((permission) => (
          <td key={permission}>
            <label htmlFor={`${user.id}-permission-${permission}`}>
              <input
                id={`${user.id}-permission-${permission}`}
                type="checkbox"
                checked={permissions.includes(permission)}
                value={permission}
                onChange={handlePermissionChange}
              />
            </label>
          </td>
        ))}
        <td>
          <SickButton
            type="button"
            disabled={mutationLoading}
            onClick={updatePermissions}
          >
            Updat{mutationLoading ? "ing" : "e"}
          </SickButton>
        </td>
      </tr>
    </>
  );
};

UserPermissions.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.string,
    permissions: PropTypes.array,
  }).isRequired,
};

export default Permissions;
