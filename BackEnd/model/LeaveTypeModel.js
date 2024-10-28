const mysql = require("mysql");
const config = require("../config/config");

const db = mysql.createPool(config);
const LeaveTypeModel = {
  GetAllLeaveTypes: (callback) => {
    db.query(
      "SELECT *,DATE_FORMAT(created_date, '%Y-%m-%d') AS created_date FROM Leave_Types",
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
  getLeaveTypeById: (id, callback) => {
    db.query("SELECT * FROM leave_types where id = ?", id, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result[0]);
    });
  },
  createLeaveType: (newLeavetype, callback) => {
    db.query(
      "INSERT INTO Leave_Types SET ?, created_date = NOW()",
      newLeavetype,
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, { id: result.insertId, ...newLeavetype });
      }
    );
  },
  updateLeaveType: (id, leavetypedata, callback) => {
    db.query(
      "Update Leave_Types SET ? WHERE id = ?",
      [leavetypedata, id],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        callback(null, result);
      }
    );
  },
  deleteLeaveType: (id, callback) => {
    db.query("DELETE FROM Leave_Types WHERE id = ?", [id], (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  },
};

module.exports = LeaveTypeModel;
