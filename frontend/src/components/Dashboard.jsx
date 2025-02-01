import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GratitudeJournal from './GratitudeJournal';
import EmotionalJournal from './EmotionalJournal';
import Yoga from './Yoga';
import Meditation from './Meditation';
import Blogs from './Blogs';
import Chants from './Chants';
import AISupportChatbot from './AISupportChatbot';
import MemoryGame from './MemoryGame';
import AngerManagementTest from './AngerManagementTest';
import DepressionTest from './DepressionTest';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(''); // Track active section
 const navigate=useNavigate();
  const sections = [
    { id: 'stressTest', label: 'Test' },
    { id: 'aiSupport', label: 'AI Support' },
    { id: 'games', label: 'Games' },
    { id: 'gratitudeJournal', label: 'Gratitude Journal' },
    { id: 'emotionalJournal', label: 'Emotional Journal' },
    { id: 'yogaSection', label: 'Yoga Section' },
    { id: 'meditationSection', label: 'Meditation Section' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'chantsSection', label: 'Chants Section' },
  ];
  const renderContent = () => {
    switch (activeSection) {
      case 'stressTest':
        return  <div className='max-h-screen flex w-full gap-10 overflow-auto'> <AngerManagementTest/> <DepressionTest/> </div>
      
      case 'aiSupport':
        return <AISupportChatbot/>
      case 'games':
        return <MemoryGame/>
      case 'gratitudeJournal':
         return <GratitudeJournal/>
      case 'emotionalJournal':
        return <EmotionalJournal/>
      case 'yogaSection':
        return <Yoga/>
      case 'meditationSection':
        return <Meditation/>
      case 'blogs':
        return <Blogs/>
      case 'chantsSection':
        return <Chants/>
      default:
        return <p>Select a section from the sidebar</p>;
    }
  };
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '20%',
          background: '#f5f5f5',
          padding: '1rem',
          borderRight: '1px solid #ddd',
        }}
        className='overflow-y-auto'
      >
        <h3>Dashboard</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {sections.map((section) => (
            <li key={section.id} style={{ marginBottom: '1rem' }}>
              <button
                onClick={() => setActiveSection(section.id)}
                style={{
                  background: activeSection === section.id ? '#6200ea' : '#ddd',
                  color: activeSection === section.id ? 'white' : 'black',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1, padding: '2rem' }}>{renderContent()}</div>
    </div>
  );
};
export default Dashboard;
