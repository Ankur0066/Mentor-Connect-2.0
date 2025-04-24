import React from "react";
import "../../styles/CommonHome.css";

const CommonHome = () => {
  return (
    <div className="common-home">
      <h1 className="main-heading">Welcome to MentorConnect</h1>
      <p className="subtitle">Connecting Mentors and Mentees for Success</p>
      <div className="features">
        <div className="feature">
          <h2>Find Your Mentor</h2>
          <p>Connect with experienced professionals in your field</p>
        </div>
        <div className="feature">
          <h2>Share Your Knowledge</h2>
          <p>Become a mentor and help others grow</p>
        </div>
        <div className="feature">
          <h2>Grow Your Skills</h2>
          <p>Learn from the best and advance your career</p>
        </div>
      </div>

      <div>
        <h2 className="featuress">Features</h2>
        {/* <p className="subtitle">Communication ,Flexible Sessions,Video</p> */}
        <div className="features">
          <div className="feature">
            <div className="feature1">
              <h2>Chat at ease</h2>
              <p>Instant messaging with mentors</p>
            </div>
          </div>
          <div className="feature">
            <h2>Flexible Sessions</h2>
            <p>Schedule and track meetings</p>
          </div>
          <div className="feature">
            <h2>Webrtc Video</h2>
            <p>Seamless one-on-one mentoring</p>
          </div>
        </div>
      </div>

      {/* eplore section starting */}

      <div>
        <h2 className="featuress">Explore </h2>
        {/* <p className="subtitle">Communication ,Flexible Sessions,Video</p>   */}
        <div className="features">
          <div className="feature">
            <h2>Tech Mentor</h2>
            <p> Build and grow in the tech world</p>
          </div>
          <div className="feature">
            <h2>Carrier </h2>
            <p>Unlock your full professional potential.</p>
          </div>
          <div className="feature">
            <h2>Education</h2>
            <p>Guide students to academic success.</p>
          </div>
          <div className="feature">
            <h2>More than 1.3K Mentors ...</h2>
            <p>Best experts from all Industries</p>
          </div>
        </div>
      </div>

      {/* staring wiht the dumy mentors data */}
      <div className="main-mentors">
        <h2 className="new-featuress">Mentors </h2>
        {/* <p className="subtitle">Communication ,Flexible Sessions,Video</p>   */}
        <div className="new-features">
          
          <div className="new-feature">
            <div className="mentor-img">
              here is the img of mentor
              </div>
              <div>
              <h2>Tech Mentor</h2>
              <p> Build and grow in the tech world</p>
              
            </div>
           
          </div>

          <div className="new-feature">
            <div className="mentor-img">
              here is the img of mentor
              </div>
              <div>
              <h2>Career </h2>
              <p> Build and grow in the tech world</p>
              
            </div>
           
          </div>
          <div className="new-feature">
            <div className="mentor-img">
              here is the img of mentor
              </div>
              <div>
              <h2>Design </h2>
              <p> Build and grow in the tech world</p>
              
            </div>
           
          </div>
          <div className="new-feature">
            <div className="mentor-img">
              here is the img of mentor
              </div>
              <div>
              <h2>Commerce </h2>
              <p> Build and grow in the tech world</p>
              
            </div>
           
          </div>  
        </div>
      </div>
      

      <button className="cta-button">Become a Mentor/Mentee </button>
    </div>
  );
};

export default CommonHome;
