const mysql = require("mysql");
const config = require("../config/config");

const db = mysql.createPool(config);

const AdminModel = {
  createAdmin: (adminData, callback) => {
    db.query(
      "INSERT INTO admins set ? ,created_date = NOW()",
      adminData,
      (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      }
    );
  },
  getAdmin: (email_id, callback) => {
    db.query(
      "SELECT * FROM admins WHERE email = ?",
      email_id,
      (err, result) => {
        if (err) {
          callback(err);
        } else {
          callback(null, result[0]);
        }
      }
    );
  },
  adminPasswordChange: (id, pass, callback) => {
    db.query(
      "UPDATE admins SET admin_password = ? WHERE id = ?",
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

module.exports = AdminModel;
