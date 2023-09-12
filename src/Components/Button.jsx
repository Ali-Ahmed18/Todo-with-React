import React from 'react'

function Button(props) {
    const {text,cClass,customFunction} = props
  return (
    <>
        <button onClick={customFunction} className={`${cClass} border font-bold text-lg text-white`}>{text}</button>
    </>
  )
}

export default Button