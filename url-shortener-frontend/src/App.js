import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortId, setShortId] = useState('');
  const [result, setResult] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');

  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:3000';

  const getTinyUrl = async () => {
    try {
      const response = await axios.post(`${backendUrl}/url`, { originalUrl });
      setResult(`Tiny URL: ${response.data.shortId}`);
    } catch (error) {
      setResult('Error creating tiny URL');
    }
  };

  const getLongUrl = async () => {
    try {
      const response = await axios.get(`${backendUrl}/url/${shortId}`);
      setRedirectUrl(response.data.originalUrl);
      setResult(`Original URL: ${response.data.originalUrl}`);
    } catch (error) {
      setResult('Error fetching original URL');
    }
  };

  const handleRedirect = () => {
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>URL Shortener</h1>
      <div style={{ marginBottom: '20px' }}>
        <h2>Get Tiny URL</h2>
        <input
          type="text"
          placeholder="Enter original URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          style={{ width: '300px', marginRight: '10px' }}
        />
        <button onClick={getTinyUrl}>Get Tiny URL</button>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h2>Get Original URL</h2>
        <input
          type="text"
          placeholder="Enter short ID"
          value={shortId}
          onChange={(e) => setShortId(e.target.value)}
          style={{ width: '300px', marginRight: '10px' }}
        />
        <button onClick={getLongUrl}>Get Original URL</button>
      </div>
      <div style={{ border: '1px solid black', padding: '20px', minHeight: '50px' }}>
        {result && <p>{result}</p>}
        {redirectUrl && <button onClick={handleRedirect}>Redirect</button>}
      </div>
    </div>
  );
};

export default App;
