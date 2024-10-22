import React from 'react';
import './ReportSelection.css';
 

const ReportSelection = ({ setSelectedReports }) => {
  const handleCheckboxChange = (type) => {
    setSelectedReports((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className='report-type'>
      <label className='lable-title'>Select Required Report Types:</label>
      {['Fleet Wise', 'Vehicle Wise', 'Trip Wise', 'Driving Scorecard'].map((report, index) => (
        <div key={index}>
          <input type="checkbox" className='checkbox' onChange={() => handleCheckboxChange(report)} />
          <label className='report'>{report}</label>
        </div>
      ))}
    </div>
  );
};

export default ReportSelection;
