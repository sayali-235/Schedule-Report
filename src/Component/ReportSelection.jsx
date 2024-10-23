import React, { useState, useEffect } from 'react';
import './ReportSelection.css';
import VehicleSearchDropdown from './VehicleSearchDropdown';

const ReportSelection = ({ setSelectedReports, onVehicleSelect }) => {
  const [showVehicleSearch, setShowVehicleSearch] = useState(false);
  const [vehicleData, setVehicleData] = useState([]);
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  const handleCheckboxChange = (type) => {
    setSelectedReports((prev) => ({ ...prev, [type]: !prev[type] }));

    if (type === 'Vehicle Wise') {
      setShowVehicleSearch(!showVehicleSearch);
    }
  };

  const handleVehicleSelect = (selected) => {
    setSelectedVehicles(selected);  
    console.log('Selected vehicles:', selected);  
  };

  useEffect(() => {
    fetch('/VehicleData.json')
      .then((response) => response.json())
      .then((data) => setVehicleData(data.vehicles))
      .catch((error) => console.error('Error fetching vehicle data:', error));
  }, []);

  return (
    <div className="report-type">
      <label className="label-title">Select Required Report Types:</label>
      {['Fleet Wise', 'Vehicle Wise', 'Trip Wise', 'Driving Scorecard'].map((report, index) => (
        <div key={index}>
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
        vehicles={vehicleData} 
        onVehicleSelect={handleVehicleSelect} 
         
        />
      )}

       
    </div>
  );
};

export default ReportSelection;
