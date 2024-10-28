const mysql = require("mysql");
const config = require("../config/config");

const db = mysql.createPool(config);

const LeaveModel = {
  postLeave: (leaveData, callback) => {
    db.query(
      "INSERT INTO all_leaves SET ?, posting_date = NOW()",
      leaveData,
      (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      }
    );
  },
  getEmployeeLeaves: (id, callback) => {
    db.query(
      "SELECT *,DATE_FORMAT(from_date, '%Y-%m-%d') AS from_date,DATE_FORMAT(to_date, '%Y-%m-%d') AS to_date,DATE_FORMAT(posting_date, '%Y-%m-%d') AS posting_date FROM all_leaves WHERE employee_id = ?",
      id,
      (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      }
    );
  },
  getAllLeaves: (callback) => {
    db.query(
      "SELECT All_leaves.*, Employees.*,Employees.id as emp_id,DATE_FORMAT(All_leaves.from_date, '%Y-%m-%d') AS from__date,DATE_FORMAT(All_leaves.to_date, '%Y-%m-%d') AS to__date,DATE_FORMAT(All_leaves.posting_date, '%Y-%m-%d') AS posting__date,DATE_FORMAT(All_leaves.admin_action_taken_time, '%Y-%m-%d %H:%i:%s') AS admin_action_time FROM All_leaves JOIN Employees ON All_leaves.employee_id = Employees.id",
      (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      }
    );
  },
  changeLeaveStatus: (id, leave_data, callback) => {
    db.query(
      "UPDATE All_leaves set ?,admin_action_taken_time = Now() where leave_id = ?",
      [leave_data, id],
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

module.exports = LeaveModel;
