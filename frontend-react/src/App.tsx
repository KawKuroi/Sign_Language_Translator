import React, { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { Camera, MessageSquare, RefreshCw, HandMetal } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function App() {
  const webcamRef = useRef<Webcam>(null);
  const [isTranslating, setIsTranslating] = useState(true);
  const [translationText, setTranslationText] = useState("");
  
  // This is a mockup for calling the backend translation API
  const fetchMockTranslation = useCallback(async () => {
    if (!isTranslating) return;
    
    try {
      // Intentionally hitting the mock POST /translate backend endpoint created previously
      const response = await axios.post(`${API_URL}/translate`);
      setTranslationText(response.data);
    } catch (error) {
      console.error("Error fetching translation:", error);
      setTranslationText("Esperando conexión...");
    }
  }, [isTranslating]);

  // Periodic mock sync
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMockTranslation();
    }, 2000);
    return () => clearInterval(interval);
  }, [fetchMockTranslation]);

  const toggleTranslation = () => {
    setIsTranslating(!isTranslating);
    if (isTranslating) {
      setTranslationText("");
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Sign Language Translator</h1>
        <p>Real-time AI recognition over GCP & Firebase</p>
      </header>

      <main className="main-content">
        {/* Camera Panel */}
        <section className="panel">
          <div className="panel-title">
            <Camera className="text-primary" size={24} />
            <span>Cámara Web</span>
          </div>
          
          <div className="video-container">
            <Webcam
              ref={webcamRef}
              className="video-element"
              mirrored={true}
              audio={false}
              videoConstraints={{
                facingMode: "user",
                width: 640,
                height: 480
              }}
            />
            {isTranslating && (
              <div className="status-indicator">
                <div className="status-dot"></div>
                <span>Cápturando</span>
              </div>
            )}
          </div>
          
          <div className="controls">
            <button 
              className={`btn ${isTranslating ? 'btn-secondary' : ''}`}
              onClick={toggleTranslation}
            >
              {isTranslating ? (
                <>
                  <RefreshCw size={18} /> Pausar Traducción
                </>
              ) : (
                <>
                  <HandMetal size={18} /> Iniciar Traducción
                </>
              )}
            </button>
          </div>
        </section>

        {/* Translation Output Panel */}
        <section className="panel">
          <div className="panel-title">
            <MessageSquare className="text-primary" size={24} />
            <span>Traducción en Tiempo Real</span>
          </div>
          
          <div className="translation-box">
            {translationText ? (
              <p>{translationText}</p>
            ) : (
              <p className="placeholder-text">
                {isTranslating ? "Realiza una seña para comenzar..." : "Traducción pausada"}
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
