import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
// import { EmployeeData } from "../Datas/SampleDatas";
import {
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableHead,
  TextField,
  Typography,
} from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { ApiServices } from "../Api/ApiServices";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const Employees = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [newEmployeeOpen, setNewEmployeeOpen] = useState(false);
  const [EmployeeData, setEmployeeData] = useState([]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - EmployeeData.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleNewEmployeeClose = () => {
    setNewEmployeeOpen(false);
  };

  const [DepartmentData, setDepartmentData] = useState([]);

  const [newEmpCode, setNewEmpCode] = useState("");
  const [newEmpCodeErr, setNewEmpCodeErr] = useState(false);
  const [newEmpFName, setNewEmpFName] = useState("");
  const [newEmpLName, setNewEmpLName] = useState("");
  const [newEmpEmail, setNewEmpEmail] = useState("");
  const [newEmpPass, setNewEmpPass] = useState("");
  const [newEmpPassErr, setNewEmpPassErr] = useState(false);
  const [newEmpCPass, setNewEmpCPass] = useState("");
  const [newEmpCPassErr, setNewEmpCPassErr] = useState(false);
  const [newEmpGender, setNewEmpGender] = useState("");
  const [newEmpDept, setNewEmpDept] = useState("");
  const [newEmpDOB, setNewEmpDOB] = useState();
  const [newEmpCountry, setNewEmpCountry] = useState("");
  const [newEmpCity, setNewEmpCity] = useState("");
  const [newEmpAddress, setNewEmpAddress] = useState("");
  const [newEmpNumber, setNewEmpNumber] = useState("");

  const GetAllDepartments = () => {
    ApiServices.GetAllDepartments().then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        setDepartmentData(res.department);
      }
    });
  };

  useEffect(() => {
    GetAllDepartments();
  }, []);

  const GetAllEmployees = () => {
    ApiServices.GetAllEmployees().then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        setEmployeeData(res.employees);
      }
    });
  };

  useEffect(() => {
    GetAllEmployees();
  }, []);

  const createNewEmployee = () => {
    setNewEmpPassErr(false);
    setNewEmpCPassErr(false);
    setNewEmpCodeErr(false);
    if (EmployeeData.find((data) => data.emp_code === newEmpCode)) {
      setNewEmpCodeErr(true);
      return;
    }
    if (newEmpPass.length < 8) {
      setNewEmpPassErr(true);
      return;
    }
    if (newEmpPass !== newEmpCPass) {
      setNewEmpCPassErr(true);
      return;
    }
    var json = {
      emp_code: newEmpCode,
      first_name: newEmpFName,
      last_name: newEmpLName,
      email: newEmpEmail,
      emp_password: newEmpPass,
      gender: newEmpGender,
      date_of_birth: format(newEmpDOB.$d, "yyyy-MM-dd"),
      department_id: newEmpDept,
      country: newEmpCountry,
      city: newEmpCity,
      address: newEmpAddress,
      mobile_number: newEmpNumber,
    };
    console.log("json", json);
    ApiServices.CreateEmployee(json)
      .then((res) => {
        console.log("res", res);
        if (res.response_code === 200) {
          GetAllEmployees();
        }
      })
      .finally(handleNewEmployeeClose);
  };

  const hanleEmpActive = (id) => {
    console.log("id", id);

    ApiServices.MakeEmployeeActive(id).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        GetAllEmployees();
      }
    });
  };
  const hanleEmpInactive = (id) => {
    console.log("id", id);
    ApiServices.MakeEmployeeInactive(id).then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        GetAllEmployees();
      }
    });
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0">Employees</h5>
        <Button
          variant="contained"
          size="small"
          onClick={() => setNewEmployeeOpen(true)}
        >
          Add Employee
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell>Emp Id</TableCell>
              <TableCell>Emp Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Reg Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? EmployeeData?.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : EmployeeData
            )?.map((data, index) => (
              <TableRow
                key={data.emp_code}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {EmployeeData.findIndex(
                    (emp) => emp.emp_code === data.emp_code
                  ) + 1}
                </TableCell>
                <TableCell>{data.emp_code}</TableCell>
                <TableCell>
                  {data.first_name} {data.last_name}
                </TableCell>
                <TableCell>{data.department_name}</TableCell>
                <TableCell>
                  {data.emp_status === "active" ? (
                    <Chip
                      // icon={<CheckIcon />}
                      label="Active"
                      color="success"
                      size="small"
                      variant="outlined"
                      style={{ display: "inline-flex" }}
                    />
                  ) : (
                    <Chip
                      // icon={<ClearIcon />}
                      label="Inactive"
                      color="error"
                      size="small"
                      variant="outlined"
                    />
                  )}
                </TableCell>
                <TableCell>{format(data.created_date, "yyyy-MM-dd")}</TableCell>
                <TableCell>
                  {data.emp_status === "active" ? (
                    <IconButton
                      color="error"
                      onClick={() => hanleEmpInactive(data.emp_id)}
                    >
                      <ClearIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      color="success"
                      onClick={() => hanleEmpActive(data.emp_id)}
                    >
                      <CheckIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={12}
                count={EmployeeData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Dialog
        open={newEmployeeOpen}
        onClose={handleNewEmployeeClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Typography variant="h6">Add New Employee</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Employee Code"
            variant="outlined"
            className="mt-2 w-100"
            value={newEmpCode}
            onChange={(e) => setNewEmpCode(e.target.value)}
            error={newEmpCodeErr}
            helperText={newEmpCodeErr ? "Employee code already exists" : ""}
          />
          <Row>
            <Col xl="6" lg="6" md="12" sm="12" xs="12">
              <TextField
                label="Firstname"
                variant="outlined"
                className="mt-2 w-100"
                value={newEmpFName}
                onChange={(e) => setNewEmpFName(e.target.value)}
              />
            </Col>
            <Col xl="6" md="12" lg="6" sm="12" xs="12">
              <TextField
                label="Lastname"
                variant="outlined"
                className="mt-2 w-100"
                value={newEmpLName}
                onChange={(e) => setNewEmpLName(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col xl="6" lg="6" md="12" sm="12" xs="12">
              <TextField
                label="Email"
                variant="outlined"
                className="mt-2 w-100"
                value={newEmpEmail}
                onChange={(e) => setNewEmpEmail(e.target.value)}
              />
            </Col>
            <Col xl="6" md="12" lg="6" sm="12" xs="12">
              <TextField
                label="Mobile Number"
                variant="outlined"
                type="Number"
                className="mt-2 w-100"
                value={newEmpNumber}
                onChange={(e) => setNewEmpNumber(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col xl="6" lg="6" md="12" sm="12" xs="12">
              <TextField
                label="Password"
                variant="outlined"
                className="mt-2 w-100"
                value={newEmpPass}
                onChange={(e) => setNewEmpPass(e.target.value)}
                error={newEmpPassErr}
                helperText={
                  newEmpPassErr
                    ? "Password must contain atleast 8 charecters"
                    : ""
                }
              />
            </Col>
            <Col xl="6" md="12" lg="6" sm="12" xs="12">
              <TextField
                label="Confirm passsword"
                variant="outlined"
                className="mt-2 w-100"
                value={newEmpCPass}
                onChange={(e) => setNewEmpCPass(e.target.value)}
                error={newEmpCPassErr}
                helperText={newEmpCPassErr ? "Password didn't match" : ""}
              />
            </Col>
          </Row>
          <FormControl fullWidth className="mt-2">
            <InputLabel id="demo-simple-select-label">Department</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={newEmpDept}
              label="Department"
              onChange={(e) => setNewEmpDept(e.target.value)}
            >
              {DepartmentData?.map((data) => (
                <MenuItem value={data.id}>{data.department_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Row>
            <Col xl="6" lg="6" md="12" sm="12" xs="12">
              <FormControl fullWidth className="mt-2">
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  value={newEmpGender}
                  label="Gender"
                  onChange={(e) => setNewEmpGender(e.target.value)}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col xl="6" md="12" lg="6" sm="12" xs="12">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Date of Birth"
                    className="w-100"
                    value={newEmpDOB}
                    disableFuture
                    onChange={(newValue) => setNewEmpDOB(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Col>
          </Row>
          <TextField
            label="Address"
            variant="outlined"
            className="mt-2 w-100"
            value={newEmpAddress}
            onChange={(e) => setNewEmpAddress(e.target.value)}
          />
          <Row>
            <Col xl="6" lg="6" md="12" sm="12" xs="12">
              <TextField
                label="City/Town"
                variant="outlined"
                className="mt-2 w-100"
                value={newEmpCity}
                onChange={(e) => setNewEmpCity(e.target.value)}
              />
            </Col>
            <Col xl="6" md="12" lg="6" sm="12" xs="12">
              <TextField
                label="Country"
                variant="outlined"
                className="mt-2 w-100"
                value={newEmpCountry}
                onChange={(e) => setNewEmpCountry(e.target.value)}
              />
            </Col>
          </Row>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={createNewEmployee}
            variant="contained"
            disabled={
              !newEmpCode ||
              !newEmpFName ||
              !newEmpLName ||
              !newEmpEmail ||
              !newEmpNumber ||
              !newEmpPass ||
              !newEmpCPass ||
              !newEmpDept ||
              !newEmpGender ||
              !newEmpDOB ||
              !newEmpCountry ||
              !newEmpAddress ||
              !newEmpCity
            }
          >
            Create
          </Button>
          <Button onClick={handleNewEmployeeClose}>cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Employees;
