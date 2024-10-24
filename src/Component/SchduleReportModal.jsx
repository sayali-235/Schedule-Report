import React, {  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../redux/modalSlice';
import ReportSelection from './ReportSelection';
import EmailInput from './EmailInput';
import NextModal from './NextModal';
import './SchduleReportModal.css';

const ScheduleReportModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);

  const [emailList, setEmailList]= useState([]);
  const [selectedReports, setSelectedReports] = useState({});
  const [isNextModalOpen, setIsNextModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicles] = useState({});

  const handleNext = () => {
    if (emailList.length && Object.values(selectedReports).some(Boolean)) {
      setIsNextModalOpen(true);
    }
  };
  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Schedule Reports</h3>

        <ReportSelection 
          setSelectedReports={setSelectedReports}
          setVehicles={setSelectedVehicles}  
        />

        <EmailInput emailList={emailList} setEmailList={setEmailList} />
        <div className="modal-footer">
          <button className='cancel-button' onClick={() => dispatch(closeModal())}>Cancel</button>
          <button className='next-button' disabled={!emailList.length || !Object.values(selectedReports).some(Boolean)} onClick={handleNext}>Next</button>
        </div>
       
        { isNextModalOpen && 
          <NextModal 
            emailList={emailList} 
            selectedReports={selectedReports}
            selectedVehicle={selectedVehicle}
            onBack={() => setIsNextModalOpen(false)}
          />
        }
      </div>
    </div>
  );
};

export default ScheduleReportModal;
