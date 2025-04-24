import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../../styles/mentor_dashboard/Calendar.css';
import { scheduleClass, getUpcomingClasses, deleteClass } from '../../../services/api';

const MentorCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('10:00');
  const [scheduledClasses, setScheduledClasses] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedMentee, setSelectedMentee] = useState(
    () => localStorage.getItem('selectedMentee') || ''
  );

  const mentees = ['Mentee 1', 'Ankur', 'Chirag']; // Example mentee list




  useEffect(() => {
    fetchUpcomingClasses();
  }, []);

  const fetchUpcomingClasses = async () => {
    try {
      setLoading(true);
      const response = await getUpcomingClasses();
      setScheduledClasses(response.classes || []);
    } catch (err) {
      setError('Failed to fetch upcoming classes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setShowTimePicker(true);
  };

  const handleMenteeChange = (e) => {
    const mentee = e.target.value;
    setSelectedMentee(mentee);
    localStorage.setItem('selectedMentee', mentee); // persist selection
  };
  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSchedule = async () => {
    try {
      const newScheduledDate = new Date(date);
      const [hours, minutes] = time.split(':');
      newScheduledDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));

      await scheduleClass({ date: newScheduledDate, title: 'Scheduled Class' });
      await fetchUpcomingClasses();
      setShowTimePicker(false);
    } catch (err) {
      setError('Failed to schedule class');
      console.error(err);
    }
  };

  const handleDeleteClass = async (classId) => {
    try {
      await deleteClass(classId);
      await fetchUpcomingClasses();
    } catch (err) {
      setError('Failed to delete class');
      console.error(err);
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && scheduledClasses.find(scheduledClass => 
      new Date(scheduledClass.date).toDateString() === date.toDateString()
    )) {
      return 'scheduled-date';
    }
  };

  return (
   <div className="mentor-calendar-container">
  <h1 className="calendar-title">Schedule Your Classes</h1>
  
  <div className="calendar-grid">
    {/* Date Picker Card */}
    <div className="calendar-card">
      <div className="card-header">
        <span className="header-icon">📅</span>
        Select Date
      </div>
      <div className="card-content">
        <Calendar 
          onChange={handleDateChange} 
          value={date}
          minDate={new Date()}
          tileClassName={tileClassName}
          className="custom-calendar"
        />
      </div>
    </div>
    
    {/* Time Picker Card */}
    {showTimePicker && (
      <div className="calendar-card">
        <div className="card-header">
          <span className="header-icon">⏰</span>
          Select Time
        </div>
        <div className="card-content time-picker-content">
          <p className="selected-date-text">for {date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
          <input
            type="time"
            value={time}
            onChange={handleTimeChange}
            className="custom-time-picker"
          />
          <div>
     
          <select
  value={selectedMentee}
  onChange={handleMenteeChange}
  className="custom-mentee-selector"
>
  <option value="">Select Mentee</option>
  {mentees.map((mentee, index) => (
    <option key={index} value={mentee}>
      {mentee}
    </option>
  ))}
</select>

    </div>
          <button onClick={handleSchedule} className="schedule-btn">
            Schedule Class
            <span className="btn-icon">✓</span>
          </button>
        </div>
      </div>
    )}
  </div>
  
  {/* Upcoming Classes Card */}
  <div className="calendar-card scheduled-classes">
    <div className="card-header">
      <span className="header-icon">📚</span>
      Upcoming Classes
    </div>
    <div className="card-content classes-content">
   

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading scheduled classes...</p>
        </div>
      ) : error ? (
        <div className="error-state">
          <span className="error-icon">⚠️</span>
          <p>Error: {error}</p>
        </div>
      ) : scheduledClasses.length > 0 ? (
        <ul className="classes-list">
          {scheduledClasses.map((scheduledClass) => (
            <li key={scheduledClass._id} className="class-item">
          <p style={{ color: 'white', padding: '10px', margin: '10px' }}>{selectedMentee}</p>



              <div className="class-info">
              
                <span className="class-time">
                  {new Date(scheduledClass.date).toLocaleString([], {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                  })}
                </span>
               
              </div>
              <h2 className="class-status">Scheduled</h2>
              <button
  onClick={() => handleDeleteClass(scheduledClass._id)}
  className="delete-btn"
  aria-label="Delete class"
  style={{ backgroundColor: 'blue', color: 'white' }}
>
  <span className="material-icons">Delete</span> 
</button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-state">
          <span className="empty-icon">📅</span>
          <p>No upcoming classes scheduled</p>
          <p className="empty-subtext">Use the calendar to schedule your first class!</p>
        </div>
      )}
    </div>
  </div>
</div>
  );
};

export default MentorCalendar;