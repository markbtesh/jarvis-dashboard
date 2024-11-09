"use client"

const UpsideDownBarChart = () => {
    const data = [50, 70, 40, 80, 30, 60, 90, 20]; // Sample data for bar heights
  
    return (
      <div className="bg-gradient-to-tr from-gray-900 to-gray-800 p-4 w-72 h-44 border border-cyan-500 border-l-0 border-r-0 rounded-lg relative flex items-end space-x-2 flex-wrap-reverse">
        {data.map((height, index) => (
          <div
            key={index}
            className="bg-gradient-to-b from-cyan-500/5 via-cyan-800 to-cyan-500 w-6"
            style={{
              height: `${height}%`, // Each bar height is a percentage
             // animation: 'pulse 2s ease-in-out infinite', // Optional animation for glowing effect
            }}
          ></div>
        ))}
        <style jsx>{`
          @keyframes pulse {
            0%, 100% {
              box-shadow: 0 0 10px cyan, 0 0 30px cyan;
            }
            50% {
              box-shadow: 0 0 20px cyan, 0 0 60px cyan;
            }
          }
        `}</style>
      </div>
    );
  };
  
  export default UpsideDownBarChart;