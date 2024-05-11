// pages/index.js
// import TranscriptionForm from './components/TranscriptionForm';/

"use client"
import TranscriptionForm from "@/components/TranscriptionForm";

export default function Summary() {
  return (
    <div>
      <h1>Speech Transcription</h1>
      <TranscriptionForm />
    </div>
  );
}
