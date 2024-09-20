import {
  useCall,
  useCallStateHooks,
  TranscriptionSettingsModeEnum,
} from '@stream-io/video-react-sdk';
import { Toggle } from "@/components/ui/toggle"
import { Bold } from 'lucide-react';
export const MyToggleTranscriptionButton = () => {
  const call = useCall();
  const { useCallSettings, useIsCallTranscribingInProgress } =
    useCallStateHooks();

  const { transcription } = useCallSettings() || {};
  console.log(transcription);
  if (transcription?.mode === TranscriptionSettingsModeEnum.DISABLED) {
    // transcriptions are not available, render nothing
    return null;
  }

  const isTranscribing = useIsCallTranscribingInProgress();
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
//     <Toggle aria-label="Toggle bold">
//       <Bold className="h-4 w-4" />
//     </Toggle>
  );
};