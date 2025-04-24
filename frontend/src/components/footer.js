// components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Section = ({ title, items }) => (
  <div style={{ margin: '10px' }}>
    <h4 style={{ marginBottom: '10px', color: '#333' }}>{title}</h4>
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {items.map((item, index) => (
        <li key={index} style={{ margin: '5px 0', color: '#555' }}>
          <Link to={`/home/detail/${item.toLowerCase().replace(/ /g, '-')}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            {item}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const platformItems = [
    'Browse Mentors',
    'Book a Session',
    'Become a Mentor',
    'Mentorship for Teams',
    'Testimonials'
  ];

  const resourcesItems = [
    'Newsletter',
    'Books',
    'Perks',
    'Templates',
    'Career Paths',
    'Blog'
  ];

  const companyItems = [
    'About',
    'Case Studies',
    'Partner Program',
    'Code of Conduct',
    'Privacy Policy',
    'DMCA'
  ];

  const supportItems = [
    'FAQ',
    'Contact',
    'EXPLORE',
    'Groups',
    'Companies',
    'Fractional Executives',
    'Part-Time Experts'
  ];

  return (
    <footer style={{ 
      padding: '20px', 
      backgroundColor: '#fff', 
      textAlign: 'center',
      
      borderTop: '3px solid rgb(11, 7, 7)',
       borderRadius: '2rem !important'
     
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        flexWrap: 'wrap',
        marginBottom: '20px'
      }}>
        <Section title="PLATFORM" items={platformItems} />
        <Section title="RESOURCES" items={resourcesItems} />
        <Section title="COMPANY" items={companyItems} />
        <Section title="SUPPORT" items={supportItems} />
      </div>
      <div style={{ marginTop: '20px', color: '#777' }}>
        <p>© 2025 MentorCruise. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;