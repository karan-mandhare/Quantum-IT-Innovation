import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

const EditItem = () => {
  const { id } = useParams(); // Assuming you're using React Router for getting the item id
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    status: "active",
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`/api/employee/get/${id}`);
        const { name, role, status } = res.data.response;
        setFormData({ name, role, status });
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/employee/update/${id}`, formData);
      toast.success(res.data.message);
      navigate("/");
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
          <h2 className="card-title text-center mb-4">Edit Item</h2>
          <form onSubmit={handleSubmit}>
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
            <div className="text-center">
              <button type="submit" className="btn btn-primary mt-2">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
