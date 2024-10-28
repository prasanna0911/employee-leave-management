const EmployeeModel = require("../model/EmployeeModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const EmployeeController = {
  CreateEmployee: async (req, res) => {
    const employeeData = req.body;
    const hashedPassword = await bcrypt.hash(employeeData.emp_password, 10);
    employeeData.emp_password = hashedPassword;
    employeeData.emp_status = "active";
    console.log("employeeData", employeeData);

    EmployeeModel.createEmployee(employeeData, (err, employee) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({
          response_code: 200,
          message: "employee created successfully",
          employee,
        });
      }
    });
  },
  GetAllEmployees: async (req, res) => {
    EmployeeModel.getAllEmployees((err, employees) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({
          response_code: 200,
          message: "employees retrived successfully",
          employees: employees.reverse(),
        });
      }
    });
  },
  GetEmployee: async (req, res) => {
    const id = req.params.id;
    EmployeeModel.getEmployee(id, (err, employee) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!employee) {
        res
          .status(404)
          .json({ response_code: 404, message: "Employee does not exists" });
      } else {
        res.status(200).json({
          response_code: 200,
          message: "Employee retrived successfully",
          employee,
        });
      }
    });
  },
  MakeEmployeeActive: async (req, res) => {
    const id = req.params.id;
    EmployeeModel.makeEmployeeActive(id, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({
          response_code: 200,
          message: "employee active successfully",
          result,
        });
      }
    });
  },
  MakeEmployeeInctive: async (req, res) => {
    const id = req.params.id;
    EmployeeModel.makeEmployeeInactive(id, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({
          response_code: 200,
          message: "employee inactive successfully",
        });
      }
    });
  },
  EmployeeLogin: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ response_code: 400, message: "All fields are required" });
    }
    EmployeeModel.loginEmployee(email, async (err, employee) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!employee) {
        res
          .status(404)
          .json({ response_code: 404, message: "employee not found" });
      } else {
        const isPasswordMatch = await bcrypt.compare(
          password,
          employee.emp_password
        );
        if (isPasswordMatch) {
          const payload = {
            email: email,
            emp_id: employee.emp_code,
          };
          const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
          res
            .status(200)
            .json({ response_code: 200, message: "Login Successfully", token });
        } else {
          res
            .status(401)
            .json({ response_code: 401, message: "Password didn't match" });
        }
      }
    });
  },
  EmployeePasswordChange: async (req, res) => {
    const { password, newPassword } = req.body;
    if (!password || !newPassword) {
      return res
        .status(400)
        .json({ response_code: 400, message: "All fields are required" });
    }
    EmployeeModel.getEmployee(req.emp_id, async (err, employee) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        const isPasswordMatch = await bcrypt.compare(
          password,
          employee.emp_password
        );
        if (isPasswordMatch) {
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          EmployeeModel.employeePasswordChange(
            employee.id,
            hashedPassword,
            (error, result) => {
              if (error) {
                res.status(500).json({ error: err.message });
              } else {
                res.status(200).json({
                  response_code: 200,
                  message: "Password Changes Successfully",
                });
              }
            }
          );
        } else {
          res
            .status(401)
            .json({ response_code: 401, message: "Password didn't match" });
        }
      }
    });
  },
};

module.exports = EmployeeController;
