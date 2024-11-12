

const models = [
    { 
      path: 'https://d1rz0mlg9ltl84.cloudfront.net/ironman1/scene.gltf', 
      scale: 1.7,
      stats: {
        Armor: 90,
        Power: 85,
        Accuracy: 75,
        Speed: 80,
        Durability: 88,
        Agility: 70,
      },
      name: 'Iron Man MK 7'
    },
    { 
        path: 'https://d1rz0mlg9ltl84.cloudfront.net/ironman2.glb', 
        scale: 0.33,
        stats: {
          Armor: 80,
          Power: 92,
          Accuracy: 78,
          Speed: 85,
          Durability: 82,
          Agility: 50,
        },
        name: 'Iron Man MK 1'
      },
    {
      path: 'https://d1rz0mlg9ltl84.cloudfront.net/ironman_silver.glb',
      scale: 2.6,
      stats: {
        Armor: 88,
        Power: 95,
        Accuracy: 80,
        Speed: 90,
        Durability: 84,
        Agility: 82,
      },
      name: 'Iron Man Silver Suit'
  },
  
    { 
      path: 'https://d1rz0mlg9ltl84.cloudfront.net/ironman4.glb', 
      scale: 1.2,
      stats: {
        Armor: 95,
        Power: 88,
        Accuracy: 80,
        Speed: 78,
        Durability: 84,
        Agility: 92,
      },
      name: 'Iron Man Midnight'
    },
  ];

  const initialMissions = [
    { id: 1, title: 'Operation Starfall', description: 'Infiltrate the hidden lab.', coords: { x: 25, y: 35 }, focus: false },
    { id: 2, title: 'Echo Base Recon', description: 'Gather intel on enemy movement.', coords: { x: 72, y: 25 }, focus: false },
    { id: 3, title: 'Ghost Protocol', description: 'Neutralize target.', coords: { x: 75, y: 70 }, focus: false },
    { id: 4, title: 'Phantom Strike', description: 'Disrupt enemy communication systems.', coords: { x: 65, y: 15 }, focus: false },
    { id: 5, title: 'Stealth Sabotage', description: 'Destroy key infrastructure undetected.', coords: { x: 16, y: 28 }, focus: false },
    { id: 6, title: 'Crimson Dawn', description: 'Retrieve classified documents from enemy headquarters.', coords: { x: 35, y: 60 }, focus: false },
  ];
  


  const commands = (cmd, newOutput) => {
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

      return newOutput

  }

export { models, initialMissions, commands }