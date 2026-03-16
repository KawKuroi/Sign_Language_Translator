import React from 'react';

interface TranslationBoxProps {
  translationText: string;
}

const TranslationBox: React.FC<TranslationBoxProps> = ({ translationText }) => {
  return (
    <div className="translation-box">
      <h2>Traducción</h2>
      <p>{translationText || 'Esperando gestos...'}</p>
    </div>
  );
};

export default TranslationBox;
