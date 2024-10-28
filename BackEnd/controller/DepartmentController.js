const Department = require("../model/DepartmentModel");

// Controller for handling employee data
const DepartmentController = {
  getAllDepartments: (req, res) => {
    Department.getAllDepartments((err, department) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res
          .status(200)
          .json({ response_code: 200, department: department.reverse() });
      }
    });
  },

  getDepartmentById: (req, res) => {
    const id = req.params.id;
    Department.getDepartmentById(id, (err, department) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!department) {
        res
          .status(404)
          .json({ response_code: 404, message: "department not found" });
      } else {
        res.status(200).json({ response_code: 200, department });
      }
    });
  },

  createDepartment: (req, res) => {
    const newDepartment = req.body;
    Department.createDepartment(newDepartment, (err, department) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({
          response_code: 200,
          message: "department created successfully",
          department,
        });
      }
    });
  },

  updateDepartment: (req, res) => {
    const id = req.params.id;
    const updatedDepartment = req.body;
    Department.updateDepartment(id, updatedDepartment, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({
          response_code: 200,
          message: "Department updated successfully",
        });
      }
    });
  },

  deleteDepartment: (req, res) => {
    const id = req.params.id;
    Department.deleteDepartment(id, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(200).json({
          response_code: 200,
          message: "Department deleted successfully",
        });
      }
    });
  },
};

module.exports = DepartmentController;
