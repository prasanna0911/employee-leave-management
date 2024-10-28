const express = require("express");
const router = express.Router();
const DepartmentController = require("../controller/DepartmentController");
const LeaveTypeController = require("../controller/LeaveTypeController");
const EmployeeController = require("../controller/EmployeeController");
const AdminController = require("../controller/AdminController");
const AdminAuthentication = require("../middlewares/AdminAuthentication");
const EmployeeAuthentication = require("../middlewares/EmployeeAuthentication");
const LeaveController = require("../controller/LeaveController");

// Define routes
router.get("/department", DepartmentController.getAllDepartments);
router.get("/department/:id", DepartmentController.getDepartmentById);
router.post(
  "/department",
  AdminAuthentication,
  DepartmentController.createDepartment
);
router.put(
  "/department/:id",
  AdminAuthentication,
  DepartmentController.updateDepartment
);
router.delete(
  "/department/:id",
  AdminAuthentication,
  DepartmentController.deleteDepartment
);

//leave types
router.get("/leavetype", LeaveTypeController.GetallLeaveTypes);
router.post("/leavetype", LeaveTypeController.CreateLeaveType);
router.get(
  "/leavetype/:id",
  AdminAuthentication,
  LeaveTypeController.GetLeaveTypeById
);
router.put(
  "/leavetype/:id",
  AdminAuthentication,
  LeaveTypeController.UpdateLeaveType
);
router.delete(
  "/leavetype/:id",
  AdminAuthentication,
  LeaveTypeController.DeleteLeaveType
);

//employee
router.post("/employee-login", EmployeeController.EmployeeLogin);
router.get("/employee", EmployeeController.GetAllEmployees);
router.get("/employee/:id", EmployeeController.GetEmployee);
router.post(
  "/employee",
  AdminAuthentication,
  EmployeeController.CreateEmployee
);
router.put(
  "/employee-active/:id",
  AdminAuthentication,
  EmployeeController.MakeEmployeeActive
);
router.put(
  "/employee-inactive/:id",
  AdminAuthentication,
  EmployeeController.MakeEmployeeInctive
);
router.put(
  "/employee-change-password",
  EmployeeAuthentication,
  EmployeeController.EmployeePasswordChange
);

//admin
router.post("/admin", AdminController.CreateAdmin);
router.post("/admin-login", AdminController.AdminLogin);
router.put(
  "/admin-change-password",
  AdminAuthentication,
  AdminController.AdminPasswordChange
);

module.exports = router;

//leave apis
router.post("/apply-leave", EmployeeAuthentication, LeaveController.PostLeave);
router.get(
  "/employee-leaves",
  EmployeeAuthentication,
  LeaveController.GetEmployeeLeaves
);
router.get("/all-leaves", AdminAuthentication, LeaveController.GetAlleaves);
router.put(
  "/change-leave-status",
  AdminAuthentication,
  LeaveController.ChangeLeaveStatus
);
