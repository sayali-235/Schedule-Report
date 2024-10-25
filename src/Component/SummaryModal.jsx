import React from 'react';
import moment from 'moment';
import './SummaryModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';  
import { summaryData } from '../redux/summarySlice';
import { logout } from '../redux/authSlice';  

const SummaryModal = (props) => {
  const { emailList, selectedReports, scheduleDate,   skipWeekends, onClose, selectedVehicle, time } = props;
  const dispatch = useDispatch();
  
  const navigate = useNavigate();  
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

    
    alert('Schedule confirmed! You will now be logged out.');
    dispatch(logout(!currentUser));
    navigate('/');
    window.location.reload() 
    onClose();

     
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
            {selectedVehicle && 
            selectedVehicle.selected && 
            selectedVehicle.selected.length > 0
              ? selectedVehicle.selected.map(vehicle => (
                  <div key={vehicle.vin}>
                    {vehicle.vin} - {vehicle.registration_number} ({vehicle.branch})
                  </div>
                ))
              : 'None'}
          </li>
          <li><strong>Schedule On:</strong> {moment(scheduleDate).format(' Do MMMM YYYY')}</li>
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
