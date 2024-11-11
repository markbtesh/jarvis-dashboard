import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import Tilt from 'react-parallax-tilt';
import ReactorModel from './models/ArcReactor';
import BackButton from './BackButton';
import WaveformComponent from './models/Waveform';
import ArcReactorSmall from './models/ArcReactorSmall';
import { motion } from 'framer-motion';
import CentralCore from './CentralCore';
import ReactorScene from './models/ArcReactor';

// Main Arc Reactor Interface Component
const ArcReactorUI = ({ onSwitchLayout, messageIndex, setMessageIndex }) => {
    return (
        <div className="min-h-screen text-cyan-500 grid grid-cols-12 gap-4 p-8">
            <LeftPanel messageIndex={messageIndex} setMessageIndex={setMessageIndex}/>
            
            <div className='col-span-8 relative flex justify-center items-center'>
            <div className='absolute top-0 left-4'>
            <h4 className="glow border border-white text-white bg-cyan-800 inline-block p-2 mr-4 text-2xl">Arc Reactor</h4>
            <CommandPrompt />
            </div>
            <ReactorScene />
            </div>
            <RightPanel />
            
    
            <BottomStats />
           
            <div  className="w-40  absolute bottom-32 right-10 pl-10"
      >
        <BackButton slide="right" clickTo={() => onSwitchLayout('dashboard')} />
      </div>
        </div>
    );
};

const CommandPrompt = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState([
    'Initializing system protocols...',
    'Diagnostics: All systems operational.',
    'C:\\Users\\CORE> help',
    'Available commands: help, reboot, hello, status, diagnostics, weather, time',

  ]);

  // Handle command input
  const handleInputChange = (e) => setCommand(e.target.value);

  // Handle command submission
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      processCommand(command);
      setCommand('');
    }
  };

  // Process the input command
  const processCommand = (cmd) => {
    let newOutput = [...output, `C:\\Users\\CORE> ${cmd}`];

    switch (cmd.toLowerCase()) {
        case 'status':
          newOutput.push('All systems are online and functioning at full capacity.');
          newOutput.push('Power levels: 89% - Reactor stable.');
          break;
        case 'diagnostics':
          newOutput.push('Running full system diagnostics...');
          newOutput.push('Diagnostics complete: No issues detected.');
          newOutput.push('Security protocols active.');
          break;
       
        case 'weather':
          newOutput.push('Retrieving latest weather updates...');
          newOutput.push('Current weather in New York: Sunny, 25°C.');
          break;
        case 'time':
          newOutput.push(`Current time: ${new Date().toLocaleTimeString()}`);
          break;
        case 'hello':
          newOutput.push('Hello, Sir. How may I assist you today?');
          break;
        case 'shutdown':
          newOutput.push('Initiating shutdown sequence...');
          newOutput.push('Goodbye, Sir.');
          break;
        case 'reboot':
            newOutput = ['Rebooting systems...',
                         'All systems back online.'
            ]
          newOutput.push();
          newOutput.push();
          break;
           case 'dir':
        newOutput.push(' Directory of C:\\Users\\User');
        newOutput.push('01/01/2024  12:00 PM    <DIR>          Documents');
        newOutput.push('01/01/2024  12:00 PM    <DIR>          Downloads');
        newOutput.push('01/01/2024  12:00 PM    <DIR>          Pictures');
        newOutput.push('01/01/2024  12:00 PM    <DIR>          Desktop');
        newOutput.push('               0 File(s)              0 bytes');
        break;
      case 'cd':
        newOutput.push('The system cannot find the path specified.');
        break;
           case 'ipconfig':
        newOutput.push('Windows IP Configuration');
        newOutput.push('   Ethernet adapter Ethernet:');
        newOutput.push('      Connection-specific DNS Suffix  . : example.local');
        newOutput.push('      IPv4 Address. . . . . . . . . . . : 192.168.1.101');
        newOutput.push('      Subnet Mask . . . . . . . . . . . : 255.255.255.0');
        newOutput.push('      Default Gateway . . . . . . . . . : 192.168.1.1');
        break;
      case 'ping':
        newOutput.push('Pinging example.com [93.184.216.34] with 32 bytes of data:');
        newOutput.push('Reply from 93.184.216.34: bytes=32 time=20ms TTL=54');
        newOutput.push('Reply from 93.184.216.34: bytes=32 time=18ms TTL=54');
        newOutput.push('Reply from 93.184.216.34: bytes=32 time=19ms TTL=54');
        newOutput.push('Reply from 93.184.216.34: bytes=32 time=21ms TTL=54');
        newOutput.push('Ping statistics for 93.184.216.34:');
        newOutput.push('    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),');
        break;
      case 'systeminfo':
        newOutput.push('Host Name:                 USER-PC');
        newOutput.push('OS Name:                   Microsoft Windows 10 Pro');
        newOutput.push('OS Version:                10.0.19042 N/A Build 19042');
        newOutput.push('System Manufacturer:       Example Manufacturer');
        newOutput.push('System Model:              Example Model');
        newOutput.push('Processor(s):              1 Processor(s) Installed.');
        newOutput.push('                           [01]: Intel64 Family 6 Model 158 Stepping 10');
        newOutput.push('Total Physical Memory:     16,384 MB');
        break;
      case 'tasklist':
        newOutput.push('Image Name                     PID Session Name        Session#    Mem Usage');
        newOutput.push('========================= ======== ================ =========== ===========');
        newOutput.push('chrome.exe                    1234 Console                    1     200,000 K');
        newOutput.push('explorer.exe                  5678 Console                    1      40,000 K');
        newOutput.push('cmd.exe                       9101 Console                    1       5,000 K');
        break;
          case 'help':
            newOutput.push('Available commands: help, reboot, hello, status, diagnostics, weather, time');
            break;
        default:
          newOutput.push(`'${cmd}' is not recognized as a valid command.`);
      }

    setOutput(newOutput);
  };

  return (
    <div style={styles.container}>
      <div style={styles.output} className='scrollbar-thumb-cyan-400 scrollbar-track-gray-700 scrollbar-thin'>
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <div style={styles.prompt}>
      <span>C:\Users\CORE&gt;</span>  
        <input
          style={styles.input}
          type="text"
          value={command}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
    </div>
  );
};
  
  // Styling for the component
  const styles = {
    container: {
      color: 'white',
      fontFamily: 'monospace',
      padding: '20px',
    },
    output: {
      whiteSpace: 'pre-wrap',
      marginBottom: '10px',
      overflowY: 'auto',
      maxHeight: '30vh',
      maxWidth: '20vw'
    },
    prompt: {
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      backgroundColor: 'transparent',
      color: 'white',
      border: 'none',
      outline: 'none',
      fontFamily: 'monospace',
      flex: 1,
    },
  };

// Left Panel with Temperature and Additional Data
const LeftPanel = ({messageIndex, setMessageIndex}) => {
    return (
        <div className="col-span-2 flex flex-col gap-8 space-y-4">

<motion.div initial={{ translateX: -450, opacity: 0, scale: 0.3 }}
      animate={{ translateX: 0, translateY: -100, opacity: 1, scale: 0.5 }}
      exit={{ translateX:  -450, opacity: 0, scale: 0.3 }}
      transition={{ duration: 1, delay: 0.2 }}
      whileHover={{ scale: 0.6}}
      className="flex justify-left h-60 ">
         <div className="flex flex-col space-y-20 pt-28 -ml-10">
          <CentralCore page='arc' messageIndex={messageIndex} setMessageIndex={setMessageIndex}/>
          </div>  
       
        </motion.div>
            <div className="flex">
                <div className=' border rounded-full w-24  h-24'>
                    <div className='-translate-y-5 -translate-x-1 -scale-90'>
                <ArcReactorSmall />
                </div>
                </div>
                <div className="text-xs w-36 bg-gray-800/10 rounded-md p-2">
                    <p>Reactor: 234°C</p>
                    <p>Heat Exchanger: 288°C</p>
                    
                    <p>Cooling Tower: 224°C</p>
                </div>
            </div>
            <div className="flex">
                <div className=' border rounded-full w-24  h-24 animate-reverse-spin'>
                    <div className='ml-2 mt-2 '>
                <div className=''>
                <div className='absolute mt-6 w-14 h-14 bg-gray-900 rounded-full border border-r-0 border-t-0'></div>
                <div className='absolute ml-6 w-14 h-14 bg-gray-900 rounded-full border border-l-0 border-b-0'></div>
                <div className='absolute w-6 h-6 bg-cyan-300 rounded-full glow-animation ins0'></div>
                </div>
                </div>
                </div>
                <div className="text-xs w-36 bg-gray-800/10 rounded-md p-2">
                    <p>Radiation Levels</p>
                    <p>Level 1: 77%</p>
                    <p>Level 2: 62%</p>
                    <p>Level 3: 71%</p>
                </div>
            </div>

            <div className="flex">
                <div className=' border rounded-full w-24  h-24 '>
                    <div className='ml-4'>
                <div className=''>
                <div className='w-16 h-16 bg-gray-900 rounded-full mt-4 animate-rotation-z border-2 border-gray-800 border-l-cyan-400 border-r-cyan-300'>
                <div className='absolute w-6 h-6 bg-cyan-300 rounded-full glow-animation ins0 border-2 border-white border-t-cyan-400 border-b-cyan-500'></div>
                </div>
                
                </div>
                </div>
                </div>
                <div className="text-xs w-36 bg-gray-800/10 rounded-md p-2">
                    <p>Radiation Levels</p>
                    <p>Level 1: 77%</p>
                    <p>Level 2: 62%</p>
                    <p>Level 3: 71%</p>
                </div>
            </div>
            
           
        </div>
    );
};



// Right Panel with System Checks
const RightPanel = () => {
    return (
        <div className="col-span-2 flex flex-col gap-4 -ml-20">
           <CodeEditorTabs />
           <MockServerLog />
        </div>
    );
};

// Bottom Stats with Core Temperature and Other Information
const BottomStats = () => {
    return (
        <div className="col-span-12 grid-cols-2 grid justify-around p-4  mt-4 rounded-lg absolute bottom-20 w-full">
            <div className='border-b border-white self-end flex'>
                <h4 className="glow text-white pr-1">Core Temp:</h4>
                <h2 className='text-3xl'>83.29°C</h2>
            </div>
            
            <div className='bg-gray-800/10 p-5 ' >

            <div className='grid-cols-4 grid gap-3'>
               <div className=''>
                <h4 className="glow border border-white text-white bg-cyan-800 inline-block p-2 mr-4">Reactor Core</h4>
                <div class="font-sans text-[#b8f1ff] text-sm pt-2">
                    <div class="text-md font-bold mb-2">TEMPERATURES</div>
                    <div class="flex justify-between">
                      <span>REACTOR</span>
                      <span>234</span>
                     </div>
                     <div class="flex justify-between">
                       <span>HEAT EXCHANGE</span>
                       <span>266</span>
                     </div>
                     <div class="flex justify-between">
                       <span>COOLING TOWER</span>
                       <span>289</span>
                     </div>

                    </div>
                </div>

                <div className=''>
                  <div className='bg-teal-900 border border-white inline-block w-96 p-2'>
                  <h4 className="glow">RADIATION SYSTEM CHECK</h4>
                  <div className='grid grid-cols-4 text-3xl'>
                  <p>77%</p>
                  <p>82%</p>
                  <p>92%</p>
                  <p>67%</p>
                     </div>
                </div>
        
                <FlashingCells />
               
                </div>
                <div class="mt-24 text-xs text-[#b8f1ff] ">
                 <div>MP - PROTON REST MASS</div>
                 <div>MN - NEUTRON REST MASS</div>
             </div>

                </div>
                <WaveformComponent style={{ width: '30vw', height: 'auto', marginBottom: '-40px', marginTop: '-35px'}} fov='20'/>
              
            </div>
        </div>
    );
};

const CodeEditorTabs = () => {
    const [activeTab, setActiveTab] = useState('core.sx');
  
    const [tabContent, setTabContent] = useState({
        'core.sx': `import { Html, useProgress } from '@react-three/drei';


const Loader = () => {
  const {progress} = useProgress();
  return (
    <Html>
    <span className="canvas-load"></span>
    <p
    style={{
      fontSize: 14,
      color: '#f1f1f1',
      fontWeight: 800,
      marginTop: 40

    }}
    >{progress.toFixed(2)}$</p>

    </Html>
  )
}

export default Loader`,
        'rdial.sx': `const RadialGauge = ({ value, label }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const progress = (value / 100) * circumference;
  
    return (
      <div className="relative flex flex-col items-center justify-center w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} stroke="gray" strokeWidth="2" fill="none" />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke="cyan"
            strokeWidth="2"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
          />
        </svg>
        <div className="absolute text-white">
          <span className="text-xl">{value}%</span>
          <span className="text-sm block">{label}</span>
        </div>
      </div>
    );
  };`,
        'lodr.sx': `const particlesMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
          },
          vertexShader: \`
            uniform float time;
            attribute float alpha;
            varying float vAlpha;
            varying vec2 vUv;
          
            void main() {
              vUv = uv;
              vec3 pos = position;
          
              // Ripple effect on position for breathing movement
              pos.x += sin(pos.y * 10.0 + time * 2.0) * 0.1;
              pos.y += cos(pos.x * 10.0 + time * 2.0) * 0.1;
          
              vAlpha = alpha;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = 3.0; // Size of each particle
            }
          \`,
          fragmentShader: \`
            uniform float time;
            varying vec2 vUv;
            varying float vAlpha;
          
            void main() {
              // Color ripple transition
              vec3 cyanColor = vec3(0.0, 0.9, 1.0);  // Cyan base color
              float brightness = 0.9 + 0.1 * sin(time + vUv.x * 5.0); // Ensure brightness stays between 0.7 and 1.0
              vec3 color = cyanColor * brightness;  // Apply brightness scaling
          
              gl_FragColor = vec4(color, vAlpha * 0.8);
            }
          \`,
          transparent: true,`,
            });
          
    

    const handleCodeChange = (e) => {
        setTabContent({
          ...tabContent,
          [activeTab]: e.target.value,
        });
      };
  
    return (
        <div className="p-2 bg-gray-800 bg-opacity-50 backdrop-blur-lg text-white rounded-lg shadow-lg space-y-4 z-10">
        <div className="flex space-x-1 border-b border-gray-700 pb-2 text-xs">
          {Object.keys(tabContent).map((tabId) => (
            <button
              key={tabId}
              onClick={() => setActiveTab(tabId)}
              className={`px-2 py-1  transition-colors duration-300 ${
                activeTab === tabId
                  ? 'bg-[#1F1F1F] text-white'
                  : 'bg-[#181818] text-gray-400 hover:bg-gray-700'
              }`}
            >
              {tabId.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="bg-[#1a191981] backdrop-blur-lg p-4 rounded-md shadow-inner text-sm font-mono leading-relaxed h-72  overflow-hidden">
      
        <textarea
          className="w-full h-72 bg-transparent border-none outline-none resize-none text-white scrollbar-thumb-gray-400 scrollbar-track-gray-700 scrollbar-thin pr-8"
          value={tabContent[activeTab]}
          onChange={handleCodeChange}
        />
         
        </div>
      </div>
    );
  };


  const MockServerLog = () => {
    const [logs, setLogs] = useState([
      '[INFO] Server starting up...',
      '[INFO] Initializing subsystems...',
      '[INFO] Connecting to database...',
      '[SUCCESS] Database connected.',
    ]);
  
    // Function to generate random log messages
    const generateLogMessage = () => {
      const logLevels = ['INFO', 'SUCCESS', 'ERROR', 'WARNING', 'DEBUG'];
      const messages = [
        'Server running smoothly.',
        'Received a new connection from 192.168.1.101.',
        'User authentication successful.',
        'File /var/www/index.html served.',
        'Memory usage at 70%.',
        'Database query executed successfully.',
        'Attempting to reconnect to the database...',
        'Data cache refreshed successfully.',
        'Warning: High memory usage detected.',
        'Error: Failed to connect to remote server.',
        'Debugging mode enabled for user session.',
        'New API request received on endpoint /api/data.',
      ];
  
      const randomLevel = logLevels[Math.floor(Math.random() * logLevels.length)];
      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];
      const timestamp = new Date().toLocaleTimeString();
  
      return `[${timestamp}] [${randomLevel}] ${randomMessage}`;
    };
  
    // Use useEffect to update the log every few seconds
    useEffect(() => {
      const interval = setInterval(() => {
        setLogs((prevLogs) => {
          const newLog = generateLogMessage();
          return [...prevLogs, newLog].slice(-5); // Keep only the last 20 logs
        });
      }, 1000); // Update every 2 seconds
  
      return () => clearInterval(interval); // Cleanup on component unmount
    }, []);
  
    return (
      <div className="p-4 text-white text-xs font-mono rounded-md h-40  shadow-lg overflow-y-hidden">
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    );
  };
  

const FlashingCells = () => {
    const [activeCells, setActiveCells] = useState([]);
  
    useEffect(() => {
      const flashCells = () => {
        // Generate random active states and colors for the cells
        const newActiveCells = Array.from({ length: 18 }, () => ({
          isActive: Math.random() > 0.2,
          color: getRandomColor(),
        }));
        setActiveCells(newActiveCells);
      };
  
      const getRandomColor = () => {
        const colors = ['bg-cyan-400', 'bg-cyan-600', 'bg-cyan-800', 'bg-cyan-200 glow-animation'];
        return colors[Math.floor(Math.random() * colors.length)];
      };
  
      const interval = setInterval(flashCells, 500);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="grid grid-cols-6 gap-0 p-4">
        {Array.from({ length: 18 }).map((_, index) => (
          <div
            key={index}
            className={`w-8 h-4  border border-gray-500 ${
              activeCells[index]?.isActive ? activeCells[index].color : 'bg-cyan-900'
            }`}
          />
        ))}
      </div>
    );
  };
  

export default ArcReactorUI;
