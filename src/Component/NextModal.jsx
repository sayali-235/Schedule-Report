import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import SummaryModal from './SummaryModal';
import './NextModal.css';

const NextModal = (props) => {
  const { emailList=[], selectedReports={}, onBack,  onVehicleSelect=[] } = props;
  const [scheduleDate, setScheduleDate] = useState(null);
  const [reportType, setReportType] = useState();
  const [selectedDay, setSelectedDay] = useState("");
  const [skipWeekends, setSkipWeekends] = useState(false);
  const [quarterOption, setQuarterOption] = useState("");
  const [yearOption, setYearOption] = useState("");
  const [showSummaryModal, setShowSummaryModal] = useState(false);

const [customDate, setCustomDate] =useState(null)

  useEffect(() => {
     
    if (reportType === 'yearly') {
      getLastDayOfCurrentYear();
      getFirstDayOfCurrentYear();
    } else if (reportType === 'quarterly') {
      getLastDayOfCompletedQuarter();
      getFirstDayOfNextQuarter();
    }
  }, [reportType]);

  const handleReportTypeChange = (option) => {
    setScheduleDate(null);
    setReportType(option);
  };

  const handleSkipWeekendsToggle = () => {
    setSkipWeekends(!skipWeekends);
  }

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

  const reportOptions = [
    { label: 'Weekly', value: 'weekly' },
    { label: 'Bi-Weekly', value: 'biWeekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Quarterly', value: 'quarterly' },
    { label: 'Yearly', value: 'yearly' }
  ];
  
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
  
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

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

  
  const setYear = (option) => {
    if (option === "last-day-year") {
      const lastDay = getLastDayOfCurrentYear();
      setScheduleDate(lastDay);
    }
    
    if (option === "first-day-next-year") {
      const firstDay = getFirstDayOfCurrentYear();
      setScheduleDate(firstDay);
    }
    
    if (option === "custom") {
      setScheduleDate(customDate);
    }
    
    setYearOption(option);
  };
  
  const getLastDayOfCurrentYear = () => {
    const date = new Date();
    const lastDay = new Date(date.getFullYear(), 11, 31);
    const day = lastDay.getDate();
    const month = monthNames[lastDay.getMonth()];
    const year = lastDay.getFullYear();
    return `${day} ${month} ${year}`;
  };
  
  const getFirstDayOfCurrentYear = () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), 0, 1);
    const day = firstDay.getDate();
    const month = monthNames[firstDay.getMonth()];
    const year = firstDay.getFullYear();
    return `${day} ${month} ${year}`;
  };
  
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

  //Quarterly
  const setQuar = (option) => {
    if (option === "last-day-completed-quarter") {
      const lastDay=getLastDayOfCompletedQuarter()
      setScheduleDate( lastDay);
    } else if (option === "first-day-next-quarter") {
      const firstDay=getFirstDayOfNextQuarter()
      setScheduleDate( firstDay);
    } else if (option === "custom") {
      setScheduleDate(customDate);
    }
    setQuarterOption(option);
  };

  const getLastDayOfCompletedQuarter = () => {
    const date = new Date();
    const currentQuarter = Math.floor((date.getMonth() + 3) / 3);
    const lastQuarterMonth = (currentQuarter - 1) * 3;
    const lastDay = new Date(date.getFullYear(), lastQuarterMonth, 0);
    const day = lastDay.getDate();
    const month = monthNames[lastDay.getMonth()];
    const year = lastDay.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const getFirstDayOfNextQuarter = () => {
    const date = new Date();
    const currentQuarter = Math.floor((date.getMonth() + 3) / 3);
    const nextQuarterMonth = currentQuarter * 3;
    const firstDay = new Date(date.getFullYear(), nextQuarterMonth, 1);
    const day = firstDay.getDate();
    const month = monthNames[firstDay.getMonth()];
    const year = firstDay.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const getQuarterOptions = () => (
    <div>
      <select value={quarterOption} onChange={(e) => setQuar(e.target.value)}>
      <option value="">--Select Option--</option>
        <option value="last-day-completed-quarter">Last Day of Completed Quarter</option>
        <option value="first-day-next-quarter">First Day of Next Quarter</option>
        <option value="custom">Custom</option>
      </select>
      {quarterOption === 'custom' && renderCalendarForMonth()}
    </div>
  );


  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Selected Reports and Emails</h3>

          <ul>Selected Reports:
            {Object.keys(selectedReports).map((key) => selectedReports[key] && <li key={key}>{key} Report</li>)}
          </ul>

           <ul> Selected Vehicles:
              {onVehicleSelect.length > 0 ?
              (onVehicleSelect.map(vehicle =>(
                <li key={vehicle.vin}>
                  {vehicle.vin}-{vehicle.registration_number} ({vehicle.branch})
                </li>
              ))
            ):(
              <li>No Vehicles Found</li>
            )}
           </ul>

           {/* <ul> Selected Vehicles:
              {selectedVehicles.map(vehicle =>(
                <li key={vehicle.vin}>
                  {vehicle.vin}-{vehicle.registration_number} ({vehicle.branch})
                </li>
              ))
            }
           </ul> */}

          <ul>Entered Emails: {emailList.map((email) => <li key={email}>{email}</li>)}</ul>

          <div>
            <p>Select Time Interval</p>
            {(reportType === "monthly" ||   reportType ==="yearly" || reportType === "quarterly") && (
              <div>
                <input type="radio" value='skip-weekends' checked={skipWeekends === true} onChange={handleSkipWeekendsToggle} />
                <label className='skip-weekends'>Skip Weekends: </label>
              </div>
            )}

            <label>
              <ul>
                {reportOptions.map((option) => (
                  <li key={option.value} className='in-radio'>
                    <label>
                      <input
                        type='radio'
                        value={option.value}
                        checked={reportType === option.value}
                        onChange={() => { handleReportTypeChange(option.value); }}
                      />
                      {option.label}
                    </label>
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

          {scheduleDate && (
            <p>Scheduled Date: {moment(scheduleDate).format('MMMM Do YYYY')}</p>
          )}

          <div className="modal-actions">
            <button className='backn-button' onClick={handleBackClick}>Back</button>
            <button className='done-button' onClick={handleDoneClick} disabled={!selectedDay && !scheduleDate}>Done</button>
          </div>
        </div>
      </div>

      {showSummaryModal && (
        <SummaryModal
          emailList={emailList}
          selectedReports={selectedReports}
          scheduleDate={scheduleDate}
          selectedDay={selectedDay}
          skipWeekends={skipWeekends}
          onClose={() => setShowSummaryModal(false)}
        />
      )}
    </>
  );
};

export default NextModal;