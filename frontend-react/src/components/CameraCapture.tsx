import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const CameraCapture: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    // TODO: Send imageSrc to backend
  }, [webcamRef]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture photo</button>
    </div>
  );
};

export default CameraCapture;
