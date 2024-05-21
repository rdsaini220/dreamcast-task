import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../store/slice/user/userThank";
import AlertModel from "./AlertModel";
import FormModel from "./FormModel";

const Table = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector((state) => state.user);
  const [alertModel, setAlertModel] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      alert(isError);
    }
  }, [isError]);

  const handleEditUser = (user) => {
    setUserData(user);
    setEditModal(true);
  };

  const handleDeleteUser = (user) => {
    setUserData(user);
    setAlertModel(true);
  };

  const handleCloseModal = useCallback(() => {
    setUserData(null);
    setAlertModel(false);
    setEditModal(false)
  }, []);

  const handleConfirmDelete = useCallback(() => {
    dispatch(deleteUser(userData?.id));
    handleCloseModal();
  }, [dispatch, userData, handleCloseModal]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <button
        className="btn btn-primary mb-2"
        onClick={() => setEditModal(true)}
      >
        Add User
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Zip Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((user) => (
              <tr key={user?.id}>
                <td>{user?.id}</td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>{user?.phone}</td>
                <td>{user?.address?.city}</td>
                <td>{user?.address?.zipcode}</td>
                <td>
                  <button
                    className="btn btn-outline-success me-3"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDeleteUser(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>User Data Not Availabil</td>
            </tr>
          )}
        </tbody>
      </table>
      <AlertModel
        title={"Delete User"}
        message={"Are you sure want to delete?"}
        show={alertModel}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmDelete}
      />
      <FormModel
        show={editModal}
        handleClose={handleCloseModal}
        userData={userData}
        setUserData={setUserData}
      />
    </>
  );
};

export default Table;
