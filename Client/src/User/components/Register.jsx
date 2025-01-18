/* import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"
import { NavLink, useNavigate } from "react-router-dom";
import { registerThunkApi } from "../redux/User/UserThunk";



export default function Register() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email_id: "",
    password: "",
    confirmPassword: "",
    username: ""

  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleImgChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImg(file)
    }
  }

  const formHandler = async (e) => {

    e.preventDefault();
    const form = new FormData()
    Object.keys(formData).forEach((key) => form.append(key, formData[key]))
    if (selectedImg) {
      form.append("profileImg", selectedImg)
    }
    try {
      await dispatch(registerThunkApi({ form, navigate, toast }))


    } catch (error) {
      console.log(error)

    }

  }

  const inputHandeler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="register">
        <form onSubmit={formHandler}>
          <div className="image-container">

            <label htmlFor="image-upload">
              <img src={selectedImg ? URL.createObjectURL(selectedImg) : "https://via.placeholder.com/150"} alt="" className="profile-img" />
            </label>
            <input type="file" name="profileImg" id="image-upload" accept="image/" style={{ display: "none" }} onChange={handleImgChange} />
          </div>

          <div className="formInLa">
            <label htmlFor="">First Name</label>
            <input className="formInP1" type="text" name="fname" onChange={inputHandeler} />
          </div>
          <div className="formInLa">
            <label htmlFor="">Last Name</label>
            <input className="formInP2" type="text" name="lname" onChange={inputHandeler} />
          </div>
          <div className="formInLa">
            <label htmlFor="">Username</label>
            <input className="formInP3" type="text" name="username" onChange={inputHandeler} />
          </div>
          <div className="formInLa">
            <label htmlFor="">Email</label>
            <input className="formInP4" type="text" name="email_id" onChange={inputHandeler} />
          </div>
          <div className="formInLa">
            <label htmlFor="">Password</label>
            <input className="formInP5" type="password" name="password" onChange={inputHandeler} />
          </div>
          <div className="formInLa">
            <label htmlFor="">Confirm Password</label>
            <input className="formInP6" type="password" name="confirmPassword" onChange={inputHandeler} />
          </div>


          <div>
            <button className="butt">Register</button>
          </div>
          <div>

            <NavLink to={"/login"}>

              <button className="butt">Login</button>
            </NavLink>
          </div>


        </form>
      </div>


    </>
  );
} */

import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerThunkApi } from "../redux/User/UserThunk";
import { CameraAlt } from "@mui/icons-material"; // Don't forget to import CameraAlt

export default function Register() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email_id: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle image change
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImg(file);
    }
  };

  // Handle form submission
  const formHandler = async (e) => {
    e.preventDefault();

    // Validate form data
    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));
    if (selectedImg) {
      form.append("profileImg", selectedImg);
    }

    try {
      await dispatch(registerThunkApi({ form, navigate, toast }));
    } catch (error) {
      console.log(error);
    }
  };

  // Handle form input changes
  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(rgb(244, 148, 97), rgba(170, 202, 114, 0.67))",
        minHeight: "100vh", // Ensure the div takes at least the full viewport height
        display: "flex",
        flexDirection: "column", // Arrange items vertically
        justifyContent: "flex-start", // Align items to the top
      }}
    >
      <Container component="main" maxWidth="xs" sx={{ flexGrow: 1, paddingTop: "5rem", paddingBottom: "5rem" }}>
        <Paper elevation={3} sx={{ padding: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h5">Sign Up</Typography>
          <form style={{ width: "100%", marginTop: "1rem" }} onSubmit={formHandler}>
            <Stack position={"relative"} width={"10rem"} margin={"auto"}>
              <Avatar sx={{ width: "10rem", height: "10rem", objectFit: "contain" }} src={selectedImg ? URL.createObjectURL(selectedImg) : "https://via.placeholder.com/150"} />
              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.5)",
                  ":hover": {
                    bgcolor: "rgba(0,0,0,0.7)",
                  },
                }}
                component="label"
              >
                <CameraAlt />
                <input type="file" hidden onChange={handleImgChange} />
              </IconButton>
            </Stack>

            {errors.confirmPassword && (
              <Typography color="error" variant="caption" m={"1rem auto"} width={"fit-content"} display={"block"}>
                {errors.confirmPassword}
              </Typography>
            )}

            <TextField
              required
              fullWidth
              label="First Name"
              margin="normal"
              variant="outlined"
              name="fname"
              value={formData.fname}
              onChange={inputHandler}
            />

            <TextField
              required
              fullWidth
              label="Last Name"
              margin="normal"
              variant="outlined"
              name="lname"
              value={formData.lname}
              onChange={inputHandler}
            />

            <TextField
              required
              fullWidth
              label="Email"
              margin="normal"
              variant="outlined"
              name="email_id"
              value={formData.email_id}
              onChange={inputHandler}
            />

            <TextField
              required
              fullWidth
              label="Username"
              margin="normal"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={inputHandler}
            />

            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={inputHandler}
            />

            <TextField
              required
              fullWidth
              label="Confirm Password"
              type="password"
              margin="normal"
              variant="outlined"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={inputHandler}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ marginTop: "1rem" }}
            >
              Sign Up
            </Button>

            <Typography textAlign={"center"} m={"1rem"}>
              OR
            </Typography>

            <Button
              variant="text"
              fullWidth
              onClick={() => navigate("/login")}
            >
              Login Instead
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}



























