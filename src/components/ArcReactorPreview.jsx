import React from 'react'
import ArcReactorSmall from './models/ArcReactorSmall';
import WaveformComponent from './models/Waveform';
import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

const ArcReactorPreview = () => {
    const [loadComponent, setLoadComponent] = useState(false);

    useEffect(() => {
      const timeout = setTimeout(() => setLoadComponent(true), (0.5) * 1200); // Adjust buffer as needed
      return () => clearTimeout(timeout);
    }, []);
  
    return (
    <div>
         {loadComponent ? 
         <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      > <div className='max-h-[130px] overflow-hidden'> 
            <ArcReactorSmall /> <WaveformComponent style={{ width: '100%', height: '300px', marginTop: '-140px'}} fov='40'/> <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent to-gray-800 pointer-events-none"></div>
  
            </div>
             </motion.div> : null}
          </div>
 
    )
  
}

export default ArcReactorPreview