import React from 'react';
import './PreviousCalls.css';

const MenteePrevious = () => {
  const calls = [
    { type: "Instant Meeting",Mentorname: "Ankur", date: "4/25/2025, 1:45:18 AM" },
    { type: "Video Call",Mentorname: "ankur", date: "4/25/2025, 1:45:18 AM" },
    { type: "Chat",Mentorname: "Ankur", date: "3/21/2025, 5:39:05 PM" },
    { type: "Instant Meeting",Mentorname: "Chirag", date: "3/20/2025, 5:39:05 PM" }
    
  ];
  const getRandomDuration = () => {
    const hours = Math.floor(Math.random() * 4);  // Random hours between 0 and 3
    const minutes = Math.floor(Math.random() * 60);  // Random minutes between 0 and 59
    return `${hours} hours ${minutes} minutes`;
  };
  return (
    <div className="previous-calls-container">
      <h1 className="section-title">Previous Calls</h1>
      <div className="calls-grid">
        {calls.map((call, index) => (
          <div key={index} className="call-card">
            <div className="call-type">{call.type}</div>
            <div className="call-date">{call.date}</div>
            <div className="mentor-name">{call.Mentorname}</div>
            <div className="call-duration">{`Duration: ${getRandomDuration()}`}</div>
          
           
            <button className="rejoin-button">Rejoin</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenteePrevious;