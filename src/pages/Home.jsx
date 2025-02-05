import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
// import handleDeleteActivity from "./DeleteActivity";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [activities, setActivities] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const navigate = useNavigate();

  const getAllWorkout = async () => {
    axios
      .get("http://localhost:3000/workouts/")
      .then((res) => {
        console.log(res.data.workouts);

        console.log(res.data.workouts);
        setActivities(res.data.workouts);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllWorkout();
  }, []);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handlecreateActivity = async () => {
    const data = {
      title,
      load,
      reps,
    };
    axios
      .post("http://localhost:3000/workouts/", data)
      .then(() => {
        enqueueSnackbar("Activity Added successfully");
        setTitle("");
        setLoad("");
        setReps("");
        getAllWorkout();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <h1 className="navbar-brand">MY WORKOUT GYM</h1>
          <div className="d-flex align-items-center">
            <span className="fs-5 me-3">Signed in as:</span>
            <button
              className="btn btn-primary rounded-pill px-4 py-2"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="row mt-4">
        {/* Workout List */}
        <div className="col-md-6">
          <h2>Workouts</h2>
          {activities.length > 0 ? (
            activities.map((activity) => (
              <div key={activity._id} className="card mb-3">
                <div className="card-body">
                  <h4 className="card-title">Title: {activity.title}</h4>
                  <p className="card-text">Load: {activity.load} Kg</p>
                  <p className="card-text">Reps: {activity.reps}</p>
                  <Link
                    to={`/delete/${activity._id}`}
                    className="btn btn-danger "
                  >
                    Delete
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No workouts found</p>
          )}
        </div>

        {/* Add a new workout */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-4">Add a New Workout</h2>
          <form>
            <div className="mb-3">
              <label className="form-label">Title:</label>
              <input
                type="text"
                className="form-control w-50"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label ">Load (in Kg):</label>
              <input
                type="number"
                className="form-control w-50"
                value={load}
                onChange={(e) => setLoad(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Reps:</label>
              <input
                type="text"
                className="form-control"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary rounded-pill py-2 fw-bold"
              onClick={handlecreateActivity}
            >
              Add Workout
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
