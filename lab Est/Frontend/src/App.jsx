import React, { useState } from 'react';

function App() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body }),
    });

    if (response.ok) {
      setSuccessMessage('Post created successfully!');
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input type="text" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body" />
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default App;
