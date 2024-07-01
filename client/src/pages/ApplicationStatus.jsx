import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";

const ApplicationStatus = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { patientId } = useContext(Context); // Assuming patientId is available in Context

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!patientId) {
        console.error("Patient ID is undefined");
        return; // Only fetch appointments if patientId is defined
      }

      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://mortis-2.onrender.com/api/v1/appointment/patient-history/${patientId}`,
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        toast.error("Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments(); // Call fetchAppointments inside useEffect
  }, [patientId]); // Add patientId as a dependency to useEffect

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <div style={{ maxWidth: "800px", margin: "200px auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Appointment History
      </h2>
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                  backgroundColor: "#f4f4f4",
                }}
              >
                Doctor
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                  backgroundColor: "#f4f4f4",
                }}
              >
                Department
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                  backgroundColor: "#f4f4f4",
                }}
              >
                Appointment Date
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                  backgroundColor: "#f4f4f4",
                }}
              >
                Address
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                  backgroundColor: "#f4f4f4",
                }}
              >
                Visited
              </th>
              <th
                style={{
                  padding: "10px",
                  border: "1px solid #ddd",
                  textAlign: "left",
                  backgroundColor: "#f4f4f4",
                }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    border: "1px solid #ddd",
                  }}
                >
                  No appointments found
                </td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "left",
                    }}
                  >{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "left",
                    }}
                  >
                    {appointment.department}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "left",
                    }}
                  >
                    {new Date(
                      appointment.appointment_date
                    ).toLocaleDateString()}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "left",
                    }}
                  >
                    {appointment.address}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "left",
                    }}
                  >
                    {appointment.visited ? "Yes" : "No"}
                  </td>
                  <td
                    style={{
                      padding: "10px",
                      border: "1px solid #ddd",
                      textAlign: "left",
                    }}
                  >
                    {appointment.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ApplicationStatus;
