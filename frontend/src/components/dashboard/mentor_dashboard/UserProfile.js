import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { createMentorProfile, getMentorProfile, updateMentorProfile } from '../../../services/api';
import '../../../styles/mentor_dashboard/UserProfile.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    teachingLanguage: '',
    highestDegree: '',
    subjectExpertise: '',
    institute: '',
    bio: '',
    achievements: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);

  const degrees = ['Bachelors', 'Masters', 'PhD', 'Diploma'];
  const subjects = [
    'Design',
    'Engineering',
    'Business',
    'IT',
    'Marketing',
    'Life Science',
    'Law',
    'Medicine',
    'Nursing',
    'Pharmacy',
    'Social Work',
    'Teaching',
    'Computer Science',
    'Mentoring Website'
  ];
  
  const selectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#2a2a2a',
      borderColor: '#4a90e2',
      '&:hover': {
        borderColor: '#357abd',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#2a2a2a',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#4a90e2' : state.isFocused ? '#3a3a3a' : '#2a2a2a',
      color: '#fff',
      '&:active': {
        backgroundColor: '#4a90e2',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    input: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#b3b3b3',
    }),
  };

  useEffect(() => {
    fetchMentorProfile();
  }, []);

  const fetchMentorProfile = async () => {
    try {
      setIsLoading(true);
      const data = await getMentorProfile();
      if (data) {
        setProfile(data);
        setProfileExists(true);
      }
    } catch (error) {
      console.error('Error fetching mentor profile:', error);
      setProfileExists(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profile.name) newErrors.name = 'Name is required';
    if (!profile.age) newErrors.age = 'Age is required';
    if (!profile.teachingLanguage) newErrors.teachingLanguage = 'Teaching language is required';
    if (!profile.highestDegree) newErrors.highestDegree = 'Highest degree is required';
    if (!profile.subjectExpertise) newErrors.subjectExpertise = 'Subject expertise is required';
    if (!profile.institute) newErrors.institute = 'Institute is required';
    if (!profile.bio) newErrors.bio = 'Bio is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (profileExists) {
          await updateMentorProfile(profile);
          alert('Profile updated successfully!');
        } else {
          await createMentorProfile(profile);
          setProfileExists(true);
          alert('Profile created successfully!');
        }
      } catch (error) {
        console.error('Error saving mentor profile:', error);
        alert('Failed to save profile. Please try again.');
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <motion.div 
      className="user-profile-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="user-profile-form">
  <h2>{profileExists ? 'Update Your Profile' : 'Complete Your Profile'}</h2>

  <label>Full Name</label>
  <motion.input 
    whileFocus={{ scale: 1.02 }}
    type="text" 
    name="name" 
    placeholder="Full Name" 
    value={profile.name} 
    onChange={handleInputChange} 
    required 
  />
  {errors.name && <span className="error">{errors.name}</span>}

  <label>Age</label>
  <motion.input 
    whileFocus={{ scale: 1.02 }}
    type="number" 
    name="age" 
    placeholder="Age" 
    value={profile.age} 
    onChange={handleInputChange} 
    required 
  />
  {errors.age && <span className="error">{errors.age}</span>}

  <label>Teaching Language</label>
  <motion.input 
    whileFocus={{ scale: 1.02 }}
    type="text" 
    name="teachingLanguage" 
    className="subject-select"
    placeholder="Teaching Language" 
    value={profile.teachingLanguage} 
    onChange={handleInputChange} 
    required 
  />
  {errors.teachingLanguage && <span className="error">{errors.teachingLanguage}</span>}

  <label>Highest Degree</label>
  <Select
    options={degrees.map(degree => ({ value: degree, label: degree }))}
    value={{ value: profile.highestDegree, label: profile.highestDegree }}
    onChange={(selectedOption) => handleInputChange({ target: { name: 'highestDegree', value: selectedOption.value } })}
    placeholder="Select Highest Degree"
    className="react-select-container"
    classNamePrefix="react-select"
    styles={{
      control: (provided) => ({
        ...provided,
        backgroundColor: '#2a2a2a',
        borderColor: '#4a90e2',
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: '#2a2a2a',
      }),
    }}
  />
  {errors.highestDegree && <span className="error">{errors.highestDegree}</span>}

  <label>Subject Expertise</label>
  <Select
    options={subjects.map(subject => ({ value: subject, label: subject }))}
    value={profile.subjectExpertise ? { value: profile.subjectExpertise, label: profile.subjectExpertise } : null}
    onChange={(selectedOption) => handleInputChange({ target: { name: 'subjectExpertise', value: selectedOption?.value || '' } })}
    placeholder="Select Subject Expertise"
    className="react-select-container"
    classNamePrefix="react-select"
    styles={selectStyles}
  />
  {errors.subjectExpertise && <span className="error">{errors.subjectExpertise}</span>}

  <label>Institute of Highest Degree</label>
  <motion.input 
    whileFocus={{ scale: 1.02 }}
    type="text" 
    name="institute" 
    placeholder="Institute of Highest Degree" 
    value={profile.institute} 
    onChange={handleInputChange} 
    required 
  />
  {errors.institute && <span className="error">{errors.institute}</span>}

  <label>Your Bio</label>
  <motion.textarea 
    whileFocus={{ scale: 1.02 }}
    name="bio" 
    placeholder="Your Bio" 
    value={profile.bio} 
    onChange={handleInputChange} 
    required 
  />
  {errors.bio && <span className="error">{errors.bio}</span>}

  <label>Your Achievements</label>
  <motion.textarea 
    whileFocus={{ scale: 1.02 }}
    name="achievements" 
    placeholder="Your Achievements" 
    value={profile.achievements} 
    onChange={handleInputChange} 
  />

  {/* New Section */}
  <label>Years of Experience</label>
  <motion.input 
    whileFocus={{ scale: 1.02 }}
    type="number" 
    name="yearsOfExperience" 
    placeholder="Years of Experience" 
    value={profile.yearsOfExperience} 
    onChange={handleInputChange} 
    required 
  />
  {errors.yearsOfExperience && <span className="error">{errors.yearsOfExperience}</span>}

  <label>Current Job Title & Company</label>
  <motion.input 
    whileFocus={{ scale: 1.02 }}
    type="text" 
    name="currentJobTitle" 
    placeholder="Current Job Title & Company" 
    value={profile.currentJobTitle} 
    onChange={handleInputChange} 
    required 
  />
  {errors.currentJobTitle && <span className="error">{errors.currentJobTitle}</span>}

  <label>Availability (Hours per week)</label>
  <motion.input 
    whileFocus={{ scale: 1.02 }}
    type="number" 
    name="availability" 
    placeholder="Availability (Hours per week)" 
    value={profile.availability} 
    onChange={handleInputChange} 
    required 
  />
  {errors.availability && <span className="error">{errors.availability}</span>}

  <label>Preferred Communication Method</label>
  <Select
    options={[
      { value: 'Email', label: 'Email' },
      { value: 'Call', label: 'Call' },
      { value: 'Video', label: 'Video' }
    ]}
    value={profile.preferredCommunicationMethod ? { value: profile.preferredCommunicationMethod, label: profile.preferredCommunicationMethod } : null}
    onChange={(selectedOption) => handleInputChange({ target: { name: 'preferredCommunicationMethod', value: selectedOption?.value || '' } })}
    placeholder="Select Preferred Communication Method"
    className="react-select-container"
    classNamePrefix="react-select"
    styles={selectStyles}
  />
  {errors.preferredCommunicationMethod && <span className="error">{errors.preferredCommunicationMethod}</span>}

  <motion.button 
    type="submit" 
    className="submit-button"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {profileExists ? 'Update Profile' : 'Create Profile'}
  </motion.button>
</form>


    </motion.div>
  );
};

export default UserProfile;