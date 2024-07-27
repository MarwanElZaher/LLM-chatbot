import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { getChatResponse } from '../gemini';

const Dictaphone = () => {
  const [response, setResponse] = useState(null)
  const [lastTranscript, setLastTranscript] = useState("")
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  

  useEffect(() => {
    if (transcript !== lastTranscript && !listening) {
      setLastTranscript(transcript);
      handleSend(transcript);
    }
  }, [transcript, listening, lastTranscript]);

  const startRecording = () => {
    resetTranscript();
    setResponse(null)
    SpeechRecognition.startListening({ language: "ar-EG", continues: true })
  }
  const stopRecording = () => {
    SpeechRecognition.stopListening()
  }
  const handleSend = async (text) => {
    try {
      const chatResponse = await getChatResponse(text);
      setResponse(chatResponse);
    } catch (error) {
      console.error('Error fetching response from OpenAI:', error);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={() => {
       startRecording()
      }}>Start</button>
      <button onClick={() => {
        stopRecording()
      }}>Stop</button>
      <p>message: {transcript}</p>
      {response && <p>Response: {response}</p>}
    </div>
  );
};
export default Dictaphone;