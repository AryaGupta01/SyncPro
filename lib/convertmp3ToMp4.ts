import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

// Initialize FFmpeg
const ffmpeg = createFFmpeg({ log: true });

/**
 * Converts an MP4 file link to an MP3 blob URL.
 * @param {string} mp4Url - The link to the MP4 file.
 * @returns {Promise<string>} - A promise that resolves to a URL pointing to the converted MP3 file.
 */
export const convertMP4toMP3 = async (mp4Url: string): Promise<string> => {
  try {
    // Load FFmpeg if not already loaded
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }

    // Fetch the MP4 file from the URL
    const mp4File = await fetchFile(mp4Url);

    // Write the MP4 file to the in-memory filesystem of FFmpeg
    ffmpeg.FS('writeFile', 'input.mp4', mp4File);

    // Run FFmpeg to convert MP4 to MP3
    await ffmpeg.run('-i', 'input.mp4', 'output.mp3');

    // Read the result from FFmpeg's filesystem
    const mp3Data = ffmpeg.FS('readFile', 'output.mp3');

    // Convert the result to a Blob and create a URL for it
    const mp3Blob = new Blob([mp3Data.buffer], { type: 'audio/mpeg' });
    const mp3Url = URL.createObjectURL(mp3Blob);

    return mp3Url; // Return the link to the MP3 file
  } catch (error) {
    console.error('Error converting MP4 to MP3:', error);
    throw error;
  }
};