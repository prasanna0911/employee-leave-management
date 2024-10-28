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
// import { allLeaves } from "../Datas/SampleDatas";
import {
  Button,
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
import { ApiServices } from "../Api/ApiServices";
import { Col, Row } from "react-bootstrap";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";

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

const MyLeaves = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [allLeaves, setAllLeaves] = useState([]);
  const [allLeaveTypes, setAllLeaveTypes] = useState([]);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [toDateErr, setToDateErr] = useState(false);
  const [leaveType, setLeaveType] = useState("");
  const [description, setDescription] = useState("");
  const [leaveOpen, setLeaveOpen] = useState(false);

  const handleLeaveClose = () => {
    setLeaveOpen(false);
    setFromDate(null);
    setToDate(null);
    setLeaveType("");
    setDescription("");
    setToDateErr(false);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allLeaves.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getMyLeaves = () => {
    ApiServices.GetEmployeeLeaves().then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        setAllLeaves(res.leaveData);
      }
    });
  };

  const getAllLeaveTypes = () => {
    ApiServices.GetAllLeaveTypes().then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        setAllLeaveTypes(res.leavetypes);
      }
    });
  };

  useEffect(() => {
    getMyLeaves();
    getAllLeaveTypes();
  }, []);

  const handleLeaveApply = () => {
    setToDateErr(false);
    if (fromDate.$d > toDate.$d) {
      setToDateErr(true);
      return;
    }
    var json = {
      leave_type: leaveType,
      from_date: format(fromDate.$d, "yyyy-MM-dd"),
      to_date: format(toDate.$d, "yyyy-MM-dd"),
      employee_leave_description: description,
    };

    ApiServices.ApplyLeave(json)
      .then((res) => {
        console.log("res", res);
        if (res.response_code === 200) {
          getMyLeaves();
        }
      })
      .finally(handleLeaveClose);
  };
  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <h5>Leave History</h5>
        <Button
          variant="contained"
          size="small"
          onClick={() => setLeaveOpen(true)}
        >
          Apply Leave
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell>Type of Leave</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Posting Date</TableCell>
              <TableCell>Admin Remark</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? allLeaves.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : allLeaves
            ).map((data, index) => (
              <TableRow
                key={data.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {allLeaves.findIndex(
                    (emp) => emp.leave_id === data.leave_id
                  ) + 1}
                </TableCell>
                <TableCell>{data.leave_type}</TableCell>
                <TableCell>{data.from_date}</TableCell>
                <TableCell>{data.to_date}</TableCell>
                <TableCell>{data.employee_leave_description}</TableCell>
                <TableCell>{data.posting_date}</TableCell>
                <TableCell>{data.admin_remark}</TableCell>
                <TableCell>
                  {" "}
                  {data.leave_status === "Approved" ? (
                    <Chip
                      variant="outlined"
                      size="small"
                      color="success"
                      label="Approved"
                    />
                  ) : data.leave_status === "Not Approved" ? (
                    <Chip
                      variant="outlined"
                      size="small"
                      color="error"
                      label="Not Approved"
                    />
                  ) : (
                    <Chip
                      variant="outlined"
                      size="small"
                      color="warning"
                      label="Pending"
                    />
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
                count={allLeaves.length}
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
        open={leaveOpen}
        onClose={handleLeaveClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Typography variant="h6">Apply Leave</Typography>
        </DialogTitle>
        <DialogContent>
          <Row>
            <Col xl="6" lg="6" md="12" sm="12" xs="12">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="From Date"
                    className="w-100"
                    value={fromDate}
                    // disableFuture
                    onChange={(newValue) => setFromDate(newValue)}
                    slotProps={{
                      textField: {
                        error: toDateErr,
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Col>
            <Col xl="6" md="12" lg="6" sm="12" xs="12">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="To Date"
                    className="w-100"
                    value={toDate}
                    // disableFuture
                    onChange={(newValue) => setToDate(newValue)}
                    slotProps={{
                      textField: {
                        error: toDateErr,
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Col>
            <Typography
              variant="body2"
              color="error"
              className="text-center my-1"
            >
              {toDateErr &&
                "The 'From' date should be earlier than the 'To' date."}
            </Typography>
          </Row>
          <FormControl fullWidth className="mt-2">
            <InputLabel id="demo-simple-select-label">Leave type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={leaveType}
              label="Leave type"
              onChange={(e) => setLeaveType(e.target.value)}
            >
              {allLeaveTypes?.map((data) => (
                <MenuItem value={data.leave_type}>{data.leave_type}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-100 mt-2"
            label="Description"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            disabled={!fromDate || !toDate || !leaveType || !description}
            onClick={handleLeaveApply}
          >
            apply
          </Button>
          <Button onClick={handleLeaveClose}>cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MyLeaves;
