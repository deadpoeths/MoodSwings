import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameDay, isBefore } from 'date-fns';
import Sidebar from './Sidebar';
import './History.css';

function History() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loggedDates, setLoggedDates] = useState([]); // Replace this with fetched data
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/moods')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const parsedDates = data.map((item) => ({ ...item, date: new Date(item.date) }));
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

  const handleDateClick = (day) => {
    const details = loggedDates.find((loggedDay) => isSameDay(loggedDay.date, day));
    setSelectedDate(day);
    setSelectedDetails(details || { mood: 'No data', journal: 'No data', weather: 'No data' });
  };

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
              const isLogged = Array.isArray(loggedDates) && loggedDates.some((loggedDay) => isSameDay(loggedDay.date, day));
              const isPast = isBefore(day, new Date()) && !isLogged;
              const isFuture = isBefore(new Date(), day);

              return (
                <div
                  key={index}
                  className={`date ${isLogged ? 'logged' : ''} ${isPast ? 'missed' : ''} ${isFuture ? 'future' : ''}`}
                  onClick={() => handleDateClick(day)}
                >
                  {format(day, 'd')}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Details */}
        {selectedDate && (
          <div className="selected-details">
            <button className="close-button" onClick={() => setSelectedDate(null)}>×</button>
            <h2>Details for {format(selectedDate, 'MMMM d, yyyy')}</h2>
            <p><strong>Mood:</strong> {selectedDetails?.mood}</p>
            <p><strong>Weather:</strong> {selectedDetails?.weather}</p>
            <p><strong>Journal Entry:</strong> {selectedDetails?.journal}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
