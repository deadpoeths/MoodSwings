import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameDay, isBefore } from 'date-fns';
import Sidebar from './Sidebar';
import './History.css';

function History() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loggedDates, setLoggedDates] = useState([]); // Replace this with fetched data

  useEffect(() => {
    fetch('http://localhost:5000/api/moods')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const parsedDates = data.map((item) => new Date(item));
          setLoggedDates(parsedDates);
        } else {
          console.error('Unexpected data format:', data);
          setLoggedDates([]);
        }
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, []);



  const startDate = startOfMonth(currentMonth);
  const endDate = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="app">
      <Sidebar />
      <div className="history-content">
        <h1 className="history-title">Mood History</h1>
        <div className="calendar-container">
          {/* Month Navigation */}
          <div className="calendar-header">
            <button onClick={prevMonth} className="nav-arrow">&lt;</button>
            <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
            <button onClick={nextMonth} className="nav-arrow">&gt;</button>
          </div>

          {/* Day Names */}
          <div className="calendar-row">
            {dayNames.map((day, index) => (
              <div key={index} className="day">{day}</div>
            ))}
          </div>

          {/* Calendar Dates */}
          <div className="calendar-dates">
            {/* Empty cells for alignment */}
            {Array(getDay(startDate) || 7 - 1).fill(null).map((_, index) => (
              <div key={`empty-${index}`} className="empty-date"></div>
            ))}

            {days.map((day, index) => {
              const isLogged = Array.isArray(loggedDates) && loggedDates.some((loggedDay) => isSameDay(loggedDay, day));
              const isPast = isBefore(day, new Date()) && !isLogged;
              const isFuture = isBefore(new Date(), day);

              return (
                <div
                  key={index}
                  className={`date ${isLogged ? 'logged' : ''} ${isPast ? 'missed' : ''} ${isFuture ? 'future' : ''}`}
                >
                  {format(day, 'd')}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
