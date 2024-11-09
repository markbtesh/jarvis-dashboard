const SegmentedProgressBar = ({ label, value }) => {
    const segments = 20;
    const filledSegments = Math.floor((value / 100) * segments);

    return (
      <>
      <span className="text-cyan-500 text-lg font-bold w-24">{label}</span>
        <div className="flex items-center mb-2 mt-2">
          
    
          {/* Progress Bar */}
          <div className="grid grid-flow-col grid-cols-20 gap-1 ml-2">
            {[...Array(segments)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-6 ${i < filledSegments ? 'bg-cyan-500' : 'bg-gray-700'} shadow-lg`}
              ></div>
            ))}
          </div>
    
          {/* Value on the right */}
          <span className="ml-2 text-cyan-500 number-font text-sm">{value}%</span>
        </div>
        </>
      );
    };
    
    

export default SegmentedProgressBar;