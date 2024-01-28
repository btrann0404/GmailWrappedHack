import React from 'react';
import './EmailPanel.css';

const EmailPanel = ({ selectedEmail, onSummarize, onReply, onDelete }) => {
  console.log(selectedEmail);
  if (!selectedEmail) {
    // If no email is selected, you can display a placeholder or empty state
    return (
      <div className="email-panel-placeholder">
        <p>No email selected.</p>
      </div>
    );
  }

  return (
    <div className="email-panel">
      <div className="email-header">
        <p>From: {selectedEmail.sender}</p>
        <p>Subject: {selectedEmail.subject}</p>
      </div>
      <div className="email-body">
        <p>{selectedEmail.body}</p>
      </div>
      <div className="email-actions">
        <button onClick={onSummarize}>Summarize</button>
        <button onClick={onReply}>Reply</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default EmailPanel;
