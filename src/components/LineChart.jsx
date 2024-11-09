const LineChart = () => {
    return (
      <div className="h-24 w-full bg-gradient-to-b from-gray-800/5 via-gray-800 to-gray-800/5 relative overflow-hidden">
        <div className="absolute inset-0 flex justify-center items-center">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 50"
            preserveAspectRatio="none"
            fill="none"
            stroke="cyan"
            strokeWidth="2"
          >
            <polyline points="0,50 20,30 40,40 60,10 80,20 100,5" />
          </svg>
        </div>
      </div>
    );
  };
  
export default LineChart;