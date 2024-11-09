import React from 'react'
import HelmetModel from './models/Helmet'
import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

const SuitsPreview = () => {

  const [loadComponent, setLoadComponent] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoadComponent(true), (0.5) * 1100); // Adjust buffer as needed
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className='grid grid-cols-2 mt-4'> 

        <div className=' align-center border-r-2 rounded-xl border-cyan-900 max-h-[100px] '>
            <img src="./suit-preview.png"
            className='w-1/2  fade-animation -mt-3'></img>
        </div>

        <div className=' max-h-[120px] '>
       {loadComponent ?  <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      ><HelmetModel /> </motion.div> : null}
        </div>
    </div>
  )
}

export default SuitsPreview