import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({
  corePath: 'https://unpkg.com/@ffmpeg/core@0.12.7/ffmpeg-core.js',
  log: true,

  // workerPath: 'https://unpkg.com/@ffmpeg/core@0.12.7/ffmpeg-core.worker.js',
});

export const convertMP4toMP3 = async (mp4Url: string): Promise<string> => {
  try {
    if (!ffmpeg.isLoaded()) {
      await ffmpeg.load();
    }

    const mp4File = await fetchFile(mp4Url);
    ffmpeg.FS('writeFile', 'input.mp4', mp4File);
    await ffmpeg.run('-i', 'input.mp4', 'output.mp3');

    const mp3Data = ffmpeg.FS('readFile', 'output.mp3');
    const mp3Blob = new Blob([mp3Data.buffer], { type: 'audio/mpeg' });
    const mp3Url = URL.createObjectURL(mp3Blob);

    return mp3Url;
  } catch (error) {
    console.error('Error converting MP4 to MP3:', error);
    throw error;
  }
};