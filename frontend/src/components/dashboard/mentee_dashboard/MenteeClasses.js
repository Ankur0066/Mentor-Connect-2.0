import React, { useState, useCallback } from 'react';
import VideoCall from '../../shared/VideoCall';
import { FiLink, FiVideo, FiArrowRight } from 'react-icons/fi';
import './MenteeClasses.css';

const MenteeClasses = () => {
  const [classLink, setClassLink] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  const handleJoinClass = (e) => {
    e.preventDefault();
    if (classLink) {
      setIsJoined(true);
    }
  };

  const handleEndCall = useCallback(() => {
    setIsJoined(false);
    setClassLink('');
  }, []);

  // Get current date and time
  const currentDate = new Date();
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  const formattedDateTime = currentDate.toLocaleString('en-US', options).split(',');

  return (
    <div className="mentee-classes-container">
      {!isJoined ? (
        <div className="class-join-card">
          <div className="header-section">
            <h1 className="main-title">
            "Learn, Grow, Succeed — Together"
            </h1>
            <div className="datetime">
              <div className="time">{formattedDateTime[3]}</div>
              <div className="date">{formattedDateTime.slice(0,3).join(',')}</div>
            </div>
          </div>

          <div className="actions-grid">
            <div className="action-card join-meeting">
              <div className="card-content">
                <div className="card-icon">
                  <FiVideo className="video-icon" />
                  <div className="pulse-effect"></div>
                </div>
                <h3>Join Class</h3>
                <p>via invitation link</p>
                <form onSubmit={handleJoinClass} className="class-link-form">
                  <div className="input-container">
                    <FiLink className="input-icon" />
                    <input
                      type="text"
                      value={classLink}
                      onChange={(e) => setClassLink(e.target.value)}
                      placeholder="Enter class code"
                      className="class-link-input"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="join-button"
                    disabled={!classLink}
                  >
                    Join Now
                    <FiArrowRight className="button-icon" />
                  </button>
                </form>
              </div>
            </div>

            <div className="action-card help-section">
              <div className="card-content">
                <h3>Need Help?</h3>
                <p>Contact your mentor for assistance</p>
                <div className="support-info">
                  <p>Email: support@learninghub.com</p>
                  <p>Phone: (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="video-call-wrapper">
          <VideoCall 
            roomId={classLink} 
            isMentor={false} 
            onEndCall={handleEndCall} 
          />
        </div>
      )}
    </div>
  );
};

export default MenteeClasses;