import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteActivity = () => {
  const { enqueueSnackbar } = useSnackbar();
  const nav = useNavigate();
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    nav("/home");
  };
  const handleShow = () => setShow(true);

  const { id } = useParams();
  const handleDeleteActivity = () => {
    axios
      .delete(`http://localhost:3000/Workouts/${id}`)
      .then(() => {
        enqueueSnackbar("Activity Deleted successfully");
        nav("/home");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {/* <h1 className="my-4">Delete Activity</h1>
      <div className="d-flex flex-column flex-justify-center border border-danger rounded-xl p-5">
        <h5 className="display-5 my-5 text-center ">
          Are You Sure You Want To Delete This activity
        </h5>

        <button
          className="p-4 btn btn-danger text-white m-8 w-50 justify-content-center align-items-center"
          onClick={handleDeleteActivity}
        >
          Yes, Delete it
        </button>
      </div> */}
      {/* modal test */}
      <Button variant="primary" onClick={handleShow}>
        Delete{" "}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you You want to delete this</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteActivity}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteActivity;
