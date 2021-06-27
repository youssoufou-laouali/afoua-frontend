import React from 'react'
import './style.css'

const ListMedecin = ({idGeant, post, demande, patientName, module, adresse, patientLastName, patientPhone, patientId, dateDeNaissance, lieuDeNaissance, handlePatient}) => {
    return (
        <div className="listMedecin" key={idGeant} onClick={()=>handlePatient({idGeant, module, demande, patientName, patientLastName, adresse, patientPhone, patientId, dateDeNaissance, lieuDeNaissance})}>
            <div><h3><span>{patientName}</span> {patientLastName}</h3></div>
            <div>{demande[0].acteMedicale}... </div>
        </div>
    )
}

export default ListMedecin
