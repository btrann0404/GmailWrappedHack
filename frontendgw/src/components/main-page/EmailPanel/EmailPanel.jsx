import './EmailPanel.css';
import axios from "axios";
import { useState, useEffect } from 'react';

function EmailPanel({ selectedEmail, onSummarize, onReply, onDelete })   {
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState('');

  const handleSummarize = async () => {
    if (!showSummary) {
      const response = await axios.post("http://localhost:5000/summarize-article", {
        body: selectedEmail.body
      });
      setSummary(response.data);
    }
    setShowSummary(!showSummary); // Toggle the showSummary state
  }

  useEffect(() => {
    // Reset showSummary to false when selectedEmail changes
    setShowSummary(false);
  }, [selectedEmail]);

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
        {showSummary ? (
          <p>{summary}</p>
        ) : (
          <p>{selectedEmail.body}</p>
        )}
      </div>
      <div className="email-actions">
          <button style={{fontSize:"0.9em"}}onClick={handleSummarize}>
              {showSummary ? 'Expand' : 'Summarize'} {/* Toggle button label */}
            </button>
      </div>
    </div>
  );
};

export default EmailPanel;