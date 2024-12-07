import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../redux/User/UserThunk";
import { toast } from "react-toastify";

export default function Login() {
  const [formData, setFormData] = useState({
    identifiers: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginFormHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(LoginUser({ formData, dispatch, navigate, toast }));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(rgb(244, 148, 97), rgba(170, 202, 114, 0.67))",
          minHeight: "100vh", 
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{ flexGrow: 1, paddingTop: "5rem", paddingBottom:"5rem" }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Login</Typography>
          <form
            style={{ width: "100%", marginTop: "1rem" }}
            onSubmit={loginFormHandler}
          >
            <TextField
              required
              fullWidth
              label="Username OR Email Id"
              margin="normal"
              variant="outlined"
              value={formData.identifiers}
              name="identifiers"
              onChange={inputHandler}
            />
            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              value={formData.password}
              name="password"
              onChange={inputHandler}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ marginTop: "1rem" }}
            >
              Login
            </Button>


            <Typography textAlign={"center"} m={"1rem"}>
                OR
              </Typography>
  
              <Button
                variant="text"
                fullWidth
                onClick={() => navigate("/forget-password")}
              >
                Forget Password
              </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
