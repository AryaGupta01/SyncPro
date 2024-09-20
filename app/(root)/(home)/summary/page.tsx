// pages/index.js
// import TranscriptionForm from './components/TranscriptionForm';/
"use client"
import { createClient } from '@deepgram/sdk';
export default function Summary() {
  const listen = async () => {
    const deepgramApiKey = 'cc05d48d49c298a2bceec3de0e304b9b3a95aaa8';
    const url = 'https://mumbai.stream-io-cdn.com/1304439/video/recordings/default_215d3ea4-8395-497b-8983-b87052ff1308/rec_default_215d3ea4-8395-497b-8983-b87052ff1308_720p_1726853711865.mp4';
    const deepgram = createClient(deepgramApiKey);
  
    const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
      { url },
      {
        model: 'nova-2',
        language: 'en',
        summarize: 'v2',
        topics: true,
        intents: true,
        smart_format: true,
        punctuate: true,
        paragraphs: true,
        utterances: true,
        sentiment: true,
      },
    );
  
    if (error) {
      console.error(error);
    } else {
      console.dir(result, { depth: null });
    }
  }
  
  listen();
  return (
    <div>
      <center><h1>Launch Soon</h1></center>
      {/* <TranscriptionForm /> */}
    </div>
  );
}
