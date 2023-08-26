import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../actions/userActions";

function UserListScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  console.log(userList);


  const userO = useSelector((state) => state.userLogin);
  const user = userO.user;

  const userDelete = useSelector((state) => state.userDelete);
  const {success:successDelete } = userDelete;

  const deleteHandler = (id) => {

    if(window.confirm('Are you sure you want to delete this user?')){
        dispatch(deleteUser(id))

    }

  };

  useEffect(() => {
    if(user && user.isAdmin){
    dispatch(getUsersList());

    }else{
        navigate('/login')
    }
  }, [dispatch, navigate, successDelete, user]);

  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-x" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    onClick={() => deleteHandler(user._id)}
                    variant="danger"
                    className="btn-sm"
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default UserListScreen;
