export const DepartmentData = [
  {
    department_code: "HR001",
    department_name: "Human Resources",
    department_shortname: "HR",
    created_date: "2023-01-15",
  },
  {
    department_code: "FIN002",
    department_name: "Finance",
    department_shortname: "FIN",
    created_date: "2023-02-10",
  },
  {
    department_code: "ENG003",
    department_name: "Engineering",
    department_shortname: "ENG",
    created_date: "2023-03-05",
  },
  {
    department_code: "MKT004",
    department_name: "Marketing",
    department_shortname: "MKT",
    created_date: "2023-04-20",
  },
  {
    department_code: "IT005",
    department_name: "Information Technology",
    department_shortname: "IT",
    created_date: "2023-05-18",
  },
  {
    department_code: "SALES006",
    department_name: "Sales",
    department_shortname: "SALES",
    created_date: "2023-06-12",
  },
  {
    department_code: "OPS007",
    department_name: "Operations",
    department_shortname: "OPS",
    created_date: "2023-07-08",
  },
  {
    department_code: "CS008",
    department_name: "Customer Support",
    department_shortname: "CS",
    created_date: "2023-08-25",
  },
];

export const EmployeeData = [
  {
    employee_id: "E001",
    employee_name: "John Doe",
    department: "Human Resources",
    status: "Active",
    register_date: "2023-01-10",
  },
  {
    employee_id: "E002",
    employee_name: "Jane Smith",
    department: "Finance",
    status: "Active",
    register_date: "2023-02-15",
  },
  {
    employee_id: "E003",
    employee_name: "Alice Johnson",
    department: "Engineering",
    status: "Inactive",
    register_date: "2023-03-12",
  },
  {
    employee_id: "E004",
    employee_name: "Michael Brown",
    department: "Marketing",
    status: "Active",
    register_date: "2023-04-22",
  },
  {
    employee_id: "E005",
    employee_name: "Emily Davis",
    department: "Information Technology",
    status: "Active",
    register_date: "2023-05-30",
  },
  {
    employee_id: "E006",
    employee_name: "Chris Wilson",
    department: "Sales",
    status: "Inactive",
    register_date: "2023-06-14",
  },
  {
    employee_id: "E007",
    employee_name: "Sophia Martinez",
    department: "Operations",
    status: "Active",
    register_date: "2023-07-20",
  },
  {
    employee_id: "E008",
    employee_name: "David Lee",
    department: "Customer Support",
    status: "Active",
    register_date: "2023-08-05",
  },
  {
    employee_id: "E009",
    employee_name: "Oliver Moore",
    department: "Human Resources",
    status: "Active",
    register_date: "2023-09-15",
  },
  {
    employee_id: "E010",
    employee_name: "Charlotte King",
    department: "Finance",
    status: "Inactive",
    register_date: "2023-10-01",
  },
  {
    employee_id: "E011",
    employee_name: "Liam Scott",
    department: "Engineering",
    status: "Active",
    register_date: "2023-08-12",
  },
  {
    employee_id: "E012",
    employee_name: "Emma White",
    department: "Marketing",
    status: "Active",
    register_date: "2023-07-19",
  },
  {
    employee_id: "E013",
    employee_name: "Benjamin Harris",
    department: "Information Technology",
    status: "Inactive",
    register_date: "2023-06-11",
  },
  {
    employee_id: "E014",
    employee_name: "Mia Martin",
    department: "Sales",
    status: "Active",
    register_date: "2023-05-14",
  },
  {
    employee_id: "E015",
    employee_name: "James Thompson",
    department: "Operations",
    status: "Inactive",
    register_date: "2023-04-25",
  },
  {
    employee_id: "E016",
    employee_name: "Harper Lewis",
    department: "Customer Support",
    status: "Active",
    register_date: "2023-03-30",
  },
  {
    employee_id: "E017",
    employee_name: "Mason Young",
    department: "Human Resources",
    status: "Active",
    register_date: "2023-02-16",
  },
  {
    employee_id: "E018",
    employee_name: "Isabella Hall",
    department: "Finance",
    status: "Active",
    register_date: "2023-01-12",
  },
  {
    employee_id: "E019",
    employee_name: "Elijah Allen",
    department: "Engineering",
    status: "Inactive",
    register_date: "2023-05-23",
  },
  {
    employee_id: "E020",
    employee_name: "Amelia Perez",
    department: "Marketing",
    status: "Active",
    register_date: "2023-07-01",
  },
];

export const LeaveTypeData = [
  {
    leave_type: "Sick Leave",
    description: "Leave taken when an employee is unwell.",
    created_date: "2023-01-05",
  },
  {
    leave_type: "Casual Leave",
    description: "Leave taken for personal reasons or emergencies.",
    created_date: "2023-02-10",
  },
  {
    leave_type: "Maternity Leave",
    description: "Leave granted for childbirth and postnatal care.",
    created_date: "2023-03-20",
  },
  {
    leave_type: "Annual Leave",
    description: "Paid time off for vacation or personal time.",
    created_date: "2023-04-15",
  },
  {
    leave_type: "Bereavement Leave",
    description: "Leave granted for attending a funeral or mourning a loss.",
    created_date: "2023-05-08",
  },
];

export const AllLeaves = [
  {
    employee_name: "John Doe",
    employee_id: "E001",
    gender: "Male",
    employee_email_id: "john.doe@example.com",
    employee_contact_no: "1234567890",
    leave_type: "Sick Leave",
    from_date: "2023-09-10",
    to_date: "2023-09-12",
    posting_date: "2023-09-08",
    employee_leave_description: "Fever and cold",
    leave_status: "Approved",
    admin_remark: "Get well soon",
    admin_action_taken_time: "2023-09-09 10:30 AM",
  },
  {
    employee_name: "Jane Smith",
    employee_id: "E002",
    gender: "Female",
    employee_email_id: "jane.smith@example.com",
    employee_contact_no: "0987654321",
    leave_type: "Annual Leave",
    from_date: "2023-07-15",
    to_date: "2023-07-25",
    posting_date: "2023-07-10",
    employee_leave_description: "Family vacation",
    leave_status: "Approved",
    admin_remark: "Have a good time",
    admin_action_taken_time: "2023-07-11 2:45 PM",
  },
  {
    employee_name: "Alice Johnson",
    employee_id: "E003",
    gender: "Female",
    employee_email_id: "alice.johnson@example.com",
    employee_contact_no: "1122334455",
    leave_type: "Sick Leave",
    from_date: "2023-08-05",
    to_date: "2023-08-07",
    posting_date: "2023-08-04",
    employee_leave_description: "Severe headache",
    leave_status: "Rejected",
    admin_remark: "Insufficient medical proof",
    admin_action_taken_time: "2023-08-05 9:00 AM",
  },
  {
    employee_name: "Michael Brown",
    employee_id: "E004",
    gender: "Male",
    employee_email_id: "michael.brown@example.com",
    employee_contact_no: "2233445566",
    leave_type: "Casual Leave",
    from_date: "2023-06-20",
    to_date: "2023-06-21",
    posting_date: "2023-06-18",
    employee_leave_description: "Personal work",
    leave_status: "Approved",
    admin_remark: "Okay",
    admin_action_taken_time: "2023-06-19 11:00 AM",
  },
  {
    employee_name: "Emily Davis",
    employee_id: "E005",
    gender: "Female",
    employee_email_id: "emily.davis@example.com",
    employee_contact_no: "3344556677",
    leave_type: "Maternity Leave",
    from_date: "2023-09-01",
    to_date: "2023-12-01",
    posting_date: "2023-08-01",
    employee_leave_description: "Childbirth",
    leave_status: "Approved",
    admin_remark: "Take care",
    admin_action_taken_time: "2023-08-05 9:30 AM",
  },
  {
    employee_name: "Chris Wilson",
    employee_id: "E006",
    gender: "Male",
    employee_email_id: "chris.wilson@example.com",
    employee_contact_no: "4455667788",
    leave_type: "Bereavement Leave",
    from_date: "2023-07-10",
    to_date: "2023-07-12",
    posting_date: "2023-07-08",
    employee_leave_description: "Attending funeral",
    leave_status: "Approved",
    admin_remark: "Sorry for your loss",
    admin_action_taken_time: "2023-07-09 1:30 PM",
  },
  {
    employee_name: "Sophia Martinez",
    employee_id: "E007",
    gender: "Female",
    employee_email_id: "sophia.martinez@example.com",
    employee_contact_no: "5566778899",
    leave_type: "Casual Leave",
    from_date: "2023-10-05",
    to_date: "2023-10-06",
    posting_date: "2023-10-01",
    employee_leave_description: "Doctor's appointment",
    leave_status: "Pending",
    admin_remark: "",
    admin_action_taken_time: "",
  },
  {
    employee_name: "David Lee",
    employee_id: "E008",
    gender: "Male",
    employee_email_id: "david.lee@example.com",
    employee_contact_no: "6677889900",
    leave_type: "Sick Leave",
    from_date: "2023-08-15",
    to_date: "2023-08-17",
    posting_date: "2023-08-14",
    employee_leave_description: "Food poisoning",
    leave_status: "Approved",
    admin_remark: "Take care",
    admin_action_taken_time: "2023-08-14 10:00 AM",
  },
  {
    employee_name: "Oliver Moore",
    employee_id: "E009",
    gender: "Male",
    employee_email_id: "oliver.moore@example.com",
    employee_contact_no: "7788990011",
    leave_type: "Annual Leave",
    from_date: "2023-11-01",
    to_date: "2023-11-10",
    posting_date: "2023-10-25",
    employee_leave_description: "Family trip",
    leave_status: "Approved",
    admin_remark: "Enjoy",
    admin_action_taken_time: "2023-10-26 3:00 PM",
  },
  {
    employee_name: "Charlotte King",
    employee_id: "E010",
    gender: "Female",
    employee_email_id: "charlotte.king@example.com",
    employee_contact_no: "8899001122",
    leave_type: "Casual Leave",
    from_date: "2023-09-25",
    to_date: "2023-09-26",
    posting_date: "2023-09-22",
    employee_leave_description: "Personal reason",
    leave_status: "Approved",
    admin_remark: "Approved",
    admin_action_taken_time: "2023-09-23 4:00 PM",
  },
  {
    employee_name: "Liam Scott",
    employee_id: "E011",
    gender: "Male",
    employee_email_id: "liam.scott@example.com",
    employee_contact_no: "9900112233",
    leave_type: "Sick Leave",
    from_date: "2023-08-20",
    to_date: "2023-08-22",
    posting_date: "2023-08-19",
    employee_leave_description: "Flu symptoms",
    leave_status: "Rejected",
    admin_remark: "Need doctor's certificate",
    admin_action_taken_time: "2023-08-20 9:15 AM",
  },
  {
    employee_name: "Emma White",
    employee_id: "E012",
    gender: "Female",
    employee_email_id: "emma.white@example.com",
    employee_contact_no: "2233445566",
    leave_type: "Annual Leave",
    from_date: "2023-12-15",
    to_date: "2023-12-20",
    posting_date: "2023-12-05",
    employee_leave_description: "Holiday vacation",
    leave_status: "Pending",
    admin_remark: "",
    admin_action_taken_time: "",
  },
  {
    employee_name: "Benjamin Harris",
    employee_id: "E013",
    gender: "Male",
    employee_email_id: "benjamin.harris@example.com",
    employee_contact_no: "3344556677",
    leave_type: "Sick Leave",
    from_date: "2023-11-10",
    to_date: "2023-11-12",
    posting_date: "2023-11-09",
    employee_leave_description: "Back pain",
    leave_status: "Approved",
    admin_remark: "Rest well",
    admin_action_taken_time: "2023-11-10 11:30 AM",
  },
  {
    employee_name: "Mia Martin",
    employee_id: "E014",
    gender: "Female",
    employee_email_id: "mia.martin@example.com",
    employee_contact_no: "4455667788",
    leave_type: "Maternity Leave",
    from_date: "2023-10-01",
    to_date: "2024-01-01",
    posting_date: "2023-09-10",
    employee_leave_description: "Maternity leave",
    leave_status: "Approved",
    admin_remark: "Congratulations",
    admin_action_taken_time: "2023-09-12 9:30 AM",
  },
  {
    employee_name: "James Thompson",
    employee_id: "E015",
    gender: "Male",
    employee_email_id: "james.thompson@example.com",
    employee_contact_no: "5566778899",
    leave_type: "Casual Leave",
    from_date: "2023-09-18",
    to_date: "2023-09-19",
    posting_date: "2023-09-15",
    employee_leave_description: "Personal work",
    leave_status: "Approved",
    admin_remark: "Noted",
    admin_action_taken_time: "2023-09-16 2:00 PM",
  },
  {
    employee_name: "Harper Lewis",
    employee_id: "E016",
    gender: "Female",
    employee_email_id: "harper.lewis@example.com",
    employee_contact_no: "6677889900",
    leave_type: "Annual Leave",
    from_date: "2023-12-01",
    to_date: "2023-12-05",
    posting_date: "2023-11-25",
    employee_leave_description: "Family event",
    leave_status: "Approved",
    admin_remark: "Approved",
    admin_action_taken_time: "2023-11-26 11:45 AM",
  },
  {
    employee_name: "Mason Young",
    employee_id: "E017",
    gender: "Male",
    employee_email_id: "mason.young@example.com",
    employee_contact_no: "7788990011",
    leave_type: "Bereavement Leave",
    from_date: "2023-08-02",
    to_date: "2023-08-03",
    posting_date: "2023-08-01",
    employee_leave_description: "Attending a funeral",
    leave_status: "Approved",
    admin_remark: "Sorry for your loss",
    admin_action_taken_time: "2023-08-02 10:00 AM",
  },
  {
    employee_name: "Isabella Hall",
    employee_id: "E018",
    gender: "Female",
    employee_email_id: "isabella.hall@example.com",
    employee_contact_no: "8899001122",
    leave_type: "Casual Leave",
    from_date: "2023-10-12",
    to_date: "2023-10-13",
    posting_date: "2023-10-10",
    employee_leave_description: "Personal work",
    leave_status: "Approved",
    admin_remark: "Noted",
    admin_action_taken_time: "2023-10-11 12:00 PM",
  },
  {
    employee_name: "Elijah Allen",
    employee_id: "E019",
    gender: "Male",
    employee_email_id: "elijah.allen@example.com",
    employee_contact_no: "9900112233",
    leave_type: "Sick Leave",
    from_date: "2023-09-05",
    to_date: "2023-09-07",
    posting_date: "2023-09-04",
    employee_leave_description: "Stomach flu",
    leave_status: "Approved",
    admin_remark: "Take care",
    admin_action_taken_time: "2023-09-05 8:45 AM",
  },
  {
    employee_name: "Amelia Perez",
    employee_id: "E020",
    gender: "Female",
    employee_email_id: "amelia.perez@example.com",
    employee_contact_no: "2233445566",
    leave_type: "Annual Leave",
    from_date: "2023-11-15",
    to_date: "2023-11-20",
    posting_date: "2023-11-10",
    employee_leave_description: "Holiday vacation",
    leave_status: "Pending",
    admin_remark: "",
    admin_action_taken_time: "",
  },
];
