import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import React from "react";
import { DateTimeProps } from "@/types";

const MyDatePicker: React.FC<DateTimeProps> = ({
  selected,
  onChange,
  name,
  inline,
  placeholderText,
  showTimeSelect,
  minDate,
  minTime,
  maxTime,
}) => {
  return (
    <div className="border-2 relative rounded-md w-full  text-inputText  border-inputColor focus:outline-4  bg-transparent  outline-inputColor outline-4  h-full">
      <DatePicker
        selected={selected}
        onChange={onChange}
        placeholderText={
          placeholderText ? placeholderText : "Click to select date"
        }
        className="w-full h-full px-2 rounded-md py-3 outline-4 outline-inputColor "
        name={name}
        inline={inline}
        showTimeSelect={showTimeSelect}
        showTimeSelectOnly={showTimeSelect}
        dateFormat={showTimeSelect ? "h:mm aa" : "dd-MM-yyyy"}
        timeIntervals={15}
        timeCaption="Time"
        minDate={minDate}
        minTime={minTime}
        maxTime={maxTime}
      />
      {showTimeSelect ? (
        <AiOutlineClockCircle className="text-inputColor absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
      ) : (
        <AiOutlineCalendar className="text-inputColor absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
      )}
    </div>
  );
};
export default MyDatePicker;
