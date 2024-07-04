import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    status: "active",
    photo: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.type === "file") {
      // Handle file upload separately
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0], // Store the file object
      });
    } else {
      // Handle text inputs
      const { name, value } = e.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("photo", formData.photo); // Append file object

      const res = await axios.post("/api/employee/create", formDataToSend);
      toast.success(res.data.message);
      navigate("/");
      setFormData({
        name: "",
        role: "",
        status: "active",
        photo: null,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container mt-4">
      <div
        className="card shadow"
        style={{ maxWidth: "600px", margin: "auto", marginBottom: "20px" }}
      >
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Add Item</h2>
          <form
            onSubmit={handleSubmit}
            action="/uploads"
            encType="multipart/form-data"
          >
            <div className="form-group">
              <label htmlFor="itemName" className="mb-1">
                Name
              </label>
              <input
                type="text"
                className="form-control mb-1"
                id="itemName"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="role" className="mb-1">
                Role
              </label>
              <input
                type="text"
                className="form-control mb-1"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Enter role"
              />
            </div>
            <div className="form-group">
              <label htmlFor="status" className="mb-1">
                Status
              </label>
              <select
                className="form-control mb-1"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                {["active", "suspended", "inactive"].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <input
                type="file"
                className="form-control-file my-1"
                name="photo"
                onChange={handleChange}
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary mt-2">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
