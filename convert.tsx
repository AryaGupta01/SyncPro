import { useState } from 'react';
import { convertMP4toMP3 } from '../utils/convertMP4toMP3';

export default function ConvertVideo() {
  const [mp4Url, setMp4Url] = useState('');
  const [mp3Url, setMp3Url] = useState('');

  const handleConvert = async () => {
    try {
      const resultMp3Url = await convertMP4toMP3(mp4Url);
      setMp3Url(resultMp3Url);
    } catch (error) {
      console.error('Conversion failed', error);
    }
  };

  return (
    <div>
      <h1>Convert MP4 to MP3</h1>
      <input
        type="text"
        placeholder="Enter MP4 link"
        value={mp4Url}
        onChange={(e) => setMp4Url(e.target.value)}
      />
      <button onClick={handleConvert}>Convert</button>
      {mp3Url && (
        <div>
          <h2>MP3 Link:</h2>
          <a href={mp3Url} download="output.mp3">
            Download MP3
          </a>
        </div>
      )}
    </div>
  );
}