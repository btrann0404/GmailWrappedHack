import React, { useState } from 'react';
import './Inbox.css';


const Inbox = ({ emails, onEmailClick }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleGoBack = () => {
    // to go back to all categories after clicking on 1 category
    setSelectedCategory(null);
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email.id === selectedEmail ? null : email.id);
    //console.log(email);
    // You can pass the selected email to another component or perform other actions here
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Filter emails based on search query
  const filteredEmails = dummyEmails.filter((email) =>
    email.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="inbox-container">
      <div className="search-bar">
        <button className="search-button" onClick={() => handleSearch(searchQuery)}>
          🔍
        </button>

        <input
          type="text"
          className={`search-input ${searchQuery !== '' ? 'blinking-cursor' : ''}`}
          placeholder="Search mail"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="category-tabs">
        {categories.map((category) => (
          <div
          key={category.id}
          className={`category-tab ${selectedCategory !== null && category.id !== selectedCategory ? 'hidden' : ''}`}
          onClick={() => handleTabClick(category)}
        >
            <span>{category.icon}</span>
            <span>{category.name}</span>
            {/* Display unread count only if there are unread emails */}
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
              <div key={filteredEmail.id} className="email-item" 
              onClick={() => onEmailClick(filteredEmail)}>
                <p>
                  <strong>{filteredEmail.subject}</strong>
                </p>
                <p>Sender: {filteredEmail.sender}</p>
                {/* Add more details as needed */}
              </div>
            ))}
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default Inbox;