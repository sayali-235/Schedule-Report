import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { closeModal } from '../redux/modalSlice';
import ReportSelection from './ReportSelection';
import EmailInput from './EmailInput';
import NextModal from './NextModal';
import './SchduleReportModal.css';  
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ScheduleReportModal = () => {
  const dispatch = useDispatch();
const navigate =useNavigate()
  const location = useLocation();
  const { schedule } = location.state || {};
  
  const isEditMode = Boolean(schedule);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);

  const [emailList, setEmailList] = useState([]);
  const [selectedReports, setSelectedReports] = useState({});
  const [isNextModalOpen, setIsNextModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState({}); // Fixed variable name to singular

  useEffect(() => {
    if (schedule) {
      setEmailList(schedule.emailList || []);
      setSelectedReports(schedule.selectedReports || {});
      setIsNextModalOpen(schedule.isModalOpen || false);
      setSelectedVehicle(schedule.selectedVehicle || {});
    }
  }, [schedule]);

  const handleNext = () => {
    if (emailList.length && Object.values(selectedReports).some(Boolean)) {
      setIsNextModalOpen(true);
    }
  };

  const handleCancel = () => {
    dispatch(closeModal());
    navigate("/edit-schedule");  
  };


  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Schedule Reports</h3>

        <ReportSelection 
          setSelectedReports={setSelectedReports}
          setVehicles={setSelectedVehicle} // Updated function name to match state variable
          initialSelectedReports={selectedReports}
          initialSelectedVehicle={selectedVehicle}
        />

        <EmailInput emailList={emailList} setEmailList={setEmailList} />
        
        <div className="modal-footer">
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button 
            className="next-button" 
            disabled={!emailList.length || !Object.values(selectedReports).some(Boolean)} 
            onClick={handleNext}
          >
            Next
          </button>
        </div>
       
        {isNextModalOpen && (
          <NextModal 
            emailList={emailList} 
            selectedReports={selectedReports}
            selectedVehicle={selectedVehicle}
            onBack={() => setIsNextModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ScheduleReportModal;
