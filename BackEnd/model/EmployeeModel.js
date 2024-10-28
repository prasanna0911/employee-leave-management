const mysql = require("mysql");
const config = require("../config/config");

const db = mysql.createPool(config);

const EmployeeModel = {
  createEmployee: (employeeData, callback) => {
    db.query(
      "INSERT INTO employees set ?, created_date = NOW()",
      employeeData,
      (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      }
    );
  },
  getAllEmployees: (callback) => {
    db.query(
      "SELECT Employees.id as emp_id,Employees.*, Departments.* FROM Employees JOIN Departments ON Employees.department_id = Departments.id",
      (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      }
    );
  },
  getEmployee: (id, callback) => {
    db.query(
      "SELECT Departments.*, Employees.* FROM Employees JOIN Departments ON Employees.department_id = Departments.id WHERE Employees.id = ?; ",
      id,
      (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result[0]);
        }
      }
    );
  },
  makeEmployeeActive: (id, callback) => {
    db.query(
      "UPDATE employees SET emp_status = ? WHERE id = ?",
      ["active", id],
      (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      }
    );
  },
  makeEmployeeInactive: (id, callback) => {
    db.query(
      "UPDATE employees SET emp_status = ? WHERE id = ?",
      ["inactive", id],
      (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      }
    );
  },
  loginEmployee: (email, callback) => {
    db.query(
      "SELECT * FROM Employees WHERE email = ?; ",
      email,
      (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result[0]);
        }
      }
    );
  },
  employeePasswordChange: (id, pass, callback) => {
    db.query(
      "UPDATE Employees SET emp_password = ? WHERE id = ?",
      [pass, id],
      (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      }
    );
  },
};

module.exports = EmployeeModel;
