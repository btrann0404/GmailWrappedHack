import React, { useState } from 'react';
import './Inbox.css';


const Inbox = ({ emails, onEmailClick }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Dummy categories for testing
  const categories = [
    { id: 1, name: 'Career', icon: '👩‍💼' },
    { id: 2, name: 'Personal', icon: '🏡' },
    { id: 3, name: 'kale', icon: '👩‍💼' },
    { id: 4, name: 'is', icon: '🏡' },
    { id: 5, name: 'awesome', icon: '👩‍💼' },
    // Add more categories as needed
  ];

    // Dummy emails for testing
    const dummyEmails = [
      { id: 1, subject: 'Meeting Tomorrow', sender: 'john.doe@example.com', category: 1, read: false },
      { id: 2, subject: 'Project Update', sender: 'jane.smith@example.com', category: 2, read: false },
      { id: 3, subject: 'abc', sender: 'new.doe@example.com', category: 1, read: false },
      { id: 4, subject: 'def', sender: 'newer.smith@example.com', category: 2, read: false },
      { id: 5, subject: 'efg', sender: 'newest.doe@example.com', category: 1, read: false },
      { id: 6, subject: 'hij', sender: 'newester.smith@example.com', category: 2, read: false },
      // Add more dummy emails as needed
    ];

  const handleTabClick = (category) => {
    setSelectedCategory(category.id === selectedCategory ? null : category.id);
  };

  const handleBackToAll = () => {
    // to go back to all categories after clicking on 1 category
    setSelectedCategory(null);
  };

  return (
    <div className="inbox-container">
      <div className="category-tabs">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-tab ${category.id === selectedCategory ? 'selected' : ''}`}
            onClick={() => handleTabClick(category)}
          >
            
            <span>{category.icon}</span>
            <span>{category.name}</span>
            {/* Display unread count only if there are unread emails IDK HOW TO IMPLEMENT THE AMT OF UNREADS */}
            {dummyEmails.filter((dummyEmail) => dummyEmail.category === category.id && !dummyEmail.read).length > 0 && (
              <span className="unread-count ml-auto">
                {dummyEmails.filter((dummyEmail) => dummyEmail.category === category.id && !dummyEmail.read).length}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Render emails based on the selected category */}
      {selectedCategory !== null && (
        <div className="email-list">
          {dummyEmails
            .filter((dummyEmail) => dummyEmail.category === selectedCategory)
            .map((filteredEmail) => (
              <div key={filteredEmail.id} className="email-item">
                <p>
                  <strong>{filteredEmail.subject}</strong>
                </p>
                <p>Sender: {filteredEmail.sender}</p>
                {/* Add more details as needed */}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Inbox;
