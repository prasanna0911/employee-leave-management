import axios from "axios";

const baseUrl = "http://localhost:5000";

let token;
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

const instance = axios.create({
  baseURL: baseUrl,
  headers: { Authorization: "Bearer " + token },
});
//login

const AdminLogin = async (data) => {
  try {
    const response = await axios.post(baseUrl + "/admin-login", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
const EmployeeLogin = async (data) => {
  try {
    const response = await axios.post(baseUrl + "/employee-login", data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
//department api's
const GetAllDepartments = async () => {
  try {
    const response = await axios.get(baseUrl + "/department");
    return response.data;
  } catch (error) {
    return error;
  }
};

const GetAllDepartmentById = async (id) => {
  try {
    const response = await axios.get(baseUrl + `/department/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

const CreateDepartment = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/department", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const UpdateDepartment = async (id, data) => {
  try {
    const response = await instance.put(baseUrl + `/department/${id}`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const DeleteDepartment = async (id) => {
  try {
    const response = await instance.delete(baseUrl + `/department/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

//leavetype api's
const GetAllLeaveTypes = async () => {
  try {
    const response = await axios.get(baseUrl + "/leavetype");
    return response.data;
  } catch (error) {
    return error;
  }
};

const GetAllLeaveTypeById = async (id) => {
  try {
    const response = await axios.get(baseUrl + `/leavetype/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

const CreateLeaveType = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/leavetype", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const UpdateLeaveType = async (id, data) => {
  try {
    const response = await instance.put(baseUrl + `/leavetype/${id}`, data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const DeleteLeaveType = async (id) => {
  try {
    const response = await instance.delete(baseUrl + `/leavetype/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

const GetAllEmployees = async () => {
  try {
    const response = await axios.get(baseUrl + "/employee");
    return response.data;
  } catch (error) {
    return error;
  }
};

const CreateEmployee = async (data) => {
  try {
    const response = await instance.post(baseUrl + "/employee", data);
    return response.data;
  } catch (error) {
    return error;
  }
};

const GetEmployee = async (id) => {
  try {
    const response = await axios.get(baseUrl + `/employee/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
const MakeEmployeeActive = async (id) => {
  try {
    const response = await instance.put(baseUrl + `/employee-active/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
const MakeEmployeeInactive = async (id) => {
  try {
    const response = await instance.put(baseUrl + `/employee-inactive/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

const GetEmployeeLeaves = async () => {
  try {
    const response = await instance.get(baseUrl + `/employee-leaves`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
const GetAllLeaves = async () => {
  try {
    const response = await instance.get(baseUrl + `/all-leaves`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const ApplyLeave = async (data) => {
  try {
    const response = await instance.post(baseUrl + `/apply-leave`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
const ChangeLeaveStatus = async (data) => {
  try {
    const response = await instance.put(baseUrl + `/change-leave-status`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const AdminPasswordChange = async (data) => {
  try {
    const response = await instance.put(
      baseUrl + `/admin-change-password`,
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
const EmployeePasswordChange = async (data) => {
  try {
    const response = await instance.put(
      baseUrl + `/employee-change-password`,
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const ApiServices = {
  AdminLogin,
  EmployeeLogin,
  GetAllDepartments,
  GetAllDepartmentById,
  CreateDepartment,
  UpdateDepartment,
  DeleteDepartment,
  GetAllLeaveTypes,
  GetAllLeaveTypeById,
  CreateLeaveType,
  UpdateLeaveType,
  DeleteLeaveType,
  GetAllEmployees,
  CreateEmployee,
  GetEmployee,
  MakeEmployeeActive,
  MakeEmployeeInactive,
  GetEmployeeLeaves,
  GetAllLeaves,
  ApplyLeave,
  ChangeLeaveStatus,
  AdminPasswordChange,
  EmployeePasswordChange,
};
