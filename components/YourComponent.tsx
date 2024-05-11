import { useEffect, useState } from 'react';

const YourComponent = () => {
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    const handleUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log({ stream });
        
        if (!MediaRecorder.isTypeSupported('audio/webm')) {
          return alert('Browser not supported');
        }
        
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'audio/webm',
        });

        const socket = new WebSocket('wss://api.deepgram.com/v1/listen', [
          'token',
          'f82c3e1dda746194de18c9703dd70e83c0685c58',
        ]);

        socket.onopen = () => {
          console.log({ event: 'onopen' });
          mediaRecorder.addEventListener('dataavailable', async (event) => {
            if (event.data.size > 0 && socket.readyState === 1) {
              socket.send(event.data);
            }
          });
          mediaRecorder.start(1000);
        };

        socket.onmessage = (message) => {
          const received = JSON.parse(message.data);
          const newTranscript = received.channel.alternatives[0].transcript;
          if (newTranscript && received.is_final) {
            console.log(newTranscript);
            setTranscript(prevTranscript => prevTranscript + newTranscript + ' ');
          }
        };

        socket.onclose = () => {
          console.log({ event: 'onclose' });
        };

        socket.onerror = (error) => {
          console.log({ event: 'onerror', error });
        };
      } catch (error) {
        console.error('Error accessing user media:', error);
      }
    };

    handleUserMedia();

    return () => {
      // Clean up code if necessary
    };
  }, []);

  return (
    <div>
      <p id="status">Connecting...</p>
      <p id="transcript">Transcript: {transcript}</p>
    </div>
  );
};

export default YourComponent;
