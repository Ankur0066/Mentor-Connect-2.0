import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import Footer from '../../components/footer';
import '../../styles/auth.css';
import '../../index.css';
const LoginPage = () => {
  return (
    <>
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Welcome Back</h1>
        <LoginForm />
        <div className="auth-footer">
          Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link>
        </div>
      </div>
      <div className="login-aside">
      <h2>Mentors at your fingertips</h2>
      <p>We've got you covered. We have mentors on hand to help you get through the tough times.</p>
      <p>Join today and start your mentor journey.</p>
     
       <div class="features">
        <h2>Why Choose Us?</h2>
        
        <ul>
            <li>✅ Expert Mentors</li>
            <li>✅ Personalized Guidance</li>
            <li>✅ Proven Success</li>
        </ul>
    </div>
    <div class="features">
    <h2 className='underline text-5xl bg-red-300 !important'> Features</h2>
      <ul>
        <li>✅ One-to-One Video Session</li> 
        <li>✅ Schedule a Meeting at your convenience</li>
        <li>✅ Chat with Mentors</li>
        <li>✅ Get notes from Mentors</li>
      </ul>

    </div>
     

    </div>
   
    </div>
     <Footer />
     </>
  );
};

export default LoginPage;