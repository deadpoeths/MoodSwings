import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths, isSameDay, isBefore } from 'date-fns';
import Sidebar from './Sidebar';
import './History.css';

// Mood and Weather label mappings
const moodLabels = {
  1: 'Happy',
  2: 'Sad',
  3: 'Angry',
  4: 'Joyful',
  5: 'Stressed',
  6: 'Content',
  7: 'Annoyed',
  8: 'Cheeky',
  9: 'Fearful',
  10: 'Irritated',
  11: 'Loving',
  12: 'Disgusted',
  13: 'Tired',
  14: 'Excited',
  15: 'Surprised',
};

const weatherLabels = {
  1: 'Sunny',
  2: 'Cloudy',
  3: 'Rainy',
  4: 'Snowy',
  5: 'Foggy',
  6: 'Windy',
};

function History() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loggedDates, setLoggedDates] = useState([]); // Dates with logged moods
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Popup visibility

  // Fetch mood entries from the API
  useEffect(() => {
    const token = localStorage.getItem('token');  // Retrieve the token from localStorage
  
    fetch(`${process.env.REACT_APP_API_URL}/api/moods`, {
      headers: {
        'Authorization': `Bearer ${token}`  // Add the token to the Authorization header
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const parsedDates = data.map((item) => ({
            ...item,
            date: new Date(item.timestamp),
            weather: item.weather ? [item.weather] : [],  // Ensure weather is an array
            moods: item.moods || [],  // Ensure moods is an array
            entry: item.entry || ''  // Ensure entry is a string
          }));
          setLoggedDates(parsedDates);  // Set the logged dates
        } else {
          console.error('Unexpected data format:', data);
          setLoggedDates([]);  // Set to empty if data format is unexpected
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

    // Map mood and weather IDs to their respective labels
    const moodLabelsList = details ? details.moods.map(moodId => moodLabels[moodId]).join(', ') : 'No data';
    const weatherLabelsList = details ? details.weather.map(weatherId => weatherLabels[weatherId]).join(', ') : 'No data';

    setSelectedDetails({
      mood: moodLabelsList, // Set mood labels as string
      journal: details ? details.entry : 'No data', // Use default if no entry found
      weather: weatherLabelsList // Set weather labels as string
    });

    setShowPopup(true); // Show the popup when a date is clicked
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
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
              const isLogged = loggedDates.some((loggedDay) => isSameDay(loggedDay.date, day));
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
        {showPopup && selectedDetails && (
          <div className="history-popup">
            <span className="history-popup-close" onClick={closePopup}>
              &times;
            </span>
            <h2>Details for {format(selectedDate, 'MMMM d, yyyy')}</h2>
            <p><strong>Mood:</strong> {selectedDetails.mood}</p>
            <p><strong>Weather:</strong> {selectedDetails.weather}</p>
            <p><strong>Journal Entry:</strong> {selectedDetails.journal}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
