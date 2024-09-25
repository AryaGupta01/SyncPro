// import React, { useState, useEffect } from 'react';
// import summarizeVideo from './videoSummarizer';


// function VideoSummary() {
//   const [videoUrl, setVideoUrl] = useState('https://your-video-url.mp4');
//   const [summary, setSummary] = useState('');

//   useEffect(() => {
//     const fetchSummary = async () => {
//       const result = await summarizeVideo(videoUrl);
//       setSummary(result);
//     };

//     fetchSummary();
//   }, [videoUrl]);

//   return (
//     <div>
//       <input
//         type="text"
//         value={videoUrl}
//         onChange={(e) => setVideoUrl(e.target.value)}
//       />
//       <p>{summary}</p>
//     </div>
//   );
// }

// export default VideoSummary;