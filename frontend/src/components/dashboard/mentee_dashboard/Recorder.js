import React, { useState } from 'react';
import './Recordings.css';

const Recorder = () => {
  // Using online placeholder services
  const [recordings] = useState([
    {
      id: 1,
      title: "Introduction to React",
      date: "April 25, 2025",
      duration: "45:30",
      fileUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail: "https://placehold.co/400x225?text=React+Intro"
    },
    {
      id: 2,
      title: "State Management",
      date: "April 24, 2025",
      duration: "32:15",
      fileUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnail: "https://placehold.co/400x225?text=State+Mgmt"
    }
  ]);

  const [selectedRecording, setSelectedRecording] = useState(null);

  const handlePlayRecording = (recording) => {
    setSelectedRecording(recording);
  };

  const closeModal = () => {
    setSelectedRecording(null);
  };

  return (
    <div className="recordings-container">
      <h1 className="section-title">Your Recorded Sessions</h1>
      
      <div className="recordings-grid">
        {recordings.map((recording) => (
          <div key={recording.id} className="recording-card">
            <div className="thumbnail-container">
              <img 
                src={recording.thumbnail} 
                alt={recording.title}
                className="recording-thumbnail"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/400x225?text=Thumbnail+Missing';
                }}
              />
              <span className="duration-badge">{recording.duration}</span>
            </div>
            <div className="recording-details">
              <h3 className="recording-title">{recording.title}</h3>
              <p className="recording-date">{recording.date}</p>
              <button 
                className="view-button"
                onClick={() => handlePlayRecording(recording)}
              >
                View Recording
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedRecording && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>×</button>
            <h2>{selectedRecording.title}</h2>
            <video 
              controls 
              className="video-player"
              key={selectedRecording.fileUrl} // Force re-render on change
            >
              <source 
                src={selectedRecording.fileUrl} 
                type="video/mp4" 
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recorder;