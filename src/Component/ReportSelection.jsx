import React, { useState } from 'react';
import './ReportSelection.css';
import VehicleSearchDropdown from './VehicleSearchDropdown';
import data from './VehicleData.json';

const ReportSelection = ({ setSelectedReports ,onVehicleSelect  }) => {
  const vehicleData =data.vehicles;
  
  const [showVehicleSearch, setShowVehicleSearch] = useState(false);

  const [selectedVehicles, setSelectedVehicles] = useState([]);
  
  const handleCheckboxChange = (report) => {
    setSelectedReports((prev) => ({ ...prev, [report]: !prev[report] }));
    
    if (report === 'Vehicle Wise') {
     
      setShowVehicleSearch(!showVehicleSearch);
       
      
    }
  };

  const handleVehicleSelect = (selected) => {
    setSelectedVehicles(selected);  
    console.log('Selected vehicles:', selected);  
     
  };

   

  return (
    <div className="report-type">
      <label className="label-title">Select Required Report Types:</label>
      {['Fleet Wise', 'Vehicle Wise', 'Trip Wise', 'Driving Scorecard'].map((report ) => (
        <div key={ report}>
          <input
            type="checkbox"
            className="checkbox"
            onChange={() => handleCheckboxChange(report)}
          />
          <label className="report">{report}</label>
        </div>
      ))}

      {showVehicleSearch && vehicleData.length > 0 && 
      (
        <VehicleSearchDropdown 
        vehicles={vehicleData } 
        onVehicleSelect={handleVehicleSelect} 
        selectedVehicles={selectedVehicles}
        />
      )}

       
    </div>
  );
};

export default ReportSelection;
