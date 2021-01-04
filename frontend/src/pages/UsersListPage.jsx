import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList, removeUser } from "../actions/userActions";
import { Button, Table } from "react-bootstrap";
import { USER_REMOVE_RESET } from "../constants/userConstants";

const UsersListPage = ({ history }) => {
  const dispatch = useDispatch();

  const usersList = useSelector((state) => state.usersList);
  const { loading, error, users } = usersList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const deleteUserHandler = (id) => {
    dispatch(removeUser(id));
  };

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getUsersList());
      dispatch({ type: USER_REMOVE_RESET });
    } else {
      history.push("/");
    }
  }, [dispatch, history, userInfo, successDelete]);
  return (
    <>
      <h1>UsersList</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "True" : "False"}</td>
                <td className="text-center">
                  <LinkContainer to={`/admin/users/${user._id}/edit`}>
                    <Button className="btn-sm">Edit</Button>
                  </LinkContainer>
                  <Button
                    className="btn-sm"
                    variant="danger"
                    onClick={() => deleteUserHandler(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UsersListPage;
