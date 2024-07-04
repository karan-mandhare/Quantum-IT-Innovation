import { useState } from "react";
import "./Login.css";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/user/login", { email, password });
      if (res) {
        toast.success(res.data.message);
        localStorage.setItem("token", res.data.user[1])
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <Link
                    className="fw-bold mb-2 text-uppercase centered-title"
                    to="/signup"
                  >
                    SIGN IN
                  </Link>
                  <FaRegCircleUser className="my-2" size={70} />

                  <form onSubmit={handleSubmit}>
                    <div className="form-outline d-flex my-4 bg-secondary rounded">
                      <MdOutlineMail size={40} className="m-1 text-white" />
                      <input
                        type="email"
                        className="form-control form-control-lg form-input bg-secondary border-0 text-white"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="form-outline mb-4 d-flex bg-secondary rounded">
                      <IoMdLock className="text-white m-1" size={40} />
                      <input
                        type="password"
                        className="form-control  form-control-lg form-input bg-secondary border-0 text-white"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter your password"
                      />
                    </div>

                    <p className="small mb-5 pb-lg-2">
                      <a className="text-white-50" href="#!">
                        Forgot password?
                      </a>
                    </p>

                    <button
                      className="fw-bold mb-2 text-uppercase centered-button"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      LOGIN
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
