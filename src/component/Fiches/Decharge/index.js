import React, {useState} from 'react'
import Header1 from '../Header1'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import './style.css'
import { loadingTrue, loadingFalse } from "../../../redux/LogIn/action";

const Decharge = ({handleChangeResponsableDecharge, responsable, handleChangeTypeResponsableDecharge, typeResponsable, patient, module, printDecharge, closeDecharge }) => {
    const date = new Date()
    const dispatch = useDispatch()

    //Agent
    const agent = useSelector(state => state.login)
    const nameAgent = agent.currentUser.name
    const lastNameAgent = agent.currentUser.lastName

    const handleSubmit= ()=>{
        
        
        dispatch(loadingTrue())
        axios.post('/decharge/add', {responsable, typeResponsable, patient})
        .then(decharge=> {
            
            axios.post('/module/update', {
                decharge: decharge.data.decharge._id,
                module: module
            })
            .then(response=>{
                
                dispatch(loadingFalse())
                closeDecharge()
                printDecharge()
            })
            .catch(err=> {
                dispatch(loadingFalse())
                console.log(err)
            })
        })
        .catch(err=> {
            dispatch(loadingFalse())
            console.log(err)
        })
    }


    return (
        <div className="A4">
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
                <div className="dechargeRow" style={{marginTop: 80}}>
                    <div>
                        <h4>Le Médecin</h4>
                        {nameAgent} {lastNameAgent}
                    </div>

                    <div>
                        <div className="inputAnimated" >
                            <input type="text" value={responsable} />
                            <label>le concernée</label> 
                        </div> <br/>
                        Signature
                    </div>

                </div>
                
            </div>
            <button className="submitA4" onClick={()=>handleSubmit()}>Envoyer</button>
        </div>
    )
}

export default Decharge
