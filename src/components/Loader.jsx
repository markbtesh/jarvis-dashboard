import { Html, useProgress } from '@react-three/drei';


const Loader = ({style}) => {
  return (
    
    <Html >
    <span className="canvas-load"></span>
    <div className={`w-20 h-20 rounded-full border-2 border-dashed border-black border-r-cyan-900 animate-spin -mt-20 ${style}`}></div>
    
    </Html>

  )
}

export default Loader