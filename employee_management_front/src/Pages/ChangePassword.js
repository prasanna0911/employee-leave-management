// import node module libraries
import { Col, Row, Form } from "react-bootstrap";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useState } from "react";
import { CardContent, Card, Typography } from "@mui/material";
import { ApiServices } from "../Api/ApiServices";
import { useMyContext } from "../Context/MyContext";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [currentPasswordErrorMsg, setCurrentPasswordErrorMsg] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [newPasswordErrorMsg, setNewPasswordErrorMsg] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState("");
  // const [showSuccessModal, setShowSuccessModal] = useState(false);

  const { isAdmin } = useMyContext();

  const handlePasswordChange = () => {
    setCurrentPasswordError(false);
    setNewPasswordError(false);
    setConfirmPasswordError(false);
    setNewPasswordErrorMsg("");
    setConfirmPasswordErrorMsg("");

    if (newPassword.length < 8) {
      setNewPasswordError(true);
      setNewPasswordErrorMsg("password must contain atleast 8 characters");
      return;
    }
    if (confirmPassword !== newPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMsg("password did't match");
      return;
    }

    var json = {
      password: currentPassword,
      newPassword: newPassword,
    };
    if (isAdmin) {
      ApiServices.AdminPasswordChange(json).then((res) => {
        console.log(res);
        if (res.response_code === 200) {
          // if (res.success) {
          //   setShowSuccessModal(true);
          // } else {
          //   setNewPasswordError(true);
          //   setNewPasswordErrorMsg(
          //     "current password cannot be your new password"
          //   );
          // }
        } else if (res.response_code === 401) {
          setCurrentPasswordError(true);
          setCurrentPasswordErrorMsg("Incorrect password");
        } else {
          alert("something went wrong");
        }
      });
    } else {
      ApiServices.EmployeePasswordChange(json).then((res) => {
        console.log(res);
        if (res.response_code === 200) {
          // if (res.success) {
          //   setShowSuccessModal(true);
          // } else {
          //   setNewPasswordError(true);
          //   setNewPasswordErrorMsg(
          //     "current password cannot be your new password"
          //   );
          // }
        } else if (res.response_code === 401) {
          setCurrentPasswordError(true);
          setCurrentPasswordErrorMsg("Incorrect password");
        } else {
          alert("something went wrong");
        }
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Card id="edit" className="w-100" style={{ maxWidth: "650px" }}>
        {/* card body */}
        <CardContent>
          <div className="mb-6 ">
            <Typography variant="h5" className="mb-5">
              Change Password
            </Typography>
          </div>
          <Form>
            <Row className="mb-3">
              <FormHelperText className="col-sm-4">
                <Typography variant="subtitle1" fontWeight="bold">
                  Current password :
                </Typography>
              </FormHelperText>
              <Col md={8} xs={12}>
                <TextField
                  placeholder="enter your Current password?"
                  style={{ width: "100%", maxWidth: 500 }}
                  id="fullWidth"
                  InputProps={{
                    classes: {
                      input: "custom-input-class",
                    },
                  }}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  error={currentPasswordError}
                  helperText={
                    currentPasswordError ? currentPasswordErrorMsg : ""
                  }
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <FormHelperText className="col-sm-4">
                <Typography variant="subtitle1" fontWeight="bold">
                  New password :
                </Typography>
              </FormHelperText>
              <Col md={8} xs={12}>
                <TextField
                  placeholder="enter New password?"
                  style={{ width: "100%", maxWidth: 500 }}
                  id="fullWidth"
                  InputProps={{
                    classes: {
                      input: "custom-input-class",
                    },
                  }}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  error={newPasswordError}
                  helperText={newPasswordError ? newPasswordErrorMsg : ""}
                />
              </Col>
            </Row>

            <Row className="align-items-center">
              <FormHelperText className="col-sm-4">
                <Typography variant="subtitle1" fontWeight="bold">
                  Confirm new password :
                </Typography>
              </FormHelperText>
              <Col md={8} xs={12}>
                <TextField
                  placeholder="Confirm new password?"
                  style={{ width: "100%", maxWidth: 500 }}
                  id="fullWidth"
                  InputProps={{
                    classes: {
                      input: "custom-input-class",
                    },
                  }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={confirmPasswordError}
                  helperText={
                    confirmPasswordError ? confirmPasswordErrorMsg : ""
                  }
                />
              </Col>

              <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                {/* <h6 className="mb-1">Password requirements:</h6>
                    <p>Ensure that these requirements are met:</p>
                    <ul>
                      <li> Minimum 8 characters long the more, the better</li>
                      <li>At least one lowercase character</li>
                      <li>At least one uppercase character</li>
                      <li>
                        At least one number, symbol, or whitespace character
                      </li>
                    </ul> */}
                <Button
                  variant="outlined"
                  color="primary"
                  className="mt-2"
                  onClick={handlePasswordChange}
                  disabled={
                    currentPassword === "" ||
                    newPassword === "" ||
                    confirmPassword === ""
                  }
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;
