import React, { useRef, useEffect } from 'react';
import styles from '../../../styles/mentee_dashboard/Messages.module.css';

const ChatWindow = ({ messages, currentUser, otherUser, onSendMessage, inputValue, onInputChange }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      onInputChange('');
    }
  };

  return (
    <div className={styles.chatWindow}>
    {/* Chat Header */}
    <header className={styles.chatHeader}>
    <div 
  className={styles.chatUserAvatar}
  aria-hidden="true"
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
    fill="currentColor"
    className={styles.avatarIcon}
  >
    <path 
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
    />
  </svg>
</div>
      <h2 className={styles.chatUserName} aria-label="Chat with">
        {otherUser.name}
      </h2>
    </header>
 
    {/* Messages Container */}
    <main 
      className={styles.chatMessages} 
      role="log" 
      aria-live="polite"
      aria-relevant="additions"
    >
      {messages.map((message, index) => (
        <article
          key={message.id || index}
          className={`${styles.messageWrapper} ${
            message.sender === currentUser.id 
              ? styles.sent 
              : styles.received
          }`}
          aria-label={`Message ${index + 1} from ${
            message.sender === currentUser.id ? 'you' : otherUser.name
          }`}
        >
          <div className={styles.messageContent}>
            <p role="text">{message.content}</p>
            <time 
              className={styles.messageTime}
              dateTime={new Date(message.timestamp).toISOString()}
            >
              {new Date(message.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </time>
          </div>
        </article>
      ))}
      <div ref={messagesEndRef} aria-hidden="true" />
    </main>
  
    {/* Message Input */}
    <footer className={styles.chatInputForm}>
      <form 
        onSubmit={handleSend} 
        role="region" 
        aria-label="Message composition"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Type a message..."
          className={styles.chatInput}
          aria-label="Type your message"
        />
        <button 
          type="submit" 
          className={styles.sendButton}
          aria-label="  Send message"
        >
            Send
        </button>
      </form>
    </footer>
  </div>
  );
};

export default ChatWindow;