import React from 'react'
import './style.css'

const ListPerception = ({name, lastName, demande, id, idPatient, handleClick, assurencePriseEnCharge}) => {
    console.log(demande);
    return (
        <div className='perceptionContainer' key={id} onClick={()=> handleClick({name, lastName, demande, id, idPatient, assurencePriseEnCharge})} >
            <div><span>{name}  </span>{lastName}</div>
        </div>
    )
}

export default ListPerception
