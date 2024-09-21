'use client';
import React, { useEffect, useState } from 'react';
import { useCall } from '@stream-io/video-react-sdk';


const StartRecordingEarly = () => {
  const call = useCall();
  const [recordingStatus, setRecordingStatus] = useState<string>(''); // State to hold the recording status

  useEffect(() => {
    const startRecording = async () => {
      if (call) {
        try {
          await call.startRecording();
          setRecordingStatus('Recording started.');
          console.log(recordingStatus);
        } catch (error) {
          setRecordingStatus('Error starting recording.');
        }
      } else {
        setRecordingStatus('Call is not available.');
      }
    };
    startRecording();
    console.log('recording is working')
})

  return (
    <div>
      {recordingStatus}
    </div>
  );
};

export default StartRecordingEarly;
