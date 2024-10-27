import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { setResponse, setError, clearResponse } from '../features/modelSlice'; // Adjust the path
import { getChatResponse } from '../gemini'; // Make sure this is correctly imported

const Dictaphone = () => {
  const dispatch = useDispatch();
  const { action, target, message, error } = useSelector((state) => state.model);
  const [lastTranscript, setLastTranscript] = useState("");

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
    dispatch(clearResponse());
    SpeechRecognition.startListening({ language: "ar-eg", continues: true });
  };

  const stopRecording = () => {
    SpeechRecognition.stopListening();
  };

  const handleSend = async (text) => {
    try {
      const response = await getChatResponse(text);
      dispatch(setResponse(response));
    } catch (err) {
      dispatch(setError('Error fetching response'));
      console.error('Error fetching response:', err);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className='chat-model-container'>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={startRecording}>Start</button>
      <button onClick={stopRecording}>Stop</button>
      <div className='message-container'>
        <label>Message:</label>
        <p>{transcript}</p>
      </div>
      <div className='response-container'>
        {error && <p className='error-message'>Error: {error}</p>}
        {message && <p>Response: {message}</p>}
        {action && <p>Action: {action}</p>}
        {target && <p>Target: {target}</p>}
      </div>
    </div>
  );
};

export default Dictaphone;
