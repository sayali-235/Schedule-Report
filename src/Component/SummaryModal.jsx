import React from 'react';
import moment from 'moment';
import './SummaryModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { summaryData } from '../redux/summarySlice';
import { logout } from '../redux/authSlice'; // Import logout action

const SummaryModal = (props) => {
  const { emailList, selectedReports, scheduleDate, skipWeekends, onClose, selectedVehicle, time } = props;
  const dispatch = useDispatch();
  
  const navigate = useNavigate(); // Initialize useNavigate
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleBackClick = () => {
    onClose();
  };

  const handleConfirmClick = () => {
    if (!currentUser?.email) {
      alert('User email not found!');
      return;
    }

    const summary = {
      emailList,
      selectedReports,
      scheduleDate,
      skipWeekends,
      selectedVehicle,
      time,
    };

    dispatch(summaryData(summary));

    const storedSummaries = JSON.parse(localStorage.getItem(currentUser.email)) || [];
    storedSummaries.push(summary);
    localStorage.setItem(currentUser.email, JSON.stringify(storedSummaries));

    // Show the alert and after the user clicks OK, log them out
    alert('Schedule confirmed! You will now be logged out.');

    // After alert is dismissed, logout, close the modal, and navigate to the login page
    dispatch(logout());
    onClose();

    // Navigate to login page
    navigate('/login'); // Adjust the route to your login page path
  };

  return (
    <div className="nested-modal-overlay">
      <div className="nested-modal-content">
        <h3>Schedule Summary</h3>
        <ul>
          <li><strong>Emails:</strong> {emailList.join(', ')}</li>
          <li><strong>Reports:</strong> {Object.keys(selectedReports).filter(key => selectedReports[key]).join(', ')}</li>
          <li>
            <strong>Selected Vehicles:</strong>
            {selectedVehicle && selectedVehicle.selected && selectedVehicle.selected.length > 0
              ? selectedVehicle.selected.map(vehicle => (
                  <div key={vehicle.vin}>
                    {vehicle.vin} - {vehicle.registration_number} ({vehicle.branch})
                  </div>
                ))
              : 'None'}
          </li>
          <li><strong>Schedule Date:</strong> {moment(scheduleDate).format(' Do MMMM YYYY')}</li>
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
