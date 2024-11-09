"use client";

import Tilt from 'react-parallax-tilt';
import React, { useState, useEffect, useRef } from 'react';
import Typewriter from './useTypingEffect';
import NucleusComponent from './Nucleus';

import { motion } from 'framer-motion';

const CentralCore = ({page, greeted, setGreeted, messageIndex, setMessageIndex}) => { 
  
  const getInitialMessage = () => {
    const messages = {
      'dashboard': [
        'Hello, my name is Jarvis! How can I assist you today?',
        'Ask me anything. I can try to do my best to help you.',
        'Your command center awaits! Let’s take action!',
      ],
      'suits': [
        'Looking for a styling suit or a powerful one?',
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
        'Your code looks pretty ametuer, I\'d say to brush up on your work.',
      ],
    };
  
    // Randomly pick a message from the relevant page's array
    const pageMessages = messages[page];
    const index = messageIndex[page];
    if (pageMessages) {
      return pageMessages[index % pageMessages.length];
    }
  
    return 'Welcome!'; // Fallback message if no matching page is found
  };
  
  
  const [messages, setMessages] = useState([{ role: 'core', content: getInitialMessage()}]);
  const [input, setInput] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  const chatRef = useRef(null); // Ref to the chat element
  const [pageLoaded, setPageLoaded] = useState(false);



  const handleClickOutside = (event) => {
    // Check if the clicked target is outside the chat component
    if (chatRef.current && !chatRef.current.contains(event.target)) {
      setShowChat(false); // Set the showChat to false
      setShowChatBox(false);
    }
  };

  
  useEffect(() => {
    
    if (greeted && page === "dashboard") return;

    if (!pageLoaded) {
     
      const timeout = setTimeout(() => {
      
      speak(messages[messages.length - 1].content)
      setShowChat(true);
      if (page === "dashboard")
        setShowChatBox(true);

      setPageLoaded(true);
      
      if (typeof setGreeted === 'function') {
      setGreeted(true)
      }

      setMessageIndex((prevIndex) => ({
        ...prevIndex,
        [page]: prevIndex[page] + 1, // Increment message index for the current page
      }));

    }, 1000); // Adjust buffer as needed
      return () => clearTimeout(timeout);
    }

  }, [])

  useEffect(() => {
    if (showChat) {
      // Attach the event listener when chat is open
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      // Remove the event listener when chat is closed
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showChat]);

  // Define the speak function inside CentralCore
  const speak = (text) => {
    // Avoid speaking if already in progress
    if (speechSynthesis.speaking) return;
  
    const utterance = new SpeechSynthesisUtterance(text);
  
    // Wait for voices to load
    const loadVoicesAndSpeak = () => {
      const voices = speechSynthesis.getVoices();
      const jarvisVoice = voices.find((voice) => voice.name === 'Google UK English Male');
      if (jarvisVoice) {
        utterance.voice = jarvisVoice;
        speechSynthesis.speak(utterance);
      }
    };
  
    if (speechSynthesis.getVoices().length === 0) {
      // If voices aren't loaded, set an event listener
      speechSynthesis.onvoiceschanged = loadVoicesAndSpeak;
    } else {
      // Otherwise, speak immediately
      loadVoicesAndSpeak();
    }
  };
  
  useEffect(() => {
    const silentUtterance = new SpeechSynthesisUtterance('');
    speechSynthesis.speak(silentUtterance); // Trigger voice loading
  }, []);


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Trigger a function when Enter is pressed
      handleSendMessage();
    }
  };


  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user's message to chat
    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Simulate sending message to AI, replace this with an actual API call
    const botResponse = await sendMessageToAI(input); // You can replace this with OpenAI call
    setMessages((prevMessages) => [...prevMessages, { role: 'core', content: botResponse }]);

    // Reset input box
    setInput('');

    // Optionally: Use text-to-speech to speak out loud the core's response
    speak(botResponse);
  };

  const sendMessageToAI = async (message) => {
    const response = await fetch('/api/aiChat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    return data.response;
  };


  return (
    <div  ref={chatRef} >

      {/* Text area */}
      { showChat === true ?
      <div className={`${messages[messages.length - 1]?.role === 'core' ? 'text-cyan-500' : 'text-gray-500'} -mt-14 text-center`}>
       
          <Typewriter text={messages[messages.length - 1]?.content} delay={50}  />
          
        
       
      </div>
      : ( <p></p>)}
   

       {/* Central Core area */}
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
            }}>
            <div className="border-2 border-blue-500 rounded-full w-64 h-64 flex items-center justify-center"
              style={{
                borderRight: 'dotted 6px',
                borderTop: 'double 6px ',
                borderLeft: 'double 6px ',
                borderBottom: 'dotted 6px',
                animation: 'rotateCounterClockwise 6s linear infinite',
              }}>
              <div className="w-48 h-48 rounded-full animate-pulse bg-[length:800px_500px] border-blue-600 border-4 -z-10"
                style={{
                  backgroundImage: `url('https://i.makeagif.com/media/4-06-2018/3avdSG.gif')`,
                  border: 'solid 6px',
                  animation: 'rotateClockwise 12s linear infinite, pulse 10s infinite',
                }}>
              </div>
            </div>
          </div>
        </div>
      </Tilt>

      <motion.div initial={{opacity: 0.9, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0.9, scale: 0.8 }} 
      className='absolute top-4 inset-0 m-auto justify-items-center'>
      <NucleusComponent onClick={() => { setShowChat(true); setShowChatBox(true);
            speak(messages[messages.length - 1].content)}}/>
      </motion.div> 

      { showChatBox === true ?
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
      : ( <p></p>)}
    </div>
  );
};

export default CentralCore;
