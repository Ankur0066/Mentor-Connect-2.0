import React from 'react';
import './PersonalMeetingRoom.css';
import { useNavigate } from 'react-router-dom';

const MenteePersonalRoom = ({ userName = "User" }) => {
  const navigate = useNavigate();
  const meetingId = "user_2nuuPDolpTfJoHh8GtlSatRloCF";
  const inviteLink = `/meeting/${meetingId}?personal=true`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `Join my meeting: ${window.location.origin}${inviteLink}`
    );
    alert('Invitation link copied to clipboard!');
  };

  const handleStartMeeting = () => {
    navigate(`/mentee/dashboard/classes`);
  };

  return (
    <div className="meeting-room-card">
      <div className="meeting-room-header">
        <h2>Personal Meeting Room</h2>
      </div>
      
      <div className="meeting-room-body">
        <div className="meeting-info">
          <div className="info-row">
            <span className="info-label">Topic:</span>
            <span className="info-value">{userName}'s Meeting Room</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">Meeting ID:</span>
            <span className="info-value">{meetingId}</span>
          </div>
          
          <div className="info-row">
            <span className="info-label">Invite Link:</span>
            <span className="info-value">{inviteLink}</span>
          </div>
        </div>
        
        <div className="action-buttons">
          <button className="start-meeting-btn"  onClick={handleStartMeeting}>
            Start Meeting
          </button>
          <button 
            className="copy-invitation-btn"
            onClick={copyToClipboard}
          >
            Copy Invitation
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenteePersonalRoom;