import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface ReportData {
  _id: string;
  email: string;
  prediction: string;
  image_name: string;
  timestamp: string;
}

const PatientReport: React.FC = () => {
  const { reportId } = useParams<{ reportId: string }>();
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!reportId) {
      setError("Report ID is missing.");
      setLoading(false);
      return;
    }

    if (!token) {
      setError("Authentication token not found. Please log in again.");
      setLoading(false);
      return;
    }

    const fetchReport = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/history/view/${reportId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data._id) {
          setReport(response.data);
        } else {
          setError("Invalid report data received from server.");
        }
      } catch (err: any) {
        console.error("Error fetching report:", err);
        setError(
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to fetch report."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  if (loading) return <div className="p-6">Loading...</div>;

  if (error)
    return <div className="p-6 text-red-600 font-semibold">Error: {error}</div>;

  if (!report)
    return <div className="p-6">No report data available.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Patient Report</h1>

      <div className="space-y-4">
        <p>
          <span className="font-semibold">Email:</span> {report.email}
        </p>
        <p>
          <span className="font-semibold">Prediction:</span> {report.prediction}
        </p>
        <p>
          <span className="font-semibold">Image Name:</span> {report.image_name}
        </p>
        <p>
          <span className="font-semibold">Date/Time:</span>{" "}
          {new Date(report.timestamp).toLocaleString()}
        </p>
      </div>

      <button
        onClick={() => window.history.back()}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Back
      </button>
    </div>
  );
};

export default PatientReport;
