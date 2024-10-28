const LeaveTypeModel = require("../model/LeaveTypeModel");

const LeaveTypeController = {
  GetallLeaveTypes: (req, res) => {
    LeaveTypeModel.GetAllLeaveTypes((err, leavetypes) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Internal server error", error: err.message });
      } else {
        res
          .status(200)
          .json({ response_code: 200, leavetypes: leavetypes.reverse() });
      }
    });
  },
  GetLeaveTypeById: (req, res) => {
    const id = req.params.id;
    LeaveTypeModel.getLeaveTypeById(id, (err, leavetype) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Internal server error", error: err.message });
      } else if (!leavetype) {
        res
          .status(404)
          .json({ response_code: 404, message: "leavetype not found" });
      } else {
        res.status(200).json({ response_code: 200, leavetype });
      }
    });
  },
  CreateLeaveType: (req, res) => {
    const newLeaveType = req.body;
    LeaveTypeModel.createLeaveType(newLeaveType, (err, leavetype) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Internal server error", error: err.message });
      } else {
        res.status(200).json({
          response_code: 200,
          message: "leave type created successfully",
          leavetype,
        });
      }
    });
  },

  UpdateLeaveType: (req, res) => {
    const id = req.params.id;
    const leaveTypeData = req.body;
    LeaveTypeModel.updateLeaveType(id, leaveTypeData, (err, leavetype) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Internal server error", error: err.message });
      } else {
        res.status(200).json({
          response_code: 200,
          message: "leave type updated successfully",
        });
      }
    });
  },
  DeleteLeaveType: (req, res) => {
    const id = req.params.id;
    LeaveTypeModel.deleteLeaveType(id, (err, leavetype) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Internal server error", error: err.message });
      } else {
        res.status(200).json({
          response_code: 200,
          message: "leave type deleted successfully",
          leavetype,
        });
      }
    });
  },
};

module.exports = LeaveTypeController;
