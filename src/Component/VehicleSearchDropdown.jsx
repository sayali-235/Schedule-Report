import React, { useState } from 'react';
import './VehicleSearchDropdown.css';

const VehicleSearchDropdown = ({ vehicles = [], onVehicleSelect }) => {
  const [selectedBranch, setSelectedBranch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  const branches = ['Thane', 'Mumbai', 'Pune'];

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleVehicleSelection = (vehicle) => {
    const isSelected = selectedVehicles.some((v) => v.vin === vehicle.vin);
    const updatedVehicles = isSelected
      ? selectedVehicles.filter((v) => v.vin !== vehicle.vin)
      : [...selectedVehicles, vehicle];
    console.log("updated selected vehicles:", updatedVehicles)
    setSelectedVehicles(updatedVehicles);
    onVehicleSelect(updatedVehicles);
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    (vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.registration_number.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedBranch ? vehicle.branch === selectedBranch : true)
  );

  const sortedVehicles = filteredVehicles.sort((a, b) =>
    a.branch.localeCompare(b.branch)
  );

  return (
    <div className="vehicle-search-dropdown">
      <label htmlFor="branchDropdown">Select Branch:</label>
      <select id="branchDropdown" value={selectedBranch} onChange={handleBranchChange}>
        <option value="">All</option>
        {branches.map((branch, index) => (
          <option key={index} 
          value={branch}>
            {branch}
          </option>
        ))}
      </select>

      <label htmlFor="searchInput">Search Vehicle:</label>
      <input
        type="text"
        id="searchInput"
        placeholder="Search by VIN or Registration Number"
        value={searchTerm}
        onChange={handleSearch}
      />

      <ul>
        {sortedVehicles.length > 0 ? (
          sortedVehicles.map((vehicle) => (
            <li key={vehicle.vin}>
              <input
                type="checkbox"
                checked={selectedVehicles.some((v) => v.vin === vehicle.vin)}
                onChange={() => handleVehicleSelection(vehicle)}
              />
              {vehicle.vin} - {vehicle.registration_number} ({vehicle.branch})
            </li>
          ))
        ) : (
          <li>No vehicles found.</li> 
        )}
      </ul>
    </div>
  );
};

export default VehicleSearchDropdown;
