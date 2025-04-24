// components/DetailPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/common.css'; // Import common CSS

const DetailPage = () => {
  const { item } = useParams(); // Get the item from the URL

  console.log('Item from URL:', item); // Debugging: Log the item

  // Basic information for each item
  const details = {
    'browse-mentors': {
      title: 'Browse Mentors',
      description: 'Find highly-vetted mentors to guide you in your career. Explore profiles, expertise, and book sessions.',
    },
    'book-a-session': {
      title: 'Book a Session',
      description: 'Schedule a one-on-one session with a mentor to discuss your goals and challenges.',
    },
    'become-a-mentor': {
      title: 'Become a Mentor',
      description: 'Join our platform as a mentor and share your expertise with aspiring professionals.',
    },
    'mentorship-for-teams': {
      title: 'Mentorship for Teams',
      description: 'Enhance your team\'s performance with tailored mentorship programs.',
    },
    'testimonials': {
      title: 'Testimonials',
      description: 'Read success stories from our users and see how mentorship has transformed their careers.',
    },
    // Add more items as needed
  };

  const detail = details[item] || { title: 'Not Found', description: 'The page you are looking for does not exist.' };

  return (
    <div className="container">
      <h1>{detail.title}</h1>
      <p>{detail.description}</p>
      <a href="/">Go back to Home</a>
    </div>
  );
};

export default DetailPage;