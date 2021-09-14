import React from 'react'
import Loading from './Loading.gif';

const spinner = (props) => {
        return (
            <div className = "text-center my-3">
                <img src={Loading} alt={Loading} srcset="" />
            </div>
        )
    
}

export default spinner
