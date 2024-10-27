import React, { useState, useEffect } from 'react';
import './ReportSelection.css';
import VehicleSearchDropdown from './VehicleSearchDropdown';
import data from './VehicleData.json';
import { useLocation } from 'react-router-dom';

const ReportSelection = ({ setSelectedReports, setVehicles, initialSelectedReports, initialSelectedVehicle }) => {
  const vehicleData = data.vehicles;
  const location = useLocation();
  const { schedule } = location.state || {};
  const isEditMode = Boolean(schedule);

  const [showVehicleSearch, setShowVehicleSearch] = useState(false);
  const [selectedVehicles, setSelectedVehicles] = useState(initialSelectedVehicle?.selected || []);

  useEffect(() => {
    if (isEditMode && initialSelectedReports) {
      setSelectedReports(initialSelectedReports);
      setShowVehicleSearch(!!initialSelectedReports['Vehicle Wise']); // Use double negation for clarity
    }
  }, [isEditMode, initialSelectedReports, setSelectedReports]);

  const handleCheckboxChange = (report) => {
    setSelectedReports((prev) => ({
      ...prev,
      [report]: !prev[report], // Toggle the report selection
    }));

    if (report === 'Vehicle Wise') {
      setShowVehicleSearch((prev) => !prev); // Toggle visibility of vehicle search
    }
  };

  const handleVehicleSelect = (selected) => {
    setSelectedVehicles(selected);
    setVehicles((prev) => ({
      ...prev,
      selected,
    }));
  };

  return (
    <div className="report-container">
      <label className="report-label">Select Required Report Types:</label>
      {['Fleet Wise', 'Vehicle Wise', 'Trip Wise', 'Driving Scorecard'].map((report) => (
        <div key={report} className="radio-list">
          <input
            type="checkbox"
            className="checkbox"
            checked={initialSelectedReports?.[report] || false}
            onChange={() => handleCheckboxChange(report)}
          />
          <label className="report">{report}</label>
        </div>
      ))}

      {showVehicleSearch && vehicleData.length > 0 && (
        <VehicleSearchDropdown 
          vehicles={vehicleData} 
          onVehicleSelect={handleVehicleSelect} 
          selectedVehicles={selectedVehicles}
        />
      )}
    </div>
  );
};

export default ReportSelection;
