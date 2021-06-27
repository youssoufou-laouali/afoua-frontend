import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Header1 from '../Header1'
import {useSelector, useDispatch} from 'react-redux'
import { loadingTrue, loadingFalse } from "../../../redux/LogIn/action";

const CompteRenduHospitalisation = ({namePatient, lastNamePatient, handleChange, data, dateDeNaissance, idPatient, closeCP, printCP}) => {
    const date= new Date()
    const dispatch = useDispatch()

    //Agent
    const agent = useSelector(state => state.login)
    const nameAgent = agent.currentUser.name
    const lastNameAgent = agent.currentUser.lastName

    const handleSubmit=()=>{
        dispatch(loadingTrue())
        axios.post('/pediatrique/add', {...data, patient: idPatient})
        .then(res=> {
            dispatch(loadingFalse())
            closeCP()
            printCP()
        })
        .catch(err=>{
            dispatch(loadingFalse())
        })
    }

    return (
        <div className="A4 A4CRH">
            <Header1 date={date} />
            
            <h2>Consultation Pédiatrique</h2><br/>

            <div>
                Nom et Prénom: <strong>{namePatient} {lastNamePatient}</strong>   Age: {parseInt(date.getFullYear())-parseInt(dateDeNaissance)}
                <label>Sexe</label>
                <div className="inputAnimated">
                    <select id='sexe' value={data.sexe} onChange={(e)=> handleChange(e)}>
                        <option value="" key="" >Aucun</option>
                        <option value="M" key="M">Masculin</option>
                        <option value="F" key="F">Feminin</option>
                    </select>
                    
                </div> <br/>
                <label>Adresse</label>
                <div className="inputAnimated">
                    <input id='adresse' onChange={(e)=> handleChange(e)} value={data.adresse} type="text" />
                </div> <br/>
                <label>Maladie Connue</label>
                <div className="inputAnimated">
                    <input id='maladieConnue' onChange={(e)=> handleChange(e)} value={data.maladieConnue} type="text" />
                </div> <br/>

                <label>Motif de Consultation</label>
                <div className="inputAnimated">
                    <input id='motifConsultation' onChange={(e)=> handleChange(e)} value={data.motifConsultation} type="text" />
                </div> <br/>
               
               <div>
                   Constante et monsuration: <br/>
                   Poids: 
                   <div className="inputAnimated">
                        <input id='poids' onChange={(e)=> handleChange(e)} value={data.poids} type="text" />
                    </div>
                    Taille
                    <div className="inputAnimated">
                        <input id='taille' onChange={(e)=> handleChange(e)} value={data.taille} type="text" />
                    </div> 
                    PC: 
                    <div className="inputAnimated">
                        <input id='pc' onChange={(e)=> handleChange(e)} value={data.pc} type="text" />
                    </div> 
                    T°
                    <div className="inputAnimated">
                        <input id='t' onChange={(e)=> handleChange(e)} value={data.t} type="text" />
                    </div> 
                    FR 
                    <div className="inputAnimated">
                        <input id='fr' onChange={(e)=> handleChange(e)} value={data.fr} type="text" />
                    </div> 
                    FC
                    <div className="inputAnimated">
                        <input id='fc' onChange={(e)=> handleChange(e)} value={data.fc} type="text" />
                    </div> 
                    SaO2
                    <div className="inputAnimated">
                        <input id='sao2' onChange={(e)=> handleChange(e)} value={data.sao2} type="text" />
                    </div> 
                    TA 
                    <div className="inputAnimated">
                        <input id='ta' onChange={(e)=> handleChange(e)} value={data.ta} type="text" />
                    </div>  <br/>
                    Examen Physique 
                    <div className="inputAnimated">
                        <input id='examenPhysique' onChange={(e)=> handleChange(e)} value={data.examenPhysique} type="text" />
                    </div>  <br/>
                    Bilan resultats 
                    <div className="inputAnimated">
                        <input id='bilanResultats' onChange={(e)=> handleChange(e)} value={data.bilanResultats} type="text" />
                    </div>  <br/>
                    Diagnostic 
                    <div className="inputAnimated">
                        <input id='diagnostic' onChange={(e)=> handleChange(e)} value={data.diagnostic} type="text" />
                    </div>  <br/>
                    Traitement 
                    <div className="inputAnimated">
                        <input id='traitement' onChange={(e)=> handleChange(e)} value={data.traitement} type="text" />
                    </div>  <br/>
                    Rende-vous 
                    <div className="inputAnimated">
                        <input id='rdv' onChange={(e)=> handleChange(e)} value={data.rdv} type="date" />
                    </div>  <br/>

               </div>
                
            
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
