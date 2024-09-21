// pages/index.js
// import TranscriptionForm from './components/TranscriptionForm';/
"use client"
import { useLink } from "@/components/LinkContext";
import SummaryModal from "@/components/SummaryModal";
import React from "react";
export default function Summary() {
  const { link } = useLink();
  return (
    <div>
      {link}
      <SummaryModal link = {link}/>
    </div>
  );
}
