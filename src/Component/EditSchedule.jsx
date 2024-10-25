import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

const EditSchedule = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    if (currentUser?.email) {
      const storedData = localStorage.getItem(currentUser.email);
      if (storedData) {
        setScheduleData(JSON.parse(storedData) || []);  
      }
    }
  }, [currentUser]);

  if (!scheduleData || scheduleData.length === 0) {
    return <div>No schedule data found for {currentUser?.email}</div>;
  }

  return (
    <div className="edit-schedule-container">
      <h2>Stored Schedule Data for {currentUser?.email}</h2>
      <ul>
        {scheduleData.map((schedule, index) => (
          <li key={index} className="schedule-item">
            <strong>Emails:</strong> {(schedule.emailList || []).join(', ')} <br />
            <strong>Reports:</strong> {(schedule.selectedReports ? Object.keys(schedule.selectedReports).filter(key => schedule.selectedReports[key]) : []).join(', ')} <br />
            <strong>Selected Vehicles:</strong> 
            {(schedule.selectedVehicle?.selected || []).map(vehicle => (
              <div key={vehicle.vin}>
                {vehicle.vin} - {vehicle.registration_number} ({vehicle.branch})
              </div>
            ))}
            <br />
            <strong>Schedule Date:</strong> {moment(schedule.scheduleDate).format(' Do MMMM YYYY')} <br />
            <strong>Schedule Time:</strong> {schedule.time} <br />
            <strong>Skip Weekends:</strong> {schedule.skipWeekends ? 'Yes' : 'No'} <br />
            <button className="edit-button"  >Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EditSchedule;
