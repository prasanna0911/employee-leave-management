const jwt = require("jsonwebtoken");
const EmployeeModel = require("../model/EmployeeModel");

const EmployeeAuthentication = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "missing token" });
  }
  try {
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
    EmployeeModel.loginEmployee(decoded_token.email, (err, admin) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!admin) {
        res
          .status(404)
          .json({ response_code: 404, message: "Employee not found" });
      } else {
        req.emp_code = decoded_token.emp_id;
        req.emp_mail = decoded_token.email;
        req.emp_id = admin.id;
        next();
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Invalid token" });
  }
};

module.exports = EmployeeAuthentication;
