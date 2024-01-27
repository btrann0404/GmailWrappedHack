//Still just GPT, havent touched


import { useState, useEffect, useMemo } from 'react';
import firebase from '../../firebaseConfig';

const EmailSearch = () => {
  const [emails, setEmails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection('matt_users_test').get();
      setEmails(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredEmails = useMemo(() => {
    return emails.filter(email => email.subject.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [emails, searchQuery]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search email subjects..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div>
        {filteredEmails.map(email => (
          <div key={email.id}>{email.subject}</div>
        ))}
      </div>
    </div>
  );
};

export default EmailSearch;
