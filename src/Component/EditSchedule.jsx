import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { closeModal, openModal } from "../redux/modalSlice";
import "./EditSchedule.css";

const EditSchedule = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [scheduleData, setScheduleData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser?.email) {
      const storedData = localStorage.getItem(currentUser.email);
      if (storedData) {
        setScheduleData(JSON.parse(storedData) || []);
      }
    }
  }, [currentUser]);

  const handleEditClick = (schedule) => {
    console.log("editing schedule", schedule);
    dispatch(openModal());
    navigate("/schedule-report", { state: { schedule } });
  };
  const handleLogOut = () => {
    navigate("/login");
    window.location.reload();
  };

  if (!scheduleData.length) {
    return <div>No schedule data found for {currentUser?.email}</div>;
  }

  return (
    <div className="edit-schedule-container">
      <h2 className="edit-s"> Schdule Report</h2>
      <ul>
        {scheduleData.map((schedule, index) => (
          <li key={index} className="schedule-item">
            <strong>Emails:</strong> {(schedule.emailList || []).join(", ")}{" "}
            <br />
            <strong>Reports:</strong>{" "}
            {(schedule.selectedReports
              ? Object.keys(schedule.selectedReports).filter(
                  (key) => schedule.selectedReports[key]
                )
              : []
            ).join(", ") || "None"}{" "}
            <br />
            <strong>Selected Vehicles:</strong>
            {(schedule.selectedVehicle?.selected || []).map((vehicle) => (
              <div key={vehicle.vin}>
                {vehicle.vin} - {vehicle.registration_number} ({vehicle.branch})
              </div>
            ))}
            <br />
            <strong>Schedule Date:</strong>{" "}
            {moment.utc(schedule.scheduleDate).format("D MMMM YYYY")} <br />
            <strong>Schedule Time:</strong> {schedule.time} <br />
            <strong>Skip Weekends:</strong>{" "}
            {schedule.skipWeekends ? "Yes" : "No"} <br />
            <div className="footer">
              <button className="cancel" onClick={handleLogOut}>
                Cancel
              </button>
              <button
                className="edit-button"
                onClick={() => handleEditClick(schedule)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditSchedule;
