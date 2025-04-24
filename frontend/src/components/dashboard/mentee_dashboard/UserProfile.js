import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { createMenteeProfile, getMenteeProfile, updateMenteeProfile } from '../../../services/api';
import '../../../styles/mentee_dashboard/UserProfile.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    currentLevel: '',
    institution: '',
    interestedSubjects: []
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);

  const levels = [
    'Undergraduate Student',
    'Postgraduate Student',
    'Working Professional',
    'Early Career Professional',
    'Mid-Level Professional',
    'Senior Professional',
    'Career Switcher',
    'Freelancer',
    'Entrepreneur',
    'Academic Researcher'
  ];
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
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: '#4a90e2',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: '#fff',
      ':hover': {
        backgroundColor: '#357abd',
        color: '#fff',
      },
    }),
  };

  useEffect(() => {
    fetchMenteeProfile();
  }, []);

  const fetchMenteeProfile = async () => {
    try {
      setIsLoading(true);
      const data = await getMenteeProfile();
      if (data) {
        setProfile(data);
        setProfileExists(true);
      }
    } catch (error) {
      console.error('Error fetching mentee profile:', error);
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
    if (!profile.currentLevel) newErrors.currentLevel = 'Current level is required';
    if (!profile.institution) newErrors.institution = 'Institution is required';
    if (profile.interestedSubjects.length === 0) newErrors.interestedSubjects = 'At least one subject is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (profileExists) {
          await updateMenteeProfile(profile);
          alert('Profile updated successfully!');
        } else {
          await createMenteeProfile(profile);
          setProfileExists(true);
          alert('Profile created successfully!');
        }
      } catch (error) {
        console.error('Error saving mentee profile:', error);
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
  
  <label htmlFor="name">Full Name</label>
  <motion.input 
    whileFocus={{ scale: 1.02 }}
    id="name"
    type="text" 
    name="name" 
    placeholder="Full Name" 
    value={profile.name} 
    onChange={handleInputChange} 
    required 
  />
  {errors.name && <span className="error">{errors.name}</span>}

  <label htmlFor="age">Age</label>
  <motion.input 
    whileFocus={{ scale: 1.02 }}
    id="age"
    type="number" 
    name="age" 
    placeholder="Age" 
    value={profile.age} 
    onChange={handleInputChange} 
    required 
  />
  {errors.age && <span className="error">{errors.age}</span>}

  <label htmlFor="currentLevel">Current Level</label>
  <Select
    inputId="currentLevel"
    options={levels.map(level => ({ value: level, label: level }))}
    value={profile.currentLevel ? { value: profile.currentLevel, label: profile.currentLevel } : null}
    onChange={(selectedOption) =>
      handleInputChange({ target: { name: 'currentLevel', value: selectedOption?.value || '' } })
    }
    placeholder="Select Current Level"
    className="react-select-container"
    classNamePrefix="react-select"
    styles={selectStyles}
  />
  {errors.currentLevel && <span className="error">{errors.currentLevel}</span>}

  <label htmlFor="institution">Current School/University</label>
  <motion.input 
    whileFocus={{ scale: 1.02 }}
    id="institution"
    type="text" 
    name="institution" 
    placeholder="Current School/University" 
    value={profile.institution} 
    onChange={handleInputChange} 
    required 
  />
  {errors.institution && <span className="error">{errors.institution}</span>}

  <label htmlFor="interestedSubjects">Interested Subjects</label>
  <Select
    inputId="interestedSubjects"
    options={subjects.map(subject => ({ value: subject, label: subject }))}
    value={profile.interestedSubjects.map(subject => ({ value: subject, label: subject }))}
    onChange={(selectedOptions) =>
      handleInputChange({
        target: {
          name: 'interestedSubjects',
          value: selectedOptions.map(option => option.value)
        }
      })
    }
    placeholder="Select Interested Subjects"
    className="react-select-container"
    classNamePrefix="react-select"
    styles={selectStyles}
    isMulti
  />
  {errors.interestedSubjects && <span className="error">{errors.interestedSubjects}</span>}

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