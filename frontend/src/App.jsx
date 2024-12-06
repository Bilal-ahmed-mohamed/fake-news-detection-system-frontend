import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NewsForm from './components/NewsForm';
import ErrorMessage from './components/ErrorMessage';
import AnalysisResult from './components/AnalysisResult';
import  './index.css';

function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please provide news text.');
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Error analyzing news.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="container">
          <NewsForm
            text={text}
            setText={setText}
            loading={loading}
            onSubmit={handleSubmit}
          />
          <ErrorMessage message={error} />
          <AnalysisResult result={result} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;