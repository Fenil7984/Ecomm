/* import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VerifyOtpThunkApi } from "../redux/User/UserThunk";
import { toast } from "react-toastify";

export default function VerifyOtp() {

    const [formData, setFormData] = useState({
        email_id:"",
        otp:""
      });
    
      const dispatch = useDispatch();
      const navigate = useNavigate();
    
      const verifyOtpHandler = async (e) => {
        e.preventDefault();
        try {
          dispatch(VerifyOtpThunkApi({ formData, dispatch, navigate, toast }));
        } catch (error) {
          console.log("error:", error);
        }
      };
    
      const inputHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
 
  return (
    <div className="login">
      <form onSubmit={verifyOtpHandler}>
        <div className="formInLa">
          <label htmlFor="identifiers">E-mail</label>
          <input
            className="formInP2"
            type="email"
            name="email_id"
            onChange={inputHandler}
          />
        </div>

        <div className="formInLa">
          <label htmlFor="password">Otp</label>
          <input
            className="formInP1"
            type="text"
            name="otp"
            onChange={inputHandler}

          />
        </div>

        

        <div>
          <button className="butt">Submit</button>
        </div>
      </form>
    </div>
  );
}
 */




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
import { LoginUser, VerifyOtpThunkApi } from "../redux/User/UserThunk";
import { toast } from "react-toastify";

export default function Login() {
 
  const [formData, setFormData] = useState({
    email_id:"",
    otp:""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verifyOtpHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(VerifyOtpThunkApi({ formData, dispatch, navigate, toast }));
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
          <Typography variant="h5">Verify OTP</Typography>
          <form
            style={{ width: "100%", marginTop: "1rem" }}
            onSubmit={verifyOtpHandler}
          >
            <TextField
              required
              fullWidth
              label="Email Id"
              margin="normal"
              variant="outlined"
              value={formData.email_id}
              name="email_id"
              onChange={inputHandler}
            />
            <TextField
              required
              fullWidth
              label="OTP"
              type="text"
              margin="normal"
              variant="outlined"
              value={formData.otp}
              name="otp"
              onChange={inputHandler}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ marginTop: "1rem" }}
            >
              Submit
            </Button>


          </form>
        </Paper>
      </Container>
    </div>
  );
}
