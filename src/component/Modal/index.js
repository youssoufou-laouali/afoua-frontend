import React from 'react'
import './style.css'

const Modal = ({children, close}) => {
    return (
        <>
            <div id='blur'></div>
            <div id='modal'>
            <div style={{position:'absolute', top:50, zIndex:190}}>
                <button onClick={()=>close()}
                style={{backgroundColor: 'red', color: 'white', border: 'none', outline: 'none', cursor: 'pointer', zIndex: 200, padding: '5px 10px', fontSize:16}}>
                   X Fermer</button>
            </div>
            {
                children
            } 
            </div>
        </>
    )
}

export default Modal
