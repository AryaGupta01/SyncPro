// components/TranscriptionForm.js
import { useState } from 'react';

const TranscriptionForm = () => {
  const [transcript, setTranscript] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setTranscript(data.transcript);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit" disabled={loading}>
          {loading ? 'Transcribing...' : 'Transcribe Audio'}
        </button>
      </form>
      {transcript && (
        <div>
          <h2>Transcript:</h2>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default TranscriptionForm;
