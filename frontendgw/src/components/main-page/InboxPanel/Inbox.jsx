/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './Inbox.css';

const Inbox = ({ onEmailClick, emailData }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [dummyEmails, setDummyEmails] = useState([]);

  useEffect(() => {
    if (emailData && Object.keys(emailData).length > 0) {
      setCategories(Object.keys(emailData));
      const dummyEmailsData = [];
      Object.keys(emailData).forEach((category) => {
        emailData[category].forEach((email) => {
          dummyEmailsData.push({
            subject: email["Subject"],
            sender: email["Sender"],
            category,
            body: email["Body"],
            date: email["Datetime"]
          });
        });
      });
      setDummyEmails(dummyEmailsData);
    }
  }, [emailData]);

  const handleTabClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleGoBack = () => {
    setSelectedCategory(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Filter and get top three search results based on searchQuery
  const topThreeSearchResults = dummyEmails
    .filter((dummyEmail) => {
      const queryLowercase = searchQuery.toLowerCase();
      return (
        dummyEmail.body.toLowerCase().includes(queryLowercase) ||
        dummyEmail.subject.toLowerCase().includes(queryLowercase) ||
        dummyEmail.sender.toLowerCase().includes(queryLowercase)
      );
    })
    .slice(0, 3);

  return (
    <div className="inbox-container text-lg">
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

      {/* Render top three search results based on the search query */}
      {searchQuery !== '' && (
        <div className="email-list">
          {topThreeSearchResults.map((dummyEmail) => (
            <div key={dummyEmail.category} className="email-item" onClick={() => onEmailClick(dummyEmail)}>
              <p>
                <strong>{dummyEmail.subject}</strong>
              </p>
              <p>Sender: {dummyEmail.sender}</p>
            </div>
          ))}
        </div>
      )}

      <div className="category-tabs">
        {categories.map((category) => (
          <div
            key={category}
            className={`category-tab ${selectedCategory !== null && category !== selectedCategory ? 'hidden' : ''}`}
            onClick={() => handleTabClick(category)}
          >
            <span>{category}</span>

            {/* Display unread count only if there are unread emails */}
            {dummyEmails.filter((dummyEmail) => dummyEmail.category === category && !dummyEmail.read).length > 0 && (
              <span className="unread-count ml-auto">
                {dummyEmails.filter((dummyEmail) => dummyEmail.category === category && !dummyEmail.read).length}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Render emails based on the selected category */}
      {selectedCategory !== null && searchQuery === '' && (
        <div className="email-list">
          {dummyEmails
            .filter((dummyEmail) => dummyEmail.category === selectedCategory)
            .map((dummyEmail) => (
              <div key={dummyEmail.category} className="email-item" onClick={() => onEmailClick(dummyEmail)}>
                <p>
                  <strong>{dummyEmail.subject}</strong>
                </p>
                <p>Sender: {dummyEmail.sender}</p>
                <p>Date: {dummyEmail.date}</p>
              </div>
            ))}
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default Inbox;
