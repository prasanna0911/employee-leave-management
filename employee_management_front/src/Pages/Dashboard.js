import { Card, CardContent } from "@mui/material";
import React from "react";

const Dashboard = () => {
  const DashboardData = [
    {
      name: "Total Employees",
      value: 10,
    },
    {
      name: "Total Departments",
      value: 5,
    },
    {
      name: "Total Leave Type",
      value: 10,
    },
  ];
  return (
    <div>
      <h4>Dashboard</h4>
      <div className="d-flex gap-2">
        {DashboardData.map((data, index) => (
          <Card key={index}>
            <CardContent>
              <h5>{data.name}</h5>
              <h3>{data.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
