import React from 'react'
import {useSelector} from 'react-redux'
import './style.css'

const ListMedecin = ({accueil, idGeant, post, demande, patientName, module, adresse, patientLastName, patientPhone, patientId, dateDeNaissance, lieuDeNaissance, handlePatient, idSup}) => {
    const currentUser = useSelector(state => state.login.currentUser)
    return (currentUser.post == post || currentUser.post == 'superAdmin') && (
        (
        <div className="listMedecin" key={idGeant} onClick={()=>handlePatient({idGeant, accueil, module, demande, patientName, patientLastName, adresse, patientPhone, patientId, dateDeNaissance, lieuDeNaissance, idSup})}>
            <div><h3><span>{patientName}</span> {patientLastName}</h3></div>
            <div>{demande[0].acteMedicale}... </div>
        </div>
        )
    )
}

export default ListMedecin
