import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import SummaryModal from "./SummaryModal";
import "./NextModal.css";
import { useLocation } from "react-router-dom";

const NextModal = (props) => {
  const { emailList, selectedReports, onBack, selectedVehicle } = props;

  const location = useLocation();
  const { schedule } = location.state || {}; // Get schedule from location state
  const isEditMode = Boolean(schedule);

  const [scheduleDate, setScheduleDate] = useState(null);
  const [reportType, setReportType] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [skipWeekends, setSkipWeekends] = useState(false);
  const [quarterOption, setQuarterOption] = useState("");
  const [yearOption, setYearOption] = useState("");
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [customDate, setCustomDate] = useState(null);
  const [time, setTime] = useState(false);

  console.log("props: ", props);

  useEffect(() => {
    if (isEditMode) {
      // Set initial values from the existing schedule only once, if editing
      setScheduleDate(
        schedule.scheduleDate
          ? moment(schedule.scheduleDate).format("DD MMM YYYY")
          : null
      );
      setReportType(schedule.reportType || null);
      setSelectedDay(schedule.selectedDay || "");
      setSkipWeekends(schedule.skipWeekends || false);
      setTime(schedule.time || false);
    }
  }, [isEditMode, schedule]);

  const handleDateChange = (date) => {
    setScheduleDate(date);
  };

  useEffect(() => {
    // Reset schedule date on report type change for fresh schedules
    if (!isEditMode) {
      setScheduleDate(null);
    }

    if (reportType === "yearly") {
      getLastDayOfCurrentYear();
      getFirstDayOfCurrentYear();
    } else if (reportType === "quarterly") {
      getLastDayOfCompletedQuarter();
      getFirstDayOfNextQuarter();
    }
  }, [reportType, isEditMode]);

  const handleTimeChange = (option) => {
    setTime(option);
  };
  const handleReportTypeChange = (option) => {
    setScheduleDate(null);
    setReportType(option);
    setSkipWeekends(false);
  };

  const handleSkipWeekendsToggle = () => {
    setSkipWeekends(!skipWeekends);
  };

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
    { label: "Weekly", value: "weekly" },
    { label: "Bi-Weekly", value: "biWeekly" },
    { label: "Monthly", value: "monthly" },
    { label: "Quarterly", value: "quarterly" },
    { label: "Yearly", value: "yearly" },
  ];

  const daysOfWeek = [
    { key: "Sunday", value: "sunday" },
    { key: "Monday", value: "monday" },
    { key: "Tuesday", value: "tuesday" },
    { key: "Wednesday", value: "wednesday" },
    { key: "Thursday", value: "thursday" },
    { key: "Friday", value: "friday" },
    { key: "Saturday", value: "saturday" },
  ];

  const timeOfSchedule = [
    { key: "9am", value: "9am" },
    { key: "5pm", value: "5pm" },
  ];

  function getNextDayOfWeek(selectedDay) {
    const daysOfWeek = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };

    const today = new Date();
    const todayDayOfWeek = today.getDay();

    const targetDay = daysOfWeek[selectedDay.toLowerCase()];

    if (targetDay === undefined) {
      return "Invalid day of the week!";
    }

    const daysUntilNext = (targetDay - todayDayOfWeek + 7) % 7 || 7;

    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysUntilNext);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return nextDate.toLocaleDateString("en-US", options);
  }

  const renderDayOptions = () => {
    const filteredDaysOfWeek = daysOfWeek.filter((day) =>
      skipWeekends ? day.key !== "Saturday" && day.key !== "Sunday" : true
    );

    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {filteredDaysOfWeek.map((day) => (
          <button
            key={day.key}
            onClick={() => {
              setSelectedDay(day.value);
              setScheduleDate(getNextDayOfWeek(day.value));
            }}
            className={`day-button ${
              selectedDay === day.value ? "selected" : ""
            }`}
          >
            {day.key}
          </button>
        ))}
      </div>
    );
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderCalendarForMonth = () => {
    const today = new Date();
    return (
      <div>
        <h3>Select Schedule Date:</h3>
        <DatePicker
          selected={scheduleDate}
          onChange={handleDateChange}
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
      {yearOption === "custom" && renderCalendarForMonth()}
    </div>
  );

  const setQuar = (option) => {
    if (option === "last-day-completed-quarter") {
      const lastDay = getLastDayOfCompletedQuarter();
      setScheduleDate(lastDay);
    } else if (option === "first-day-next-quarter") {
      const firstDay = getFirstDayOfNextQuarter();
      setScheduleDate(firstDay);
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
        <option value="last-day-completed-quarter">
          Last Day of Completed Quarter
        </option>
        <option value="first-day-next-quarter">
          First Day of Next Quarter
        </option>
        <option value="custom">Custom</option>
      </select>
      {quarterOption === "custom" && renderCalendarForMonth()}
    </div>
  );

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content">
          <div>
            <h3 className="title">Reports</h3>

            <ul className="selected-report">
              Selected Reports:
              {Object.keys(selectedReports).map(
                (key) =>
                  selectedReports[key] && (
                    <li key={key} className="sel-report-li">
                      {key} Report
                    </li>
                  )
              )}
            </ul>
          </div>

          <div>
            {selectedReports["Vehicle Wise"] && (
              <ul className="selected-vehicles">
                {" "}
                Selected Vehicles:
                {selectedVehicle?.selected.length > 0 ? (
                  selectedVehicle.selected.map((vehicle) => (
                    <li key={vehicle.vin} className="sel-vehicle-li">
                      {vehicle.vin} - {vehicle.registration_number} (
                      {vehicle.branch})
                    </li>
                  ))
                ) : (
                  <li>No Vehicles Found</li>
                )}
              </ul>
            )}
          </div>

          <div>
            <ul className="entered-emails">
              Entered Emails:{" "}
              {emailList.map((email) => (
                <li key={email} className="en-li">
                  {email}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p>Select Time Interval</p>
            <ul style={{ display: "flex", listStyleType: "none", padding: 0 }}>
              {timeOfSchedule.map((option) => (
                <li key={option.value} style={{ margin: "0 10px" }}>
                  <button
                    className={`time-button ${
                      time === option.value ? "selected" : ""
                    }`}
                    onClick={() => handleTimeChange(option.value)}
                  >
                    {option.key}
                  </button>
                </li>
              ))}
            </ul>

            {reportType && (
              <div>
                <input
                  type="radio"
                  value="skip-weekends"
                  checked={skipWeekends === true}
                  onChange={handleSkipWeekendsToggle}
                />
                <label className="skip-weekends">Skip Weekends: </label>
              </div>
            )}

            <label>
              <ul>
                {reportOptions.map((option) => (
                  <li key={option.value} className="in-radio">
                    <label>
                      <input
                        type="radio"
                        value={option.value}
                        checked={reportType === option.value}
                        onChange={() => {
                          handleReportTypeChange(option.value);
                        }}
                      />
                      {option.label}
                    </label>
                  </li>
                ))}
              </ul>
            </label>
          </div>

          {reportType === "weekly" || reportType === "biWeekly"
            ? renderDayOptions()
            : reportType === "monthly"
            ? renderCalendarForMonth()
            : reportType === "quarterly"
            ? getQuarterOptions()
            : reportType === "yearly"
            ? getYearOptions()
            : null}

          {scheduleDate && (
            <p>Scheduled Date: {moment(scheduleDate).format("MMMM Do YYYY")}</p>
          )}

          <div className="modal-actions">
            <button className="backn-button" onClick={handleBackClick}>
              Back
            </button>
            <button
              className="done-button"
              onClick={handleDoneClick}
              disabled={!selectedDay && !scheduleDate}
            >
              Done
            </button>
          </div>
        </div>
      </div>

      {showSummaryModal && (
        <SummaryModal
          emailList={emailList}
          selectedReports={selectedReports}
          selectedVehicle={selectedVehicle}
          scheduleDate={scheduleDate}
          time={time}
          skipWeekends={skipWeekends}
          reportType={reportType}
          selectedDay={selectedDay}
          onClose={() => setShowSummaryModal(false)}
          isEditMode={isEditMode}
          existingSchedule={isEditMode ? schedule : null}
        />
      )}
    </>
  );
};

export default NextModal;
