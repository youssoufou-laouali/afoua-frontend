import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Header1 from '../Header1'
import './style.css'
import {useSelector, useDispatch} from 'react-redux'
import { loadingTrue, loadingFalse } from "../../../redux/LogIn/action";

const CompteRenduHospitalisation = ({namePatient, lastNamePatient, handleChange, data, dateDeNaissance, idPatient, closeI, printI}) => {
    const date= new Date()
    const dispatch = useDispatch()

    //Agent
    const agent = useSelector(state => state.login)
    const nameAgent = agent.currentUser.name
    const lastNameAgent = agent.currentUser.lastName

    const handleSubmit=()=>{
        dispatch(loadingTrue())
        axios.post('/imagerie/add', {...data, patient: idPatient})
        .then(res=> {
            dispatch(loadingFalse())
            closeI()
            printI()
        })
        .catch(err=>{
            dispatch(loadingFalse())
        })
    }

    return (
        <div className="A4 A4CRH">
            <Header1 date={date} />
            
            <h3>Billetin d'examen</h3>

            <div>
                Nom et Prénom: <strong>{namePatient} {lastNamePatient}</strong> &ensp; &ensp; &ensp;  Age: {parseInt(date.getFullYear())-parseInt(dateDeNaissance)}
                <br/>
                
                <div className="BEFlex">
                    <div style={{width:'50%'}}>
                        <div style={{border: '1px black solid'}}>
                            <h4>Demande</h4>
                            <div>
                                <textarea value={data.demande} id='demande' style={{fontSize:15}} onChange={e=>handleChange(e)} cols="45" rows="6">
                    
                                </textarea>
                            </div>
                            <div>
                                Médecin: <br/> <br/> Dr <strong> {nameAgent} {lastNameAgent} </strong>
                            </div>
                        </div>
                    </div>
                    <div style={{width:'50%'}}>
                        <div style={{border: '1px black solid'}}>
                            <h4>Reponse</h4>
                            <div>
                                <textarea value={data.reponse} id='reponse' style={{fontSize:15}} onChange={e=>handleChange(e)} cols="45" rows="6">
                    
                                </textarea>
                            </div>
                            <div>
                                Laborantin: <br/> <br/> Agent: <strong>  </strong>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <button className="submitA4" onClick={()=>handleSubmit()}>Valider</button>
            </div>
        </div>
    )
}

export default CompteRenduHospitalisation
