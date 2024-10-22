 import React, { useState } from 'react';
import data from './VehicleData.json';

const VehicleSearch = ({ vehicles, onVehicleSelect }) => {
  const [branch, setBranch] = useState(''); // Branch selection
  const [searchTerm, setSearchTerm] = useState(''); // Search term for VIN or registration
  const [selectedVehicles, setSelectedVehicles] = useState([]); // Selected vehicles

  const branches = ['Mumbai', 'Pune', ,'Thane','Nagpur', 'Nashik']; // Branch options

  // Filter vehicles based on search term
  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.registration.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle vehicle selection
  const handleVehicleSelect = (vehicle) => {
    const alreadySelected = selectedVehicles.includes(vehicle);
    const updatedSelection = alreadySelected
      ? selectedVehicles.filter(v => v !== vehicle)
      : [...selectedVehicles, vehicle];
    setSelectedVehicles(updatedSelection);
    onVehicleSelect(updatedSelection); // Pass selected vehicles back to the parent component
  };

  return (
    <div>
      <label>Branch</label>
      <select value={branch} onChange={(e) => setBranch(e.target.value)}>
        <option value="">Select Branch</option>
        {branches.map((branch, index) => (
          <option key={index} value={branch}>{branch}</option>
        ))}
      </select>

      <label>Search Vehicle (VIN or Registration)</label>
      <input
        type="text"
        placeholder="Search by VIN or Registration"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="vehicle-list">
        {filteredVehicles.map(vehicle => (
          <div key={vehicle.vin} className="vehicle-item">
            <input
              type="checkbox"
              checked={selectedVehicles.includes(vehicle)}
              onChange={() => handleVehicleSelect(vehicle)}
            />
            <label>{vehicle.registration} (VIN: {vehicle.vin})</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleSearch;
