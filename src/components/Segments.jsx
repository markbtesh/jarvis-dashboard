const Segments = ({  value, length }) => {
    const segments = length; // Number of segments
    const filledSegments = Math.floor((value / 100) * segments); // Calculate how many segments should be filled
  
    return (
      <div className="flex items-center mt-1 pl-[1px]">
      
        {/* Progress Bar */}
        <div className="grid grid-cols-20 gap-1 ml-1 rotate-180">
          {[...Array(segments)].map((_, i) => (
            <div
              key={i}
              className={`w-7 h-2 ${i < filledSegments ? 'bg-gradient-to-r from-cyan-500 via-cyan-800 to-cyan-500' : 'bg-gray-700'} rounded-sm shadow-lg`}
            ></div>
          ))}
        </div>
  
      </div>
    );
  };
  
 
  
  export default Segments;
  