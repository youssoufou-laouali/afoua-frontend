import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Header1 from '../Header1'
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
            
            <h2>Imagerie</h2><br/>

            <div>
                Nom et Prénom: <strong>{namePatient} {lastNamePatient}</strong>   Age: {parseInt(date.getFullYear())-parseInt(dateDeNaissance)}
                
                <label>Echographies:</label><br/>
                Libellé: 
                <div className="inputAnimated">
                    <input id='echographie' onChange={(e)=> handleChange(e)} value={data.echographie} type="text" />
                </div> <br/>
                <label>Observations</label>
                <div className="inputAnimated">
                    <input id='observations' onChange={(e)=> handleChange(e)} value={data.observations} type="text" />
                </div> <br/> <br/>

                <label>Conclusion</label>
                <div className="inputAnimated">
                    <input id='conclusion' onChange={(e)=> handleChange(e)} value={data.conclusion} type="text" />
                </div> <br/>
                <label>Radiographie</label><br/>
                Libellé: 
                <div className="inputAnimated"> 
                    <input id='radiographie' onChange={(e)=> handleChange(e)} value={data.radiographie} type="text" />
                </div> <br/>
                Rapport de la Radiographie: 
                <textarea value={data.rapport} id='rapport' style={{fontSize:15}} onChange={e=>handleChange(e)} cols="90" rows="1">
            
                </textarea><br/>
                
            
                <br/>
                <br/>
                <div>
                    <strong>Médecin:</strong> <br/> <br/> {nameAgent} {lastNameAgent}
                </div>
                <button className="submitA4" onClick={()=>handleSubmit()}>Valider</button>
            </div>
        </div>
    )
}

export default CompteRenduHospitalisation
