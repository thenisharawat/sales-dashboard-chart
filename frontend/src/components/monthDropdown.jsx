// monthDropdown.jsx
import React from "react";

const MonthDropdown = ({ onSelectMonth, selectedMonth }) => {
  const handleChange = (event) => {
    onSelectMonth(event.target.value);
  };
  return (
    <div className="App">
      <form className="container">
        <h4>Select Month: </h4>
        <select
          name="months"
          defaultValue={"MARCH"}
          onChange={handleChange}
          className="months"
          style={{ width: "auto" }}
        >
          <option value="JANUARY">JANUARY</option>
          <option value="FEBRUARY">FEBRUARY</option>
          <option value="MARCH" selected>
            MARCH
          </option>
          <option value="APRIL">APRIL</option>
          <option value="MAY">MAY</option>
          <option value="JUNE">JUNE</option>
          <option value="JULY">JULY</option>
          <option value="AUGUST">AUGUST</option>
          <option value="SEPTEMBER">SEPTEMBER</option>
          <option value="OCTOBER">OCTOBER</option>
          <option value="NOVEMBER">NOVEMBER</option>
          <option value="DECEMBER">DECEMBER</option>
        </select>
      </form>
    </div>
  );
};

export default MonthDropdown;
