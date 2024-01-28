import { useState, useEffect } from 'react';
import './Inbox.css';


// eslint-disable-next-line react/prop-types
const Inbox = ({ onEmailClick, emailData }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);  // holds category names in a list
  const [dummyEmails, setDummyEmails] = useState([]); // list of email dictionaries {subject, sender, category, body}

  useEffect(() => {
    // Check if emailData is available and not empty
    if (emailData && Object.keys(emailData).length > 0) {
      // Extract categories and set dummy emails
      setCategories(Object.keys(emailData));
      // Set your dummy emails here based on emailData
      const dummyEmailsData = [];
      // Modify emailData into the format you need for dummyEmails
      // Example: You might need to iterate over emailData and format it accordingly
      Object.keys(emailData).forEach((category) => {
        // eslint-disable-next-line react/prop-types
        emailData[category].forEach((email) => {
          // Format email and add it to dummyEmailsData
          dummyEmailsData.push({
            subject: email["Subject"], // Modify as needed
            sender: email["Sender"], // Modify as needed
            category, // Use the category from the iteration
            body: email["Body"], // Modify as needed
          });
        });
      });
      console.log(dummyEmailsData);
      setDummyEmails(dummyEmailsData);
    }
  }, [emailData]);

  const handleTabClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleGoBack = () => {
    // to go back to all categories after clicking on 1 category
    setSelectedCategory(null);
  };

  const handleEmailClick = (email) => {
    setSelectedEmail(email.subject === selectedEmail ? null : email.subject);
    //console.log(email);
    // You can pass the selected email to another component or perform other actions here
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    //to be implemented
  };

  
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
  {selectedCategory !== null && (
    <div className="email-list">
      {dummyEmails
        .filter((dummyEmail) => dummyEmail.category === selectedCategory)
        .map((dummyEmail) => (
          <div key={dummyEmail.category} className="email-item" 
          onClick={() => onEmailClick(dummyEmail)}>
            <p>
              <strong>{dummyEmail.subject}</strong>
            </p>
            <p>Sender: {dummyEmail.sender}</p>
          </div>
        ))}
      <button onClick={handleGoBack}>Go Back</button>
    </div>
  )}

</div>

  );
};

export default Inbox;