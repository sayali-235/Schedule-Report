import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import SummaryModal from './SummaryModal';
import './NextModal.css';


const NextModal = (props) => {
  const { emailList, selectedReports, onBack } = props;
  const [scheduleDate, setScheduleDate] = useState(null);
  const [reportType, setReportType] = useState();
  const [selectedDay, setSelectedDay] = useState("");
  const [skipWeekends, setSkipWeekends] = useState(false);
  const [quarterOption, setQuarterOption] = useState('last-day-completed-quarter');
  const [yearOption, setYearOption] = useState('last-day-year');
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  useEffect(() => {
    getLastDayOfCurrentYear();
    getFirstDayOfCurrentYear();
  }, [reportType]);

  const handleReportTypeChange = (option) => {
    setScheduleDate(null);
    setReportType(option);
  }

  const handleSkipWeekendsToggle = () => setSkipWeekends(!skipWeekends);

  const handleBackClick = () => {
    onBack();
  };

  const handleDoneClick = () => {
    setShowSummaryModal(true);
  };

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 6 || day === 0;
  };

  const daysOfWeek = [
    { key: 'Monday', value: 'monday' },
    { key: 'Tuesday', value: 'tuesday' },
    { key: 'Wednesday', value: 'wednesday' },
    { key: 'Thursday', value: 'thursday' },
    { key: 'Friday', value: 'friday' }
  ];

  const renderDayOptions = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {daysOfWeek.map((day) => (
        <div key={day.key}>
          <label>{day.key}</label>
          <input
            type="radio"
            value={day.value}
            name="day"
            checked={selectedDay === day.value}
            onChange={() => setSelectedDay(day.value)}
          />
        </div>
      ))}
    </div>
  );

  const renderCalendarForMonth = () => {
    const today = new Date();
    return (
      <div>
        <h3>Select Schedule Date:</h3>
        <DatePicker
          selected={scheduleDate}
          onChange={(date) => setScheduleDate(date)}
          filterDate={(date) => (skipWeekends ? !isWeekend(date) : true)}
          dateFormat="MMMM d, yyyy"
          showMonthYearPicker={false}
          showFullMonthYearPicker={true}
          minDate={today}
          maxDate={new Date(today.getFullYear(), 11, 31)}
          inline
        />
      </div>
    );
  };

  const getQuarterOptions = () => (
    <div>
      <select value={quarterOption} onChange={(e) => setQuarterOption(e.target.value)}>
        <option value="last-day-completed-quarter">Last Day of Completed Quarter</option>
        <option value="first-day-next-quarter">First Day of Next Quarter</option>
        <option value="custom">Custom</option>
      </select>
      {quarterOption === 'custom' && renderCalendarForMonth()}
    </div>
  );

  const setYear = (option) => {
    if(option === "last-day-year") {
      setScheduleDate(getLastDayOfCurrentYear());
    }
    
    if(option === "first-day-next-year") {
      setScheduleDate(getFirstDayOfCurrentYear())
    }
    
    if(option === "custom") {
      setScheduleDate(option);
    }
    // setYearOption(option);
  }

  const getYearOptions = () => (
    <div>
      <select value={yearOption} onChange={(e) => setYear(e.target.value)}>
        <option value="">--Select Option--</option>
        <option value="last-day-year">Last Day of the Year</option>
        <option value="first-day-next-year">First Day of Next Year</option>
        <option value="custom">Custom</option>
      </select>
      {yearOption === 'custom' && renderCalendarForMonth()}
    </div>
  );

  const reportOptions = [
    { label: 'Weekly', value: 'weekly' },
    { label: 'Bi-Weekly', value: 'biWeekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Quarterly', value: 'quarterly' },
    { label: 'Yearly', value: 'yearly' },
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getLastDayOfCurrentYear = () => {
    const date = new Date();
    const lastDay = new Date(date.getFullYear(), 11, 31);
  
    const day = lastDay.getDate();
    const month = monthNames[lastDay.getMonth()];
    const year = lastDay.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

  const getFirstDayOfCurrentYear = () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), 0, 1);
  
    const day = firstDay.getDate();
    const month = monthNames[firstDay.getMonth()];
    const year = firstDay.getFullYear();
  
    return `${day} ${month} ${year}`;
  };
  
  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Selected Reports and Emails</h3>
          <ul> Selected Reports:
            {Object.keys(selectedReports).map((key) => selectedReports[key] && <li key={key}>{key} Report</li>)}
          </ul>
          <ul> Entered Emails: {emailList.map((email) => <li key={email}>{email}</li>)}</ul>

          <div>
            <p> Select Time Interval</p>

            {
              (reportType === "monthly" || reportType === "weekly") &&
              <div>
                <input type="radio" checked={skipWeekends === true} onChange={handleSkipWeekendsToggle} />
                <label className='skip-weekends'>Skip Weekends: </label>
              </div>
            }
            <label>
              <ul>
                {/* Loop the radio buttons */}
                {reportOptions.map((option) => (
                  <li key={option.value} className='in-radio'>
                    <label>
                      <input type='radio'
                        value={option.value}
                        checked={reportType === option.value}
                        onChange={() => { handleReportTypeChange(option.value) }}
                      />
                      {option.label}
                    </label>
                    <br />
                  </li>
                ))}
              </ul>
            </label>

          </div>

          {reportType === 'weekly' || reportType === 'biWeekly' ? (
            renderDayOptions()
          ) : reportType === 'monthly' ? (
            renderCalendarForMonth()
          ) : reportType === 'quarterly' ? (
            getQuarterOptions()
          ) : reportType === 'yearly' ? (
            getYearOptions()
          ) : null}

          { scheduleDate && 
            <p>Scheduled Date: {moment(scheduleDate).format('MMMM Do YYYY')}</p>
          }

          <div className="modal-actions">
            <button className='backn-button' onClick={handleBackClick}>Back</button>
            <button className='done-button' onClick={handleDoneClick} disabled={!selectedDay}>Done</button>
          </div>
        </div>
      </div>

      {showSummaryModal && (
        <SummaryModal
          emailList={emailList}
          selectedReports={selectedReports}
          scheduleDate={scheduleDate}
          skipWeekends={skipWeekends}
          onClose={() => setShowSummaryModal(false)}
        />
      )}
    </>
  );
};

export default NextModal;
