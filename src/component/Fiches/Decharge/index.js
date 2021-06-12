import React, {useState} from 'react'
import Header1 from '../Header1'
import axios from 'axios'
import './style.css'

const Decharge = ({handleChangeResponsableDecharge, responsable, handleChangeTypeResponsableDecharge, typeResponsable }) => {
    const date = new Date()
    
    return (
        <div>
            <Header1 date={date} />
            <h2>Decharge </h2>
            <div>
                Je soussigné 
                <div className="inputAnimated" >
                    <input type="text" value={responsable} onChange={(e)=>handleChangeResponsableDecharge(e)} />
                    <label>nom et prénom du responsable</label> 
                </div> 
                <div className="dechargeRow">
                    <div>
                        <label>Malade</label> <input type="checkbox" onChange={(e)=>handleChangeTypeResponsableDecharge(e)} checked={typeResponsable.malade} id='malade' />
                    </div>
                    <div>
                        <label>Parent</label> <input type="checkbox" onChange={(e)=>handleChangeTypeResponsableDecharge(e)} checked={typeResponsable.parent}  id='parent' />
                    </div>
                    <div>
                        <label>Accompagnant</label> <input type="checkbox" id='accompagnant' onChange={(e)=>handleChangeTypeResponsableDecharge(e)} checked={typeResponsable.accompagnant}  />
                    </div>
                </div>
                Décide de quitter la Clinique AFOUA ce jour
                <div className="inputAnimated" >
                    <input type="text" value={`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` } />
                    <label>date</label> 
                </div>  <br/>
                A 
                <div className="inputAnimated" >
                    <input type="text" value={`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}` } />
                    <label>heures</label> 
                </div> (heures), contre avis médical. <br/>
                Attestation établie pour servir et valoir ce que de droit.
                <div className="dechargeRow">
                    <div>
                        <h4>Le Médecin</h4>
                    </div>

                    <div>
                        <div className="inputAnimated" >
                            <input type="text" value={responsable} />
                            <label>Nom-Prénom de la personne concernée</label> 
                        </div> <br/>
                        Signature
                    </div>

                </div>
                
            </div>
        </div>
    )
}

export default Decharge
