




  
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
import { ForgetPasswordThunkApi } from "../redux/User/UserThunk";
import { toast } from "react-toastify";

export default function ForgetPassword() {
  const [formData, setFormData] = useState({
    email_id: "",
  
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const forgetPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(ForgetPasswordThunkApi({ formData, dispatch, navigate, toast }));
    } catch (error) {
      console.log("error:", error);
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
          <Typography variant="h5">Forget Password</Typography>
          <form
            style={{ width: "100%", marginTop: "1rem" }}
            onSubmit={forgetPasswordHandler}
          >
            <TextField
              required
              fullWidth
              type="email"
              label="Email Id"
              margin="normal"
              variant="outlined"
              value={formData.email_id}
              name="email_id"
              onChange={inputHandler}
            />
          
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ marginTop: "1rem" }}
            >
            Forget Password
            </Button>


          </form>
        </Paper>
      </Container>
    </div>
  );
}
