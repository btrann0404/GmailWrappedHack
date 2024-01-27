import React, { useState } from 'react';
import Inbox from './Inbox/Inbox';  // Create this component
//import EmailPanel from './EmailPanel/EmailPanel'; // Create this component

const SplitScreen = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  return (
    <div style={{ display: 'flex' }}>
      <LeftPanel onEmailClick={handleEmailClick} />
      <RightPanel selectedEmail={selectedEmail} /> 
    </div>
  );
};

export default SplitScreen;