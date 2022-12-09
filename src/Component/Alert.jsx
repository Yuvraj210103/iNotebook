import React from 'react'

const Alert = (props) => {
  return (
    <div className='fixed top-12 w-full'>
        {props.alert && <div className={`${props.alert.type} text-white h-8 flex justify-center items-center font-bold`}>
            <h1>{props.alert.msg}</h1>
        </div> }
    </div>
  )
}

export default Alert