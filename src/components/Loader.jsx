import { Html, useProgress } from '@react-three/drei';


const Loader = () => {
  const {progress} = useProgress();
  return (
    <Html>
    <span className="canvas-load"></span>
    <div className='w-screen h-screen bg-white'></div>
    <p
    style={{
      fontSize: 30,
      color: 'white',
      fontWeight: 800,
      marginTop: 40

    }}
    >{progress.toFixed(2)}$</p>

    </Html>
  )
}

export default Loader