import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Home from "./component/Home";
import AddItem from "./component/AddItem";
import EditItem from "./component/EditItem";
import PrivateRoute from "./constants/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute element={Home} />} />
        <Route path="/additem" element={<PrivateRoute element={AddItem} />} />
        <Route
          path="/update/:id"
          element={<PrivateRoute element={EditItem} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
