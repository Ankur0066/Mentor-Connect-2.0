import React from "react";
import { Link } from "react-router-dom";
import SignupForm from "../../components/auth/SignupForm";
import "../../styles/auth.css";
import Footer from "../../components/footer";
// import Aside from '../../components/auth/Aside';
const SignupPage = () => {
  return (
    <>
     <div className="auth-page flex flex-col lg:flex-row items-start gap-10 px-4 lg:px-12 mt-10">
  {/* Signup Form Container */}
  <div className="auth-container w-full lg:w-1/2 bg-white shadow-md rounded-xl p-6 lg:pl-10">
    <h1 className="auth-title text-3xl font-bold text-gray-800 mb-6">Join MentorConnect</h1>
    <SignupForm />
    <div className="auth-footer mt-4 text-sm text-gray-600">
      Already have an account?{" "}
      <Link to="/login" className="auth-link text-indigo-600 hover:underline font-medium">
        Log in
      </Link>
    </div>
  </div>

  {/* Aside Container */}
  <div className="aside-container w-full lg:w-1/2 mt-10 lg:mt-0">
    <Aside />
  </div>
</div>

      <Footer />
    </>
  );
};

function Aside() {
  return (
    <div className="aside-container bg-white shadow-lg rounded-2xl p-6 md:p-10 max-w-5xl mx-auto my-10">
    <div className="aside-header space-y-8 p-10">
      <h2 className="text-3xl font-bold text-center text-gray-800">Join Our Community</h2>
      
      <section className="grid md:grid-cols-2 gap-10">
       
        <div className="features space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Why Choose Us?</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li><span className="font-medium text-gray-800">Expert Mentors</span> ✅</li>
            <li><span className="font-medium text-gray-800">Personalized Guidance</span> ✅</li>
            <li><span className="font-medium text-gray-800">Proven Success</span> ✅</li>
          </ul>
        </div>
  
    
        <div className="stats space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="stat-item bg-gray-100 p-4 rounded-lg shadow">
              <span className="number text-2xl font-bold text-indigo-600">10,000+</span>
              <p className="label text-sm text-gray-500">Users Helped</p>
            </div>
            <div className="stat-item bg-gray-100 p-4 rounded-lg shadow">
              <span className="number text-2xl font-bold text-indigo-600">500+</span>
              <p className="label text-sm text-gray-500">Mentors</p>
            </div>
            <div className="stat-item bg-gray-100 p-4 rounded-lg shadow">
              <span className="number text-2xl font-bold text-indigo-600">95%</span>
              <p className="label text-sm text-gray-500">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
  
    
      <div className="faq space-y-6 mt-8">
        <h2 className="text-2xl font-semibold text-gray-700">FAQ</h2>
        <div className="faq-item bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">How do I choose a mentor?</h3>
          <p className="text-gray-600 mt-1">Browse profiles and pick based on your goals.</p>
        </div>
        <div className="faq-item bg-gray-50 p-4 rounded-md border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">Is it free?</h3>
          <p className="text-gray-600 mt-1">Yes, signing up is free!</p>
        </div>
      </div>
    </div>
  </div>
  
  );
}
export default SignupPage;
