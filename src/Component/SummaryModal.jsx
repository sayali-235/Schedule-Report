import React from 'react';
import moment from 'moment';
import './SummaryModal.css';
 


const SummaryModal = (props) => {
  const { emailList, selectedReports, scheduleDate, skipWeekends, onClose } = props
  
  const handleBackClick = () => {
    onClose();
  };

  const handleConfirmClick = () => {
    alert('Schedule confirmed!');
    onClose();  
  };

  return (
    <div className="nested-modal-overlay">
      <div className="nested-modal-content">
        <h3>Schedule Summary</h3>
        <ul>

          <li><strong>Emails:</strong> {emailList.join(', ')}</li>
          <li><strong>Reports:</strong> {Object.keys(selectedReports).filter(key => selectedReports[key]).join(', ')}</li>

          <li><strong>Schedule Date:</strong> {moment(scheduleDate).format('MMMM Do YYYY')}</li>
          <li><strong>Skip Weekends:</strong> {skipWeekends ? 'Yes' : 'No'}</li>

        </ul>
        <div className="modal-actions">
          <button className='back-button' onClick={handleBackClick}>Back</button>
          <button className='confirm-button' onClick={handleConfirmClick}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default SummaryModal;
