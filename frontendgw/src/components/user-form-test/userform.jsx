//for testing. Enter form info to create a user in matt_users_test

import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const UserForm = ({ addUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bannedWords, setBannedWords] = useState('');
  const [keywords, setKeywords] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Splitting the string by commas and trimming whitespace to convert into arrays
    const bannedWordsArray = bannedWords.split(',').map(word => word.trim());
    const keywordsArray = keywords.split(',').map(keyword => keyword.trim());

    try {
      const docId = await addUser(name, email, bannedWordsArray, keywordsArray);
      console.log('Added user with ID:', docId);
      // Reset form fields after successful submission
      setName('');
      setEmail('');
      setBannedWords('');
      setKeywords('');
    } catch (error) {
      console.error('Failed to add user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Banned Words:</label>
        <input type="text" value={bannedWords} onChange={e => setBannedWords(e.target.value)} placeholder="Separate words with commas" required />
      </div>
      <div>
        <label>Keywords:</label>
        <input type="text" value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="Separate keywords with commas" required />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
