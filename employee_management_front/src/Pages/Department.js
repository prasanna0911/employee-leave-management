import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { DepartmentData } from "../Datas/SampleDatas";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { ApiServices } from "../Api/ApiServices";

export default function Department() {
  //new department
  const [newDeptOpen, setNewDeptOpen] = useState(false);
  const [newDeptCode, setNewDeptCode] = useState("");
  const [newDeptCodeErr, setNewDeptCodeErr] = useState(false);
  const [newDeptCodeMsg, setNewDeptCodeMsg] = useState("");
  const [newDeptName, setNewDeptName] = useState("");
  const [newDeptNameErr, setNewDeptNameErr] = useState(false);
  const [newDeptSName, setNewDeptSName] = useState("");
  const [newDeptSNameErr, setNewDeptSNameErr] = useState(false);
  const [DepartmentData, setDepartmentData] = useState([]);

  //edit department
  const [selDeptOpen, setSelDeptOpen] = useState(false);
  const [selData, setSelData] = useState({});
  const [selDeptCode, setSelDeptCode] = useState("");
  const [selDeptCodeErr, setSelDeptCodeErr] = useState(false);
  const [selDeptCodeMsg, setSelDeptCodeMsg] = useState("");
  const [selDeptName, setSelDeptName] = useState("");
  const [selDeptNameErr, setSelDeptNameErr] = useState(false);
  const [selDeptSName, setSelDeptSName] = useState("");
  const [selDeptSNameErr, setSelDeptSNameErr] = useState(false);

  //delete department
  const [delOpen, setDelOpen] = useState(false);

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

  const handleNewDeptClose = () => {
    setNewDeptCode("");
    setNewDeptName("");
    setNewDeptSName("");
    setNewDeptOpen(false);
  };

  const handleCreateDept = () => {
    setNewDeptCodeErr(false);
    setNewDeptCodeMsg("");
    setNewDeptNameErr(false);
    setNewDeptSNameErr(false);

    if (!newDeptCode) {
      setNewDeptCodeErr(true);
      setNewDeptCodeMsg("Department code cannot be empty");
      return;
    }
    if (!newDeptName) {
      setNewDeptNameErr(true);
      return;
    }
    if (!newDeptSName) {
      setNewDeptSNameErr(true);
      return;
    }

    if (
      DepartmentData.find(
        (data) =>
          data.department_code.toLowerCase() === newDeptCode.toLowerCase()
      )
    ) {
      setNewDeptCodeErr(true);
      setNewDeptCodeMsg("Department code already exists");
      return;
    }
    var json = {
      department_code: newDeptCode,
      department_name: newDeptName,
      department_short_name: newDeptSName,
    };
    ApiServices.CreateDepartment(json)
      .then((res) => {
        console.log("res", res);
        if (res.response_code === 200) {
          GetAllDepartments();
        }
      })
      .finally(() => {
        handleNewDeptClose();
      });
  };

  const handleEditOpen = (data) => {
    setSelData(data);
    setSelDeptCode(data.department_code);
    setSelDeptName(data.department_name);
    setSelDeptSName(data.department_short_name);
    setSelDeptOpen(true);
  };

  const handleUpdateDept = () => {
    setSelDeptCodeErr(false);
    setSelDeptCodeMsg("");
    setSelDeptNameErr(false);
    setSelDeptSNameErr(false);

    if (!selDeptCode) {
      setSelDeptCodeErr(true);
      setSelDeptCodeMsg("Department code cannot be empty");
      return;
    }
    if (!selDeptName) {
      setSelDeptNameErr(true);
      return;
    }
    if (!selDeptSName) {
      setSelDeptSNameErr(true);
      return;
    }

    if (
      DepartmentData.find(
        (data) =>
          data.department_code.toLowerCase() === selDeptCode.toLowerCase() &&
          data.department_code.toLowerCase() !==
            selData.department_code.toLowerCase()
      )
    ) {
      setSelDeptCodeErr(true);
      setSelDeptCodeMsg("Department code already exists");
      return;
    }
    var json = {
      department_code: selDeptCode,
      department_name: selDeptName,
      department_short_name: selDeptSName,
    };
    ApiServices.UpdateDepartment(selData.id, json)
      .then((res) => {
        console.log("res", res);
        if (res.response_code === 200) {
          GetAllDepartments();
        }
      })
      .finally(() => {
        setSelDeptOpen(false);
      });
  };

  const handleDeleteOpen = (data) => {
    setSelData(data);
    setDelOpen(true);
  };
  const handleDeleteClose = (data) => {
    setSelData({});
    setDelOpen(false);
  };

  const handleDeptDelete = () => {
    ApiServices.DeleteDepartment(selData.id)
      .then((res) => {
        console.log("res", res);
        if (res.response_code === 200) {
          GetAllDepartments();
        }
      })
      .finally(() => {
        handleDeleteClose();
      });
  };
  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <h5 className=" mb-0">Manage Department</h5>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => setNewDeptOpen(true)}
        >
          Add department
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell>Dept Code</TableCell>
              <TableCell>Dept Name</TableCell>
              <TableCell>Dept Short Name</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DepartmentData.map((data, index) => (
              <TableRow
                key={data.department_code}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{data.department_code}</TableCell>
                <TableCell>{data.department_name}</TableCell>
                <TableCell>{data.department_short_name}</TableCell>
                <TableCell>{data.created_date}</TableCell>
                <TableCell>
                  <IconButton size="small" onClick={() => handleEditOpen(data)}>
                    <BorderColorIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDeleteOpen(data)}
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={newDeptOpen}
        onClose={() => handleNewDeptClose()}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Typography variant="h6">Add New Department</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Department Code"
            variant="outlined"
            className="mt-2 w-100"
            value={newDeptCode}
            onChange={(e) => setNewDeptCode(e.target.value)}
            error={newDeptCodeErr}
            helperText={newDeptCodeErr ? newDeptCodeMsg : ""}
          />
          <TextField
            id="outlined-basic"
            label="Department Name"
            variant="outlined"
            className="mt-2 w-100"
            value={newDeptName}
            onChange={(e) => setNewDeptName(e.target.value)}
            error={newDeptNameErr}
            helperText={newDeptNameErr ? "Department name cannot be empty" : ""}
          />
          <TextField
            id="outlined-basic"
            label="Department Short Name"
            variant="outlined"
            className="mt-2 w-100"
            value={newDeptSName}
            onChange={(e) => setNewDeptSName(e.target.value)}
            error={newDeptSNameErr}
            helperText={
              newDeptSNameErr ? "Department short name cannot be empty" : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateDept} variant="contained">
            Add
          </Button>
          <Button onClick={() => handleNewDeptClose()}>cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={selDeptOpen}
        onClose={() => setSelDeptOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Typography variant="h6">Edit Department</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Department Code"
            variant="outlined"
            className="mt-2 w-100"
            value={selDeptCode}
            onChange={(e) => setSelDeptCode(e.target.value)}
            error={selDeptCodeErr}
            helperText={selDeptCodeErr ? selDeptCodeMsg : ""}
          />
          <TextField
            id="outlined-basic"
            label="Department Name"
            variant="outlined"
            className="mt-2 w-100"
            value={selDeptName}
            onChange={(e) => setSelDeptName(e.target.value)}
            error={selDeptNameErr}
            helperText={selDeptNameErr ? "Department name cannot be empty" : ""}
          />
          <TextField
            id="outlined-basic"
            label="Department Short Name"
            variant="outlined"
            className="mt-2 w-100"
            value={selDeptSName}
            onChange={(e) => setSelDeptSName(e.target.value)}
            error={selDeptSNameErr}
            helperText={
              selDeptSNameErr ? "Department short name cannot be empty" : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateDept} variant="contained">
            Update
          </Button>
          <Button onClick={() => setSelDeptOpen(false)}>cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={delOpen}
        onClose={handleDeleteClose}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>
          <Typography variant="h6">Delete Confirmation ?</Typography>
        </DialogTitle>
        <DialogContent>
          Are you sure you want to delete this department{" "}
          <span className="fw-bold">"{selData.department_name}"</span> ...?
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleDeptDelete}>
            Delete
          </Button>
          <Button onClick={handleDeleteClose}>cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
