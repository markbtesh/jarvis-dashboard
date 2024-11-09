const RadialGauge = ({ value, label }) => {
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
  };

  export default RadialGauge;