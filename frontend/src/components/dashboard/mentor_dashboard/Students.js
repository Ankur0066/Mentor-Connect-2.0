import React, { useState, useEffect } from 'react';
import { getConnectedStudents } from '../../../services/api';
import '../../../styles/mentor_dashboard/Students.css';
import { FaUser } from 'react-icons/fa'; 

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getConnectedStudents();
      setStudents(response.students);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching connected students:', err);
      setError('Failed to fetch connected students');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="students-container">
      <h1 className="page-title">Connected Students</h1>
      {students.length === 0 ? (
        <p className="no-students">No connected students yet</p>
      ) : (
        <div className="students-list">
          {students.map((student, index) => (
            <div key={student._id} className="student-card">
              <div className="student-number">{index + 1}</div>
              <div className="student-info">
              <svg className="person-icon" viewBox="0 0 24 24">
    <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
  </svg>
                <div className="student-details">
                  <h3 className="student-name">{student.name}</h3>
                  <p className="student-email">{student.email}</p>
                </div>
              </div>
              <button className="view-profile-btn">View Profile</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Students;