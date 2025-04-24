import React from 'react';
import styles from '../../../styles/mentee_dashboard/Messages.module.css';

const UserList = ({ users, selectedUser, onSelectUser }) => {
  return (
    <div className={styles.userList}>
      <h2 className={styles.userListTitle}>Connected Mentors</h2>
      <div className={styles.userListScroll}>
        {users.map((user) => (
          <div
            key={user._id}
            className={`${styles.userItem} ${selectedUser && selectedUser._id === user._id ? styles.selected : ''}`}
            onClick={() => onSelectUser(user)}
          >
           <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={styles.avatarIcon}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
  </svg>
            <div className={styles.userInfo}>
             
              <span className={styles.userEmail}>{user.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;