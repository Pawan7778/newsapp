import React, { Component } from 'react'
import Loading from './Loading.gif';

export class spinner extends Component {
    render() {
        return (
            <div className = "text-center my-3">
                <img src={Loading} alt={Loading} srcset="" />
            </div>
        )
    }
}

export default spinner
