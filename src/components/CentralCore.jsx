"use client";
import Tilt from 'react-parallax-tilt';
import React, { useState, useEffect, useRef } from 'react';
import Typewriter from './useTypingEffect';
import NucleusComponent from './Nucleus';
import { motion } from 'framer-motion';

const CentralCore = ({ page, greeted, setGreeted, messageIndex, setMessageIndex }) => {
  const getInitialMessage = () => {
    const messages = {
      'dashboard': [
        'Hello, my name is Jarvis! How can I assist you today?',
        'Ask me anything. I can try to do my best to help you.',
        'Your command center awaits! Let’s take action!',
      ],
      'suits': [
        'Looking for a stylish suit or a powerful one?',
        'Armor up! Which suit will define your mission today?',
        'Choose wisely; your suit could be the difference between victory and defeat!',
      ],
      'missions': [
        "Here's where you can see the latest missions.",
        'What mission will challenge you next? Choose carefully.',
        'Ready for your next mission? Let’s see what awaits!',
      ],
      'stats': [
        'This is where you can check on data and research. Turn the power knob to test out different approaches.',
        'You can drag elements around to organize your workspace however you so please.',
        'Analyze, adapt, conquer. Your stats hold the key to victory.',
      ],
      'arc': [
        'Checking your vitals is important. You can run commands to make sure the core is running smoothly.',
        'Making sure your arc reactor is in good shape?',
        'Your code looks pretty amateur, I\'d say to brush up on your work.',
      ],
    };

    const pageMessages = messages[page];
    const index = messageIndex[page];
    if (pageMessages) {
      return pageMessages[index % pageMessages.length];
    }

    return 'Welcome!';
  };

  const [messages, setMessages] = useState([{ role: 'core', content: getInitialMessage() }]);
  const [input, setInput] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  const chatRef = useRef(null);
  const [pageLoaded, setPageLoaded] = useState(false);

  const handleClickOutside = (event) => {
    if (chatRef.current && !chatRef.current.contains(event.target)) {
      setShowChat(false);
      setShowChatBox(false);
    }
  };

  useEffect(() => {
    if (greeted && page === "dashboard") return;

    if (!pageLoaded) {
      const timeout = setTimeout(() => {
        speak(messages[messages.length - 1].content);
        setShowChat(true);
        if (page === "dashboard") setShowChatBox(true);

        setPageLoaded(true);
        if (typeof setGreeted === 'function') {
          setGreeted(true);
        }

        setMessageIndex((prevIndex) => ({
          ...prevIndex,
          [page]: prevIndex[page] + 1,
        }));
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    if (showChat) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showChat]);

  const speak = (text) => {
    speechSynthesis.cancel(); // Clear any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);

    const loadVoicesAndSpeak = () => {
      const voices = speechSynthesis.getVoices();
      const jarvisVoice = voices.find((voice) => voice.name === 'Google UK English Male');
      if (jarvisVoice) {
        utterance.voice = jarvisVoice;
      }
      utterance.pitch = 0.6;
      utterance.rate = 1.05;
      speechSynthesis.speak(utterance);
    };

    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.onvoiceschanged = loadVoicesAndSpeak;
    } else {
      loadVoicesAndSpeak();
    }
  };

  useEffect(() => {
    const silentUtterance = new SpeechSynthesisUtterance('');
    speechSynthesis.speak(silentUtterance);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const botResponse = await sendMessageToAI(input);
    setMessages((prevMessages) => [...prevMessages, { role: 'core', content: botResponse }]);

    setInput('');
    speak(botResponse);
  };

  const sendMessageToAI = async (message) => {
    const response = await fetch('/api/aiChat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    return data.response;
  };

  return (
    <div ref={chatRef}>
      {showChat && (
        <div className={`${messages[messages.length - 1]?.role === 'core' ? 'text-cyan-500' : 'text-gray-500'} -mt-14 text-center`}>
          <Typewriter text={messages[messages.length - 1]?.content} delay={50} />
        </div>
      )}

      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.05} className='mt-6'>
        <div className="border-4 border-blue-400 rounded-full w-96 h-96 flex items-center justify-center mx-auto hover:cursor-pointer opacity-40"
          style={{
            borderTop: 'dotted 6px',
            borderRight: 'double 6px ',
            borderBottom: 'double 6px ',
            borderLeft: 'dotted 6px',
            animation: 'rotateCounterClockwise 12s linear infinite',
          }}
        >
          <div className="border-2 border-blue-500 rounded-full w-80 h-80 flex items-center justify-center"
            style={{
              borderTop: 'dotted 15px',
              borderRight: 'dotted 15px ',
              borderBottom: 'double 15px ',
              borderLeft: 'double 15px',
              animation: 'rotateClockwise 6s linear infinite',
            }}
          >
            <div className="border-2 border-blue-500 rounded-full w-64 h-64 flex items-center justify-center"
              style={{
                borderRight: 'dotted 6px',
                borderTop: 'double 6px ',
                borderLeft: 'double 6px ',
                borderBottom: 'dotted 6px',
                animation: 'rotateCounterClockwise 6s linear infinite',
              }}
            >
              <div className="w-48 h-48 rounded-full animate-pulse bg-[length:800px_500px] border-blue-600 border-4 -z-10"
                style={{
                  backgroundImage: `url('https://i.makeagif.com/media/4-06-2018/3avdSG.gif')`,
                  border: 'solid 6px',
                  animation: 'rotateClockwise 12s linear infinite, pulse 10s infinite',
                }}
              ></div>
            </div>
          </div>
        </div>
      </Tilt>

      <motion.div initial={{ opacity: 0.9, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0.9, scale: 0.8 }}
        className='absolute top-4 inset-0 m-auto justify-items-center'>
        <NucleusComponent onClick={() => { setShowChat(true); setShowChatBox(true); speak(messages[messages.length - 1].content) }} />
      </motion.div>

      {showChatBox && (
        <div className="flex items-center">
          <input
            className="p-2 w-full border-2 border-transparent bg-gray-800/50 text-cyan-500/50 backdrop-blur-lg"
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your response..."
          />
          <button className="p-2 ml-2 bg-cyan-600 text-white rounded z-10" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default CentralCore;
