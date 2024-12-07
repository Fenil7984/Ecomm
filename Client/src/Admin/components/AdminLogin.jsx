import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { Loginadmin } from "../../User/redux/Admin/AdminThunk";

export default function AdminLogin() {
  // Initialize form data state outside of the loginFormHandler
  const [formData, setFormData] = useState({
    identifiers: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminLoginFormHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(Loginadmin({ formData, navigate, toast ,dispatch}));
    } catch (error) {
      console.log("error:", error);
    }
  };

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="login">
      <form onSubmit={adminLoginFormHandler}>
        <div className="formInLa">
          <label htmlFor="identifiers">User Name</label>
          <input
            className="formInP1"
            type="text"
            name="identifiers"
            value={formData.identifiers} 
            onChange={inputHandler} 
          />
        </div>

        <div className="formInLa">
          <label htmlFor="password">Password</label>
          <input
            className="formInP2"
            type="password"
            name="password"
            value={formData.password}  // Controlled input
            onChange={inputHandler}  // Update state
          />
        </div>

        <div>
          <button className="butt">Login</button>
        </div>
      </form>
    </div>
  );
}