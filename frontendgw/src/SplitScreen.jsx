import React, { useState } from 'react';
import Inbox from './Inbox/Inbox';  // Create this component
//import EmailPanel from './EmailPanel/EmailPanel'; // Create this component
import EmailPanel from './EmailPanel/EmailPanel';

const SplitScreen = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  
  // add the right panel here after its finished
  return (
    <div style={{ display: 'flex' }}>
      <Inbox onEmailClick={handleEmailClick} />
      <EmailPanel selectedEmail={selectedEmail} />
    </div>
  );
};

export default SplitScreen;