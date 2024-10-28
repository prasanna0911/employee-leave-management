import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ValidateEmail } from "../../Utils/ValidateEmail";
import { ApiServices } from "../../Api/ApiServices";
import { useMyContext } from "../../Context/MyContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordErrMsg, setPasswordErrMsg] = useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const { setIsLogin, setIsAdmin } = useMyContext();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    setEmailErr(false);
    setEmailErrMsg("");
    setPasswordErr(false);
    setPasswordErrMsg("");
    if (!email) {
      setEmailErr(true);
      setEmailErrMsg("Email cannot be empty");
      return;
    }
    if (!password) {
      setPasswordErr(true);
      setPasswordErrMsg("Password cannot be empty");
      return;
    }
    if (!ValidateEmail(email)) {
      setEmailErr(true);
      setEmailErrMsg("Enter a valid email");
      return;
    }
    var json = {
      email: email,
      password: password,
    };
    ApiServices.AdminLogin(json).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", "Admin");
        // setIsLogin(true);
        // setIsAdmin(true);
        window.location.reload();
      } else if (res.response_code === 404) {
        setEmailErr(true);
        setEmailErrMsg("Admin not found");
      } else if (res.response_code === 401) {
        setPasswordErr(true);
        setPasswordErrMsg("Password didn't match");
      } else {
        alert("Login Failed");
      }
    });
  };
  return (
    <div className="text-center">
      <Typography variant="h5" className="mb-4">
        Admin login
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        className="mt-2 w-100"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={emailErr}
        helperText={emailErr ? emailErrMsg : ""}
      />
      <FormControl
        className="mt-2 w-100"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={passwordErr}
      >
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((show) => !show)}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
        {passwordErr && <FormHelperText>{passwordErrMsg}</FormHelperText>}
      </FormControl>
      <Button variant="contained" className="mt-3" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default AdminLogin;
