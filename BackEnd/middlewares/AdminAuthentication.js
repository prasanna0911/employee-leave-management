const jwt = require("jsonwebtoken");
const AdminModel = require("../model/AdminModel");

const AdminAuthentication = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "missing token" });
  }
  try {
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET_KEY);
    AdminModel.getAdmin(decoded_token.email, (err, admin) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!admin) {
        res
          .status(404)
          .json({ response_code: 404, message: "Admin not found" });
      } else {
        req.adm_id = decoded_token.adm_id;
        req.adm_mail = decoded_token.email;
        next();
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Invalid token" });
  }
};

module.exports = AdminAuthentication;
