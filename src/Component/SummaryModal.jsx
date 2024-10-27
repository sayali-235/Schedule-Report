import React from 'react';
import moment from 'moment';
import './SummaryModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';  
import { summaryData } from '../redux/summarySlice';
import { logout } from '../redux/authSlice';  

const SummaryModal = (props) => {
  const location = useLocation();
  const { schedule } = location.state || {};

  const {
    emailList, 
    selectedReports, 
    scheduleDate, 
    skipWeekends, 
    onClose, 
    selectedVehicle, 
    time,
    isEditMode,
    existingSchedule
    
  } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();  
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleBackClick = () => onClose();

  const handleConfirmClick = () => {
    if (!currentUser?.email) {
      alert('User email not found!');
      return;
    }

    const cleanSelectedReports = Object.fromEntries(
      Object.entries(selectedReports).filter(([_, value]) => value)
    );

    const summary = {
      emailList,
      selectedReports: cleanSelectedReports,
      scheduleDate,
      skipWeekends,
      selectedVehicle,
      time,
    };

    dispatch(summaryData(summary));

    const storedSummaries = JSON.parse(localStorage.getItem(currentUser.email)) || [];

    if (isEditMode && existingSchedule) {
      const updatedSummaries = storedSummaries.map(existing => 
        existing.scheduleDate === existingSchedule.scheduleDate ? summary : existing
      );
      localStorage.setItem(currentUser.email, JSON.stringify(updatedSummaries));
    } else {
      const existingScheduleOnDate = storedSummaries.some(existing => 
        existing.scheduleDate === scheduleDate
      );

      if (existingScheduleOnDate) {
        alert('A schedule already exists for this date.');
        return;
      }

      storedSummaries.push(summary);
      localStorage.setItem(currentUser.email, JSON.stringify(storedSummaries));
    }

    alert('Schedule confirmed! Logging out now.');
    dispatch(logout(!currentUser));
    navigate('/login');
    onClose();
    window.location.reload();
  };

  return (
    <div className="nested-modal-overlay">
      <div className="nested-modal-content">
        <h3>{isEditMode ? 'Edit Schedule' : 'Schedule Summary'}</h3>
        <ul>
          <li><strong>Emails:</strong> {emailList.join(', ')}</li>
          <li>
            <strong>Reports:</strong> 
            {Object.keys(selectedReports)
              .filter((key) => selectedReports[key])
              .join(', ') || 'None'}
          </li>
          <li>
            <strong>Selected Vehicles:</strong>
            {selectedVehicle?.selected?.length > 0 
              ? selectedVehicle.selected.map(vehicle => (
                  <div key={vehicle.vin}>
                    {vehicle.vin} - {vehicle.registration_number} ({vehicle.branch})
                  </div>
                ))
              : 'None'}
          </li>
          <li><strong>Schedule On:</strong> {moment(scheduleDate).format('Do MMMM YYYY')}</li>
          <li><strong>Schedule Time:</strong> {time}</li>
          <li><strong>Skip Weekends:</strong> {skipWeekends ? 'Yes' : 'No'}</li>
        </ul>

        <div className="modal-actions">
          <button className="back-button" onClick={handleBackClick}>
            Back
          </button>
          <button className="confirm-button" onClick={handleConfirmClick}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;
