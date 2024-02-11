import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import '../css/CheckOut.css'

function LoadingBox() {
  return (
    <div className='loadingBox flex justify-center items-center min-h-[30vh]:'>
        <Spinner animation="border" role="status" >
            <span className='visually-hidden'>Loading...</span>
        </Spinner>
    </div>
  )
}

export default LoadingBox