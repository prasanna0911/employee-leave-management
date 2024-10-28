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
  Tooltip,
  Typography,
} from "@mui/material";
import { ApiServices } from "../Api/ApiServices";
import { Col, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

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

const LeaveManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [allLeaves, setAllLeaves] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [leaveActionOpen, setLeaveActionOpen] = useState(false);
  const [leaveStatus, setLeaveStatus] = useState("");
  const [adminRemark, setAdminRemark] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("filter") || "All";
  const [filter, setFillter] = useState(initialTab);

  useEffect(() => {
    queryParams.set("filter", filter);
    navigate({ search: queryParams.toString() }, { replace: true });
    getLeaves();
  }, [filter]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allLeaves.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getLeaves = () => {
    ApiServices.GetAllLeaves().then((res) => {
      console.log("res", res);
      if (res.response_code === 200) {
        if (filter === "All" || filter === "") {
          setAllLeaves(res.leaveData);
        } else {
          const leaves =
            res.leaveData?.filter((data) => data.leave_status === filter) || [];
          setAllLeaves(leaves);
        }
      }
    });
  };

  // useEffect(() => {
  //   getLeaves();
  // }, [filter]);

  const handleLeaveStatusChange = () => {
    var json = {
      Id: selectedData.leave_id,
      Leave_status: leaveStatus,
      Admin_Remark: adminRemark,
    };
    ApiServices.ChangeLeaveStatus(json).then((res) => {
      if (res.response_code === 200) {
        setLeaveActionOpen(false);
        setLeaveStatus("");
        setAdminRemark("");
        getLeaves();
      }
    });
  };
  return (
    <>
      <div className="d-flex justify-content-between  mb-4">
        <h5>Leave management</h5>
        <FormControl
          minWidth="60px"
          className="my-2"
          placeholder="select a filter"
        >
          <InputLabel id="demo-simple-select-label">Fillter By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            placeholder="select a filter"
            value={filter}
            label="Fillter By"
            onChange={(e) => setFillter(e.target.value)}
          >
            <MenuItem value="All">All Leaves</MenuItem>
            <MenuItem value="Approved">Approved Leaves</MenuItem>
            <MenuItem value="Not Approved">Not Approved Leaves</MenuItem>
            <MenuItem value="Pending">Pending Leaves</MenuItem>
          </Select>
        </FormControl>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl No</TableCell>
              <TableCell>Emp Name</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Posting Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Action</TableCell>
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
                key={data.leave_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {allLeaves.findIndex(
                    (emp) => emp.leave_id === data.leave_id
                  ) + 1}
                </TableCell>
                <TableCell>
                  {`${data.first_name}  ${data.last_name} (${data.emp_code})`}
                </TableCell>
                <TableCell>{data.leave_type}</TableCell>
                <TableCell>{data.posting__date}</TableCell>
                <TableCell>
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
                <TableCell>
                  {" "}
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      setSelectedData(data);
                      setLeaveOpen(true);
                    }}
                  >
                    View Details
                  </Button>
                </TableCell>
                <TableCell>
                  {data.leave_status === "Pending" ? (
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        setSelectedData(data);
                        setLeaveActionOpen(true);
                      }}
                    >
                      Take Action
                    </Button>
                  ) : (
                    <Tooltip title={`Status: ${data.leave_status}`}>
                      <span className="text-muted">No Action</span>
                    </Tooltip>
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
        onClose={() => setLeaveOpen(false)}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>
          <Typography variant="h5">Leave detail</Typography>
        </DialogTitle>
        <DialogContent>
          <Row>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="fw-bold mb-2">
              Employee Name :
            </Col>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="mb-2">
              {selectedData.first_name} {selectedData.last_name}
            </Col>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="fw-bold mb-2">
              Employee Id :
            </Col>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="mb-2">
              {selectedData.emp_code}
            </Col>
          </Row>
          <Row>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="fw-bold mb-2">
              Employee Email Id :
            </Col>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="mb-2">
              {selectedData.email}
            </Col>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="fw-bold mb-2">
              Employee Contact No :
            </Col>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="mb-2">
              {selectedData.mobile_number}
            </Col>
          </Row>
          <Row>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="fw-bold mb-2">
              Gender :
            </Col>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="mb-2">
              {selectedData.gender}
            </Col>
          </Row>
          <Row>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="fw-bold mb-2">
              Leave type :
            </Col>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="mb-2">
              {selectedData.leave_type}
            </Col>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="fw-bold mb-2">
              Leave date :
            </Col>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="mb-2">
              from {selectedData.from__date} to {selectedData.to__date}
            </Col>
          </Row>
          <Row>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="fw-bold mb-2">
              Posting date :
            </Col>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="mb-2">
              {selectedData.posting__date}
            </Col>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="fw-bold mb-2">
              Employee Leave Description :
            </Col>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="mb-2">
              {selectedData.employee_leave_description}
            </Col>
          </Row>
          <Row>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="fw-bold mb-2">
              Leave Status :
            </Col>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="mb-2">
              {selectedData.leave_status === "Approved" ? (
                <Chip
                  variant="outlined"
                  size="small"
                  color="success"
                  label="Approved"
                />
              ) : selectedData.leave_status === "Not Approved" ? (
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
            </Col>
          </Row>
          <Row>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="fw-bold mb-2">
              Admin remark :
            </Col>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="mb-2">
              {selectedData.admin_remark ? selectedData.admin_remark : "NA"}
            </Col>
          </Row>
          <Row>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="fw-bold mb-2">
              Admin Action Taken date :
            </Col>
            <Col xl="3" lg="3" sm="6" md="6" xs="12" className="mb-2">
              {selectedData.admin_action_time
                ? selectedData.admin_action_time
                : "NA"}
            </Col>
          </Row>
        </DialogContent>
      </Dialog>
      <Dialog
        open={leaveActionOpen}
        onClose={() => setLeaveActionOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Typography variant="h5">Leave Take Action</Typography>
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth className="my-2">
            <InputLabel id="demo-simple-select-label">leave status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={leaveStatus}
              label="leave status"
              onChange={(e) => setLeaveStatus(e.target.value)}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Not Approved">Not Approved</MenuItem>
            </Select>
          </FormControl>
          <TextField
            value={adminRemark}
            onChange={(e) => setAdminRemark(e.target.value)}
            label="Admin Remark"
            className="w-100"
            multiline
            minRows="4"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleLeaveStatusChange}>
            submit
          </Button>
          <Button>camcel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LeaveManagement;
