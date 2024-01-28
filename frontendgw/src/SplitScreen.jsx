import React, { useState } from 'react';
import Inbox from './Inbox/Inbox';
import EmailPanel from './EmailPanel/EmailPanel';

const SplitScreen = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Inbox onEmailClick={handleEmailClick} />
      <EmailPanel selectedEmail={selectedEmail} />
    </div>
  );
};

export default SplitScreen;