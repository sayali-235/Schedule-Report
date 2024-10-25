import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import EditSchedule from './Component/EditSchedule';
import ScheduleReportModal from './Component/SchduleReportModal';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/edit-schedule" element={< EditSchedule />} />
      </Routes>
      <ScheduleReportModal/>
    </Router>
  );
};

export default App;
