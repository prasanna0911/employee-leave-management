const AdminModel = require("../model/AdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AdminController = {
  CreateAdmin: async (req, res) => {
    const adminData = req.body;
    const hashedPassword = await bcrypt.hash(adminData.admin_password, 10);
    adminData.admin_password = hashedPassword;
    AdminModel.createAdmin(adminData, (err, admin) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res
          .status(200)
          .json({ response_code: 200, message: "Admin created successfully" });
      }
    });
  },
  AdminLogin: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ response_code: 400, message: "All fields are required" });
    }
    AdminModel.getAdmin(email, async (err, admin) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!admin) {
        res
          .status(404)
          .json({ response_code: 404, message: "Admin not found" });
      } else {
        const isPasswordMatch = await bcrypt.compare(
          password,
          admin.admin_password
        );
        if (isPasswordMatch) {
          const payload = {
            email: email,
            adm_id: admin.admin_id,
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
  AdminPasswordChange: async (req, res) => {
    const { password, newPassword } = req.body;
    if (!password || !newPassword) {
      return res
        .status(400)
        .json({ response_code: 400, message: "All fields are required" });
    }
    AdminModel.getAdmin(req.adm_mail, async (err, admin) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        const isPasswordMatch = await bcrypt.compare(
          password,
          admin.admin_password
        );
        if (isPasswordMatch) {
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          AdminModel.adminPasswordChange(
            admin.id,
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

module.exports = AdminController;
