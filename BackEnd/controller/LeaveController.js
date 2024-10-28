const LeaveModel = require("../model/LeaveModel");

const LeaveController = {
  PostLeave: async (req, res) => {
    const leaveData = req.body;
    leaveData.leave_status = "Pending";
    leaveData.employee_id = req.emp_id;
    LeaveModel.postLeave(leaveData, (err, leave) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res
          .status(200)
          .json({ response_code: 200, message: "Leave posted successfully" });
      }
    });
  },
  GetEmployeeLeaves: (req, res) => {
    LeaveModel.getEmployeeLeaves(req.emp_id, (err, leaveData) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({
          response_code: 200,
          message: "Leave data retrived successfully",
          leaveData: leaveData.reverse(),
        });
      }
    });
  },
  GetAlleaves: (req, res) => {
    LeaveModel.getAllLeaves((err, leaveData) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({
          response_code: 200,
          message: "Leave data retrived successfully",
          leaveData: leaveData.reverse(),
        });
      }
    });
  },
  ChangeLeaveStatus: (req, res) => {
    const { Id, Leave_status, Admin_Remark } = req.body;
    if (!Id || !Leave_status) {
      return res
        .status(400)
        .json({ response_code: 400, message: "All fields sre required" });
    }
    const leaveData = {
      leave_status: Leave_status,
      admin_remark: Admin_Remark,
    };
    LeaveModel.changeLeaveStatus(Id, leaveData, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({
          response_code: 200,
          message: "Leave status changed successfully",
        });
      }
    });
  },
};

module.exports = LeaveController;
