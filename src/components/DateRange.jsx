import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./components.css";
export default function DateRangeComponent({
  startDate = new Date(),
  endDate = new Date(),
  onDateChange = () => {},
}) {
  const ExampleCustomInput = forwardRef(
    ({ value, onClick, className }, ref) => (
      <div className="date-range-picker">
        <button className={`${className} mt-0.5`} onClick={onClick} ref={ref}>
          {value}
        </button>
        <span className="material-icons-outlined">date_range</span>
      </div>
    )
  );

  return (
    <DatePicker
      selectsRange={true}
      todayButton="Today"
      customInput={<ExampleCustomInput />}
      dateFormat="MM/dd/yyyy"
      startDate={startDate}
      endDate={endDate}
      monthsShown={2}
      onChange={onDateChange}
      maxDate={new Date()}
      showPreviousMonths
    />
  );
}
