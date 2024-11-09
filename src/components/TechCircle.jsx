import React from 'react'

const TechCircle = ({colorPrime, colorSecond, label, rotate}) => {
  return (

    <div>

<div className="absolute flex justify-center items-center text-white z-20  w-full h-36 rounded-full pb-5 number-font">
    <span className="text-sm font-bold">{label}</span> {/* Display the progress as a percentage */}
  </div>

    <div className={`lg-circle rounded-full w-32 h-32 flex items-center justify-center mx-auto ${colorPrime} ${rotate}`}
    style={{   
      animation: 'rotateCounterClockwise 24s linear infinite',
    }}
    >
    <div className={`md-circle rounded-full w-24 h-24 flex items-center justify-center ${colorSecond}`}
      style={{
        animation: 'rotateClockwise 12s linear infinite',
      }}>
      <div className={`sm-circle rounded-full w-16 h-16 flex items-center justify-center ${colorPrime}`}
        style={{ animation: 'rotateCounterClockwise -12s linear infinite',
        }}>
       
      </div>
    </div>
  </div>
  </div>
  )
}

export default TechCircle