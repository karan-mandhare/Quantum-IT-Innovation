import { useEffect, useState } from "react";
import "./Home.css";
import { IoMdSettings } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 7;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleDeleteItem = async (id) => {
    try {
      const res = await axios.delete(`/api/employee/delete/${id}`);

      if (res.status === 200) {
        setItems((prevItems) => prevItems.filter((item) => item._id !== id));

        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleEditItem = async (id) => {
    try {
      navigate(`/update/${id}`);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const logoutUser = async () => {
    try {
      const res = await axios.post("/api/user/logout");
      if (res) {
        toast.success(res.data.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const AddItem = async () => {
    try {
      navigate("/additem");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const res = await axios.get("/api/employee/get");
        if (res) {
          setItems(res.data.response);
          console.log(res.data.response);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getAllItems();
  }, [setItems]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          MyApp
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pricing
              </a>
            </li>
          </ul>
          <button
            className="btn btn-outline-danger my-2 my-sm-0"
            type="button"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container mt-4">
        <div className="jumbotron d-flex justify-content-between align-items-center">
          <h4>Welcome to the Home</h4>
          <button className="btn btn-primary" onClick={AddItem}>
            Add Item
          </button>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Date Created</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item._id}>
                <th scope="row">{startIndex + index + 1}</th>
                <td className="table-row-content">
                  <img
                    src={item.photo}
                    alt="Uploaded"
                    className="rounded-circle"
                  />
                  <div>
                    <p>{item.name}</p>
                  </div>
                </td>
                <td>{formatDate(item.createdAt)}</td>
                <td>{item.role}</td>
                <td>{item.status}</td>
                <td>
                  <button className="border-0 bg-transparent">
                    <IoMdSettings
                      className="icon-settings"
                      onClick={() => handleEditItem(item._id)}
                    />
                  </button>
                  <button
                    className="border-0 bg-transparent"
                    onClick={() => handleDeleteItem(item._id)}
                  >
                    <TiDelete className="icon-delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 && "disabled"}`}>
              <button className="page-link" onClick={handlePrevPage}>
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${currentPage === index + 1 && "active"}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages && "disabled"
              }`}
            >
              <button className="page-link" onClick={handleNextPage}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <footer className="footer bg-light mt-5 p-3 text-center">
        <p>&copy; 2024 MyApp. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
