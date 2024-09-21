import React from 'react';

// Define a type for the props
type SummaryModalProps = {
  link: string; // Define 'link' as a string
};

// Use the type in the component
const SummaryModal: React.FC<SummaryModalProps> = ({ link }) => {
  return (
    <div>
      hey
      {link ? 'linke is available' : 'link is not avalible'}
    </div>
  );
};

export default SummaryModal;
