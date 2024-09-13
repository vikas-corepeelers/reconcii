import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateRangeComponent({
    startDate= new Date(), 
    endDate = new Date(), 
    onDateChange = () => {}
}) {

//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());

//   const onChange = (dates) => {
//     const [start, end] = dates;
//     setStartDate(start);
//     setEndDate(end);
//   };

  const ExampleCustomInput = forwardRef(
    ({ value, onClick, className }, ref) => (
      <div className="p-2 flex gap-2 items-center rounded-md bg-white text-Text-secondary font-Roboto">
        <span className="material-icons-outlined">date_range</span>
        <button className={`${className} mt-0.5`} onClick={onClick} ref={ref}>
          {value}
        </button>
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
