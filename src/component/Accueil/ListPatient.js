import React from 'react'
import './style.css'

const ListPatient = ({name, lastName, phone, id, openSetPatient}) => {
    return (
        <div className="list-container-patient" onClick={()=>openSetPatient(id)} key={id}>
            <div>
                <h4>{name} <span>{lastName}</span></h4>
            </div>
            <div className='flex'>
                <div>{phone}</div>
            </div>
        </div>
    )
}

export default ListPatient
