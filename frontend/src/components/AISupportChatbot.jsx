import React, { useState, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const AISupportChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const streamTimeout = useRef(null);

  const handleSendMessage = async () => {
    if (!userMessage.trim() || isProcessing) return;

    // Add user message
    const newMessage = {
      sender: 'user',
      text: userMessage,
    };
    setMessages(prev => [...prev, newMessage]);
    setUserMessage('');
    
    setIsProcessing(true);
    
    try {
      const response = await axios.post('http://localhost:8000/api/chat', {
        query: userMessage,
      });

      // Add empty bot message and stream response
      const botResponse = response.data.response || 'No response received.';
      const words = botResponse.split(' ');
      
      setMessages(prev => [...prev, { sender: 'bot', text: '' }]);
      
      let i = 0;
      const streamResponse = () => {
        if (i < words.length) {
          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            lastMessage.text += (i === 0 ? '' : ' ') + words[i];
            return newMessages;
          });
          i++;
          streamTimeout.current = setTimeout(streamResponse, 50);
          chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        } else {
          setIsProcessing(false);
        }
      };

      streamTimeout.current = setTimeout(streamResponse, 0);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, 
        { sender: 'bot', text: 'Sorry, something went wrong. Please try again.' }
      ]);
      setIsProcessing(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>AI Support Chat</h2>
      <div ref={chatBoxRef} style={styles.chatWindow}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              ...(msg.sender === 'user' ? styles.userMessage : styles.botMessage)
            }}
          >
            <div style={styles.senderTag}>
              {msg.sender === 'user' ? 'You' : 'Assistant'}
            </div>
            {msg.sender === 'bot' ? (
              <ReactMarkdown style={styles.markdown}>
                {msg.text}
              </ReactMarkdown>
            ) : (
              <span>{msg.text}</span>
            )}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <textarea
          ref={inputRef}
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message..."
          style={styles.textarea}
          disabled={isProcessing}
          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          style={{
            ...styles.button,
            ...(isProcessing && styles.buttonDisabled)
          }}
          disabled={isProcessing}
        >
          {isProcessing ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '1.5rem',
    borderRadius: '16px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    color: '#2d3436',
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
  },
  chatWindow: {
    height: '60vh',
    overflowY: 'auto',
    marginBottom: '1.5rem',
    padding: '1rem',
    borderRadius: '12px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
  },
  message: {
    position: 'relative',
    padding: '1rem',
    margin: '0.5rem 0',
    borderRadius: '12px',
    maxWidth: '80%',
    lineHeight: '1.5',
  },
  userMessage: {
    backgroundColor: '#6200ee',
    color: 'white',
    marginLeft: 'auto',
    borderBottomRightRadius: '4px',
  },
  botMessage: {
    backgroundColor: '#ffffff',
    color: '#2d3436',
    border: '1px solid #e9ecef',
    marginRight: 'auto',
    borderBottomLeftRadius: '4px',
  },
  senderTag: {
    fontSize: '0.8rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#6c757d',
  },
  inputContainer: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-end',
  },
  textarea: {
    flexGrow: 1,
    minHeight: '100px',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #ced4da',
    fontSize: '1rem',
    resize: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    padding: '0.8rem 1.5rem',
    backgroundColor: '#6200ee',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  },
  buttonDisabled: {
    backgroundColor: '#9e9e9e',
    cursor: 'not-allowed',
  },
  markdown: {
    '& pre': {
      backgroundColor: '#f8f9fa',
      padding: '1rem',
      borderRadius: '8px',
      overflowX: 'auto',
    },
    '& code': {
      backgroundColor: '#f8f9fa',
      padding: '0.2em 0.4em',
      borderRadius: '4px',
      fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
    },
  },
};

export default AISupportChatbot;