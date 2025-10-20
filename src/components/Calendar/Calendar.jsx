import { useState } from 'react';
import {
  generateCalendarDays,
  formatMonthYear,
  getPreviousMonth,
  getNextMonth,
  getToday,
  WEEKDAYS
} from '../../utils/dateUtils';
import './Calendar.css';

const Calendar = ({ selectedDate, onDateSelect, datesWithEntries }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || getToday());

  const calendarDays = generateCalendarDays(currentMonth);

  const handlePreviousMonth = () => {
    setCurrentMonth(getPreviousMonth(currentMonth));
  };

  const handleNextMonth = () => {
    setCurrentMonth(getNextMonth(currentMonth));
  };

  const handleToday = () => {
    const today = getToday();
    setCurrentMonth(today);
    onDateSelect(today);
  };

  const handleDateClick = (day) => {
    onDateSelect(day.date);
  };

  const hasEntry = (dateKey) => {
    return datesWithEntries.includes(dateKey);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePreviousMonth} className="nav-button">
          ◀
        </button>
        <h2 className="month-year">{formatMonthYear(currentMonth)}</h2>
        <button onClick={handleNextMonth} className="nav-button">
          ▶
        </button>
      </div>

      <button onClick={handleToday} className="today-button">
        今日
      </button>

      <div className="calendar-grid">
        {WEEKDAYS.map((weekday, index) => (
          <div key={index} className="weekday-header">
            {weekday}
          </div>
        ))}

        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${
              !day.isCurrentMonth ? 'other-month' : ''
            } ${day.isToday ? 'today' : ''} ${
              selectedDate && day.dateKey === selectedDate ? 'selected' : ''
            }`}
            onClick={() => handleDateClick(day)}
          >
            <span className="day-number">{day.date.getDate()}</span>
            {hasEntry(day.dateKey) && <span className="entry-dot">●</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
