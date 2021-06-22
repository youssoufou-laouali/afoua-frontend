import React from 'react'
import './style.css'

const Header1 = ({date}) => {
    const annee   = date.getFullYear();
    const mois    = date.getMonth() + 1;
    const jour    = date.getDate();
    return (
        <div className="header1Container">
            <div>
                <h4>CLINIQUE MEDICALE AFOUA</h4>
                Médecine Générale-Analyses Médicales <br/>
                Autres Consultations Specialisées <br/>
                Compte SONIBANK N° 0025110063931/88 <br/>
                NIF 1333 * B.P.: 11454 * Tél: 20 75 34 39 <br/>
                Niamey-République du NIGER
            </div>
            <div>
                Niamey, le
                <div className="inputAnimated" >
                        <input type="text" value={`${jour} / ${mois} / ${annee}`} id='date'/>
                </div>
            </div>
        </div>
    )
}

export default Header1
