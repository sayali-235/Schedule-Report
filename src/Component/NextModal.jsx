import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import SummaryModal from './SummaryModal';  
import './NextModal.css';


const NextModal = (props) => {
  const { emailList, selectedReports, onBack } =props;
  const [scheduleDate, setScheduleDate] = useState(null);
  const [reportType, setReportType] = useState();
  const [skipWeekends, setSkipWeekends] = useState(false);
  const [quarterOption, setQuarterOption] = useState('last-day-completed-quarter');
  const [yearOption, setYearOption] = useState('last-day-year');  
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [isRadio, setIsRadio]=useState(false);  

  const handleReportTypeChange = (e) =>
     setReportType(e.target.value);
  
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

  const renderDayOptions = () => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
        <div key={day}>
          <label>{day}</label>
          <input type="radio"
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

  const getYearOptions = () => (
    <div>
      <select value={yearOption} onChange={(e) => setYearOption(e.target.value)}>
        <option value="last-day-year">Last Day of the Year</option>
        <option value="first-day-next-year">First Day of Next Year</option>
        <option value="custom">Custom</option>
      </select>
      {yearOption === 'custom' && renderCalendarForMonth()}  
    </div>
  );

  const reportOptions = [
    { label: 'Weekly', value: 'weekly' },
    { label: 'Bi-Weekly', value: 'Bi-weekly' },
    { label: 'Monthly', value: 'monthly'  },
    { label: 'Quarterly', value: 'quartely' },
    { label: 'Yearly', value: 'yearly'  },
  ];
  
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
          <div>
          <input type="radio" checked={skipWeekends === true} onChange={handleSkipWeekendsToggle} />
            <label className='skip-weekends'>Skip Weekends: </label>
            
          </div>   
            <label>
            <ul>
               {reportOptions.map((option) => (
                 <li key={option.value} className='in-radio'>
                 <label>
                 <input type='radio'
                   value={option.value}
                   checked={isRadio=== true}
                   onChange={(e)=>{handleReportTypeChange(e,option)}}
          />
          {option.label}
        </label>
        <br />
      </li>
    ))}
  </ul>
  </label>
            
</div>
           
          {reportType === 'weekly' || reportType === 'bi-weekly' ? (
            renderDayOptions()
          ) : reportType === 'monthly' ? (
            renderCalendarForMonth()
          ) : reportType === 'quarterly' ? (
            getQuarterOptions()
          ) : reportType === 'yearly' ? (
            getYearOptions()
          ) : null}

          {scheduleDate && <p>Scheduled Date: {moment(scheduleDate).format('MMMM Do YYYY')}</p>}

          
          <div className="modal-actions">
            <button className='backn-button' onClick={handleBackClick}>Back</button>
            <button className='done-button'onClick={handleDoneClick} disabled={!scheduleDate}>Done</button>  
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
