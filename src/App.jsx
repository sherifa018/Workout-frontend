import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import DeleteActivity from "./pages/DeleteActivity.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/delete/:id" element={<DeleteActivity />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
