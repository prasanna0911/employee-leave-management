import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { DepartmentData, LeaveTypeData } from "../Datas/SampleDatas";
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

const LeaveType = () => {
  const [LeaveTypeData, setLeaveTypeData] = useState([]);
  //new leave type
  const [newLeaveTypeOpen, setNewLeaveTypeOpen] = useState(false);
  const [newLeaveType, setNewLeaveType] = useState("");
  const [newLeaveTypeErr, setNewLeaveTypeErr] = useState(false);
  const [newLeaveTypeMsg, setNewLeaveTypeMsg] = useState("");
  const [newLeaveDesc, setNewLeaveDesc] = useState("");
  const [newLeaveDescErr, setNewLeaveDescErr] = useState(false);

  //edit leave type
  const [selLeaveTypeOpen, setSelLeaveTypeOpen] = useState(false);
  const [selData, setSelData] = useState({});
  const [selLeaveType, setSelLeaveType] = useState("");
  const [selLeaveTypeErr, setSelLeaveTypeErr] = useState(false);
  const [selLeaveTypeMsg, setSelLeaveTypeMsg] = useState("");
  const [selLeaveDesc, setSelLeaveDesc] = useState("");
  const [selLeaveDescErr, setSelLeaveDescErr] = useState(false);

  //delete department
  const [delOpen, setDelOpen] = useState(false);

  const getLeaveTypesData = () => {
    ApiServices.GetAllLeaveTypes().then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        setLeaveTypeData(res.leavetypes);
      }
    });
  };

  useEffect(() => {
    getLeaveTypesData();
  }, []);

  const handleNewLeaveTypeClose = () => {
    setNewLeaveType("");
    setNewLeaveDesc("");
    setNewLeaveTypeOpen(false);
  };

  const handleCreateLeaveType = () => {
    setNewLeaveTypeErr(false);
    setNewLeaveTypeMsg("");
    setNewLeaveDescErr(false);

    if (!newLeaveType) {
      setNewLeaveTypeErr(true);
      setNewLeaveTypeMsg("Leave Type cannot be empty");
      return;
    }
    if (!newLeaveDesc) {
      setNewLeaveDescErr(true);
      return;
    }
    if (
      LeaveTypeData.find(
        (data) => data.leave_type.toLowerCase() === newLeaveType.toLowerCase()
      )
    ) {
      setNewLeaveTypeErr(true);
      setNewLeaveTypeMsg("Leave Type already exists");
      return;
    }
    var json = {
      leave_type: newLeaveType,
      description: newLeaveDesc,
    };
    ApiServices.CreateLeaveType(json)
      .then((res) => {
        console.log("res", res);
        if (res.response_code === 200) {
          getLeaveTypesData();
        }
      })
      .finally(handleNewLeaveTypeClose);
  };

  const handleEditOpen = (data) => {
    setSelData(data);
    setSelLeaveType(data.leave_type);
    setSelLeaveDesc(data.description);
    setSelLeaveTypeOpen(true);
  };

  const handleUpdateLeaveType = () => {
    setSelLeaveTypeErr(false);
    setSelLeaveTypeMsg("");
    setSelLeaveDescErr(false);

    if (!selLeaveType) {
      setSelLeaveTypeErr(true);
      setSelLeaveTypeMsg("Leave Type cannot be empty");
      return;
    }
    if (!selLeaveDesc) {
      setSelLeaveDescErr(true);
      return;
    }

    if (
      LeaveTypeData.find(
        (data) =>
          data.leave_type.toLowerCase() === selLeaveType.toLowerCase() &&
          data.leave_type.toLowerCase() !== selData.leave_type.toLowerCase()
      )
    ) {
      setSelLeaveTypeErr(true);
      setSelLeaveTypeMsg("Department code already exists");
      return;
    }
    var json = {
      leave_type: selLeaveType,
      description: selLeaveDesc,
    };
    ApiServices.UpdateLeaveType(selData.id, json)
      .then((res) => {
        console.log("res", res);
        if (res.response_code === 200) {
          getLeaveTypesData();
        }
      })
      .finally(() => {
        setSelData({});
        setSelLeaveTypeOpen(false);
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
    ApiServices.DeleteLeaveType(selData.id)
      .then((res) => {
        console.log("res", res);
        if (res.response_code === 200) {
          getLeaveTypesData();
        }
      })
      .finally(handleDeleteClose);
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0">Leave Type</h5>
        <Button
          variant="contained"
          size="small"
          onClick={() => setNewLeaveTypeOpen(true)}
          startIcon={<AddIcon />}
        >
          Add leave type
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Created Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {LeaveTypeData.map((data, index) => (
              <TableRow
                key={data.leave_type}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{data.leave_type}</TableCell>
                <TableCell>{data.description}</TableCell>
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
        open={newLeaveTypeOpen}
        onClose={() => handleNewLeaveTypeClose()}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Typography variant="h6">Add New Leave Type</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Leave Type"
            variant="outlined"
            className="mt-2 w-100"
            value={newLeaveType}
            onChange={(e) => setNewLeaveType(e.target.value)}
            error={newLeaveTypeErr}
            helperText={newLeaveTypeErr ? newLeaveTypeMsg : ""}
          />
          <TextField
            id="outlined-basic"
            label="Leave Type Descrription"
            variant="outlined"
            className="mt-2 w-100"
            value={newLeaveDesc}
            onChange={(e) => setNewLeaveDesc(e.target.value)}
            error={newLeaveDescErr}
            helperText={
              newLeaveDescErr ? "Leave Type Descrription cannot be empty" : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateLeaveType} variant="contained">
            Add
          </Button>
          <Button onClick={() => handleNewLeaveTypeClose()}>cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={selLeaveTypeOpen}
        onClose={() => setSelLeaveTypeOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Typography variant="h6">Edit Leave Type</Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Leave Type"
            variant="outlined"
            className="mt-2 w-100"
            value={selLeaveType}
            onChange={(e) => setSelLeaveType(e.target.value)}
            error={selLeaveTypeErr}
            helperText={selLeaveTypeErr ? selLeaveTypeMsg : ""}
          />
          <TextField
            id="outlined-basic"
            label="Leave Type Descrription"
            variant="outlined"
            className="mt-2 w-100"
            value={selLeaveDesc}
            onChange={(e) => setSelLeaveDesc(e.target.value)}
            error={selLeaveDescErr}
            helperText={
              selLeaveDescErr ? "Leave Type Descrription cannot be empty" : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateLeaveType} variant="contained">
            Update
          </Button>
          <Button onClick={() => setSelLeaveTypeOpen(false)}>cancel</Button>
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
          Are you sure you want to delete this leave type{" "}
          <span className="fw-bold">"{selData.leave_type}"</span> ...?
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
};

export default LeaveType;
