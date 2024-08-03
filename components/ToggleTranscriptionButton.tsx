import React from 'react';
import { useCall, useCallStateHooks, TranscriptionSettingsModeEnum } from '@stream-io/video-react-sdk';

export const MyToggleTranscriptionButton: React.FC = () => {
  const call = useCall();
  const { useCallSettings, useIsCallTranscribingInProgress } = useCallStateHooks();

  const { transcription } = useCallSettings() || {};
  const isTranscribing = useIsCallTranscribingInProgress(); // Always call hooks at the top level

  // Early return if transcription is disabled
  if (transcription?.mode === TranscriptionSettingsModeEnum.DISABLED) {
    return null;
  }

  return (
    <button
      onClick={() => {
        if (isTranscribing) {
          call?.stopTranscription().catch((err) => {
            console.log('Failed to stop transcriptions', err);
          });
        } else {
          call?.startTranscription().catch((err) => {
            console.error('Failed to start transcription', err);
          });
        }
      }}
    >
      {isTranscribing ? 'Stop transcription' : 'Start transcription'}
    </button>
  );
};
