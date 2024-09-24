import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// utils/convertVideoToAudio.ts


 const ffmpeg = createFFmpeg({ log: true });

export const convertVideoToMp3 = async (videoFile: any): Promise<Blob | null> => {
  try {
    // Load FFmpeg into memory
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }

    // Write the video file to FFmpeg's in-memory file system
    ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoFile));

    // Run the FFmpeg command to extract audio and save it as an mp3 file
    await ffmpeg.run('-i', 'input.mp4', 'output.mp3');

    // Read the output mp3 file from FFmpeg's file system
    const data = ffmpeg.FS('readFile', 'output.mp3');

    // Create a Blob object from the mp3 file data
    const audioBlob = new Blob([data.buffer], { type: 'audio/mpeg' });

    return audioBlob;
  } catch (error) {
    console.error('Error during video to audio conversion:', error);
    return null;
  }
};