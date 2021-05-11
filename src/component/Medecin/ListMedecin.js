import React from 'react'
import './style.css'

const ListMedecin = ({idGeant, post, demande, patientName, patientLastName, patientPhone, patientId}) => {
    return (
        <div className="listMedecin" key={idGeant}>
            <div><h3><span>{patientName}</span> {patientLastName}</h3></div>
            <div>{demande} </div>
        </div>
    )
}

export default ListMedecin
