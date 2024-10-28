const mysql = require("mysql");
const config = require("../config/config");

// Create a MySQL connection pool for better performance
const db = mysql.createPool(config);

// Employee Model
const Departments = {
  getAllDepartments: (callback) => {
    db.query(
      "SELECT *,DATE_FORMAT(created_date, '%Y-%m-%d') AS created_date FROM Departments",
      (err, results) => {
        if (err) {
          return callback(err);
        }
        callback(null, results);
      }
    );
  },

  getDepartmentById: (id, callback) => {
    db.query(
      "SELECT *,DATE_FORMAT(created_date, '%Y-%m-%d') AS created_date FROM Departments WHERE id = ?",
      [id],
      (err, results) => {
        if (err) {
          return callback(err);
        }
        callback(null, results[0]); // Returning one employee
      }
    );
  },

  createDepartment: (newDepartment, callback) => {
    db.query(
      "INSERT INTO Departments SET ?, created_date = NOW()",
      newDepartment,
      (err, results) => {
        if (err) {
          return callback(err);
        }
        callback(null, { id: results.insertId, ...newDepartment });
      }
    );
  },

  updateDepartment: (id, DepartmentData, callback) => {
    db.query(
      "UPDATE Departments SET ? WHERE id = ?",
      [DepartmentData, id],
      (err, results) => {
        if (err) {
          return callback(err);
        }
        callback(null, results);
      }
    );
  },

  deleteDepartment: (id, callback) => {
    db.query("DELETE FROM Departments WHERE id = ?", [id], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  },
};

module.exports = Departments;
