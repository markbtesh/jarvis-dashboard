import CentralCore from './CentralCore';
import StatBox from './StatBox';
import ProgressBar from './ProgressBar';
import LineChart from './LineChart';
import UpsideDownBarChart from './UpsideDownLineChart';
import FuturisticMap from './FuturisticMap';
import SegmentedProgressBar from './SegmentedProgressBar';
import SuitsPreview from './SuitsPreview';
import ArcReactor from './models/ArcReactorSmall';
import WaveformComponent from './models/Waveform';
import Segment  from './Segments'
import { motion } from 'framer-motion';
import { fadeIn, textVariant, slideIn } from '../utils/motion';
import ArcReactorPreview from './ArcReactorPreview';

const DashboardLayout = ({ onSwitchLayout, greeted, setGreeted, messageIndex, setMessageIndex}) => {
  return (
    <div>
      <motion.div initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      >
<div className="relative bg-black  w-full h-32 p-4 px-20 w-6xl flex justify-between items-center border-b-2 border-blue-500">
      {/* Left side panels */}
      <div className="flex space-x-4">
        <div className="bg-gray-800 border border-cyan-400 text-cyan-500 w-40 h-10 flex items-center justify-center rounded-lg shadow-glow border-r-0 border-l-0">
          <span>Navigation</span>
        </div>
        <div className="bg-gray-800 border border-cyan-400 text-cyan-500 w-40 h-10 flex items-center justify-center rounded-lg shadow-glow border-r-0 border-l-0">
          <span>Commands</span>
        </div>
        <div className="bg-gray-800 border border-cyan-400 text-cyan-500 w-40 h-10 flex items-center justify-center rounded-lg shadow-glow border-r-0 border-l-0">
          <span>Sensors</span>
        </div>
      </div>
   

      {/* Middle vertical elements */}
      <div className="flex space-x-4">
        <div className="bg-gray-800 border border-cyan-400 w-10 h-16 rounded-lg shadow-glow border-t-0 border-b-0">
          <Segment value={100} length={5}/>
        </div>
        <div className="bg-gray-800 border border-cyan-400 w-10 h-16 rounded-lg shadow-glow border-r-0 border-l-0 pl-[1px]">
        <Segment value={60} length={5}/>
        </div>
        <div className="bg-gray-800 border border-cyan-400 w-10 h-16 rounded-lg shadow-glow border-t-0 border-b-0">
          <Segment value={100} length={5}/></div>
      </div>

      {/* Right side elements */}
      <div className="flex space-x-4">
        <div className="bg-gray-800 border border-cyan-400 text-cyan-500 w-40 h-10 flex items-center justify-center rounded-lg shadow-glow border-r-0 border-l-0">
          <span>Data Hub</span>
        </div>
        <div className="bg-gray-800 border border-cyan-400 text-cyan-500 w-40 h-10 flex items-center justify-center rounded-lg shadow-glow border-r-0 border-l-0">
          <span>Comms</span>
        </div>
      </div>
    </div>
 
   
    
      {/* Main Middle section */}
    <div className="relative bg-black pulse-inset py-32 pb-60 flex flex-col justify-center items-center">
      <div className="grid grid-cols-3 gap-4 w-full max-w-[90rem] items-center">
        {/* Left Panels (Panel 1 & 2) */}
        <div className="flex flex-col space-y-20 w-80 z-10">
          <StatBox title="System Analytics" 
          component={ <div className="p-2">
            <SegmentedProgressBar value={60} />
            <SegmentedProgressBar  value={80} />
            <SegmentedProgressBar  value={45} />
    
          </div>} 
          clickTo={() => onSwitchLayout('system')} 
          slide='left' 
          delay={0.2}/>
          
          <StatBox title="Arc Reactor" 
          component={<ArcReactorPreview />}
          clickTo={() => onSwitchLayout('arc')} 
           slide='left'
           delay={0.4}/>
        </div>

        {/* Central Core */}
        <div className="flex justify-center">
          <CentralCore page="dashboard" greeted={greeted} setGreeted={setGreeted} messageIndex={messageIndex} setMessageIndex={setMessageIndex}/>
        </div>

        {/* Right Panels (Panel 5 & 6) */}
        <div className="flex flex-col space-y-10 w-80 justify-self-end">
          <StatBox title="Suits" 
          component={<SuitsPreview/>} 
          clickTo={() => onSwitchLayout('suits')} 
          slide='right'
          delay={0.3}/>

          <StatBox title="Missions" 
          component={<FuturisticMap />} 
          clickTo={() => onSwitchLayout('missions')} 
          slide='right'/>
          
        </div>
      </div>

      
    </div>  </motion.div>

    
{/* Bottom Section */}
<motion.div initial={{  translateY: 200 }}
      animate={{ translateY: 0 }}
      exit={{ translateY: 200 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      >
    <div className="grid grid-cols-4 gap-4 p-4 border-t-2 border-cyan-500 absolute w-full bottom-0">
      {/* Left Side with Progress Bars */}
      <div className="space-y-4 p-10 pt-0 pb-4 border-2 border-cyan-600 border-r-0 border-t-0">
      <ProgressBar label="Engine Calibration" initialValue={60} />
        <ProgressBar label="Core Power Output" initialValue={80} />
        <ProgressBar label="Thermal Regulation" initialValue={45} />
      </div>

      <div className="space-y-4 justify-self-center">
      
        <UpsideDownBarChart />
      </div>

      {/* Center with Line Chart */}
      <div className="space-y-4 pr-10 pt-3 ">
      
        <LineChart />
        <ProgressBar label="Threat Detection" staticValue={45} />
      </div>

      {/* Right Side with Another Progress Bars or Chart */}
      <div className="space-y-4 p-10 pb-4 border-4 border-cyan-600 border-r-0 border-b-0 border-double">
        <ProgressBar label="Energy Flow" staticValue={70} />
        <ProgressBar label="Network Integrity" staticValue={90} />
      </div>
    </div>
    </motion.div>
</div>

  );
};

export default DashboardLayout;
