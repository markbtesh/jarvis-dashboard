import React, { useState } from 'react'
import CentralCore from './CentralCore'
import StatBox from './StatBox'
import { motion } from 'framer-motion';
import SuitPicker from './models/SuitPicker';

import Tilt from 'react-parallax-tilt';
import MovingLineChart from './MovingLineChart';
import TechCircle from './TechCircle';
import BackButton from './BackButton';


const SuitsLayout = ({ onSwitchLayout, messageIndex, setMessageIndex }) => {

  return (
    <div className="relative min-h-screen pb-60 flex ">
 
    <SuitPicker   />


    <motion.div initial={{ translateX: -450, opacity: 0, scale: 0.5 }}
      animate={{ translateX: 0, translateY: -75, opacity: 1, scale: 0.85 }}
      exit={{ translateX:  -450, opacity: 0, scale: 0.5 }}
      transition={{ duration: 1, delay: 0.2 }}
      whileHover={{ scale: 0.87}}
      className="flex justify-left scale-90 px-10">
         <div className="flex flex-col space-y-20 w-96 py-32">
          <CentralCore page='suits' messageIndex={messageIndex} setMessageIndex={setMessageIndex}/>
          </div>  
       
        </motion.div>
       

        <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className='absolute bottom-[33%] left-[5%]'
   
      >
        <div className='scale-150'>
        <Tilt  tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.01}>
        <TechCircle colorPrime={'border-gray-700/85'} colorSecond={'border-gray-500/85'} label="96%"/>
        </Tilt>
        </div>
      
        </motion.div>


        <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className='absolute bottom-[28%] left-[18%]'
      >
          <div className='scale-110  rotate-90'>
        <Tilt  tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.01}>
        <TechCircle colorPrime={'border-gray-700/85'} colorSecond={'border-gray-500/85'}/>
        </Tilt>
        </div>
      
        </motion.div>
       

        <motion.div
        initial={{ translateY: 300 }}
        animate={{ translateY: 0 }}
        exit={{ translateY: 300 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="absolute bottom-8 left-[20%]"
        
      >
        <Tilt tiltAngleYInitial={-10} tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.01}>
          <div className=""
        
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
          }}>
            <MovingLineChart />
       </div>
       </Tilt>
      </motion.div>


        <div  className="w-40 absolute bottom-14 pl-10">
        <BackButton slide="left" clickTo={() => onSwitchLayout('dashboard')} />
      </div>
        </div>
  )
}

export default SuitsLayout