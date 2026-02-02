import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const DoctorDashboard = () => {
  const { user } = useAuth();
  const rawToken = localStorage.getItem("token");
  const [patients, setPatients] = useState<any[]>([]);
  const [totalPatients, setTotalPatients] = useState(0);

  useEffect(() => {
    const fetchPatients = async () => {
      if (!rawToken) {
        console.error("Token not found");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/patients", {
          headers: { Authorization: `Bearer ${rawToken}` },
        });

        if (Array.isArray(response.data)) {
          setPatients(response.data);
          setTotalPatients(response.data.length);
          console.log("Fetched patients:", response.data);
        } else {
          console.error("Invalid patient data");
        }
      } catch (err: any) {
        console.error(
          "Error fetching patients:",
          err.response?.data || err.message
        );
      }
    };

    fetchPatients();
  }, [rawToken]);

  // Function to handle the "View Report" click
  const handleViewReport = (reportId: string) => {
    console.log("Clicked Report ID:", reportId);  // Log the Report ID to check its value
    if (reportId) {
      window.location.href = `/history/view/${reportId}`;
    } else {
      console.error("Report ID is undefined.");
    }
  };
  
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold">Total Patients</h2>
        <p className="text-4xl font-bold text-blue-600">{totalPatients}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Patients</h2>
        <ul className="space-y-4">
          {patients.map((patient) => (
            <li
              key={patient._id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <span className="font-semibold">{patient.name}</span>
                <div className="text-sm text-gray-500">
                  {/* Patient's email with clickable link */}
                  <a href={`mailto:${patient.email}`} className="text-blue-500">
                    {patient.email}
                  </a>
                </div>
              </div>
              <div className="flex space-x-4">
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorDashboard;
