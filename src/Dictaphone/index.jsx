import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { getChatResponse } from '../gemini';
import { extractMessage } from '../utils/helperFunctions';

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
    SpeechRecognition.startListening({ language: "ar-eg", continues: true })
  }
  const stopRecording = () => {
    SpeechRecognition.stopListening()
  }
  const handleSend = async (text) => {
    try {
      const chatResponse = await getChatResponse(text);
      console.log(chatResponse)
      setResponse(chatResponse);
    } catch (error) {
      console.error('Error fetching response from OpenAI:', error);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className='chat-model-container'>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={() => {
       startRecording()
      }}>Start</button>
      <button onClick={() => {
        stopRecording()
      }}>Stop</button>
      <div className='message-container'>
        <label>message:</label>
        <p> {transcript}</p>
      </div>
      

      <div className='response-container'>
      {response && <p>Response: {extractMessage(response)}</p>}
      </div>
      
    </div>
  );
};
export default Dictaphone;