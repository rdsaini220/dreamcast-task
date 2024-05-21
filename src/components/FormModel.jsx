import React from "react";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { addUser, editUser } from "../store/slice/user/userThank";

const FormModel = ({ userData, setUserData, show, handleClose }) => {
  const dispatch = useDispatch();

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (userData?.id) {
      dispatch(editUser(userData));
    } else {
      dispatch(addUser(userData));
    }
    handleClose();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h5 className="modal-title">{userData?.id ? "Edit" : "Add"} User</h5>
        </Modal.Header>
        <div className="modal-body">
          <form onSubmit={handleEditSubmit}>
            <div class="mb-3">
              <label for="Name" class="form-label">
                Name
              </label>
              <input
                id="Name"
                className="form-control"
                type="text"
                placeholder="Name"
                value={userData?.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                required
              />
            </div>
            <div class="mb-3">
              <label for="Email" class="form-label">
                Email
              </label>
              <input
                id="Email"
                className="form-control"
                type="email"
                placeholder="Email"
                value={userData?.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                required
              />
            </div>
            <div class="mb-3">
              <label for="Phone" class="form-label">
                Phone
              </label>
              <input
                id="Phone"
                className="form-control"
                type="text"
                placeholder="Phone"
                value={userData?.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                required
              />
            </div>
            <div class="mb-3">
              <label for="City" class="form-label">
                City
              </label>
              <input
                id="City"
                className="form-control"
                type="text"
                placeholder="City"
                value={userData?.address?.city}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: { ...userData?.address, city: e.target.value },
                  })
                }
                required
              />
            </div>
            <div class="mb-3">
              <label for="zipcode" class="form-label">
                Zip Code
              </label>
              <input
                id="zipcode"
                className="form-control"
                type="text"
                placeholder="zipcode"
                value={userData?.address?.zipcode}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    address: { ...userData?.address, zipcode: e.target.value },
                  })
                }
                required
              />
            </div>
            <div className="my-2">
              <button className="btn btn-success mt-3" type="submit">
                {" "}
                {userData?.id ? "Update" : "Save"}
              </button>
              <button
                className="btn btn-outline-danger mt-3 ms-2"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default FormModel;
