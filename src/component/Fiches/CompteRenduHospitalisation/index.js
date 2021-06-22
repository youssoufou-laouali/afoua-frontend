import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Header1 from '../Header1'
import './style.css'
import {useSelector, useDispatch} from 'react-redux'
import { loadingTrue, loadingFalse } from "../../../redux/LogIn/action";

const CompteRenduHospitalisation = ({namePatient, lastNamePatient, handleChange, data, dateDeNaissance, idPatient, closeCRH, printCRH}) => {
    const date= new Date()
    const dispatch = useDispatch()

    //Agent
    const agent = useSelector(state => state.login)
    const nameAgent = agent.currentUser.name
    const lastNameAgent = agent.currentUser.lastName

    const handleSubmit=()=>{
        dispatch(loadingTrue())
        axios.post('/compterenduhospitalisation/add', {...data, idPatient})
        .then(res=> {
            dispatch(loadingFalse())
            closeCRH()
            printCRH()
        })
        .catch(err=>{
            dispatch(loadingFalse())
        })
    }

    return (
        <div className="A4 A4CRH">
            <Header1 date={date} />
            
            <h2>SOINS EN URGENCE</h2><br/>

            <div>
                Nom et Prénom: <strong>{namePatient} {lastNamePatient}</strong>   Age: {parseInt(date.getFullYear())-parseInt(dateDeNaissance)}
                <label>Sexe</label>
                <div className="inputAnimated">
                    <select id='sexe' value={data.sexe} onChange={(e)=> handleChange(e)}>
                        <option value="" key="" disabled>Aucun</option>
                        <option value="M" key="M">Masculin</option>
                        <option value="F" key="F">Feminin</option>
                    </select>
                    
                </div> <br/>

                <label>Motif d'Hospitalisation</label>
                <div className="inputAnimated">
                    <input id='motifHospitalisation' onChange={(e)=> handleChange(e)} value={data.motifHospitalisation} type="text" />
                </div> <br/>
                Hospitalisé du: 
                
                <div className="inputAnimated">
                    <input id='debutHospitalisation' onChange={(e)=> handleChange(e)} value={data.debutHospitalisation} type="date" />
                    <label>date du début</label>
                </div> au : 
                <div className="inputAnimated">
                    <input id='finHospitalisation' onChange={(e)=> handleChange(e)} value={data.finHospitalisation} type="date" />
                    <label>date du fin</label>
                </div>
                () jours <br/>

                <div>
                    <div>ATCD </div>
                    <div>
                        Personnels: 
                        <label>Médicale: </label> : 
                        <div className="inputAnimated">
                            <input id='medicale' onChange={(e)=> handleChange(e)} value={data.medicale} type="text" />
                        </div> 
                        <label>Chirurgical: </label> : 
                        <div className="inputAnimated">
                            <input id='chururgical' onChange={(e)=> handleChange(e)} value={data.chururgical} type="text" />
                        </div> <br/>
                        <label>Gynéco-obstétrique: </label> : 
                        <div className="inputAnimated">
                            <input id='gynecoObstretrique' onChange={(e)=> handleChange(e)} value={data.gynecoObstretrique} type="text" />
                        </div> <br/>
                         
                        <label>Familiers: </label> : 
                        <div className="inputAnimated">
                            <input id='familiers' onChange={(e)=> handleChange(e)} value={data.familiers} type="text" />
                        </div> <br/>
                    </div>
                </div>

                Examens à l'entrée: 
                <div className="inputAnimated">
                    <input id='examenEntree' onChange={(e)=> handleChange(e)} value={data.examenEntree} type="text" />
                </div> T°
                <div className="inputAnimated">
                    <input id='t' onChange={(e)=> handleChange(e)} value={data.t} type="text" />
                </div> <br/> TA
                <div className="inputAnimated">
                    <input id='ta' onChange={(e)=> handleChange(e)} value={data.ta} type="text" />
                </div>Poids
                <div className="inputAnimated">
                    <input id='poids' onChange={(e)=> handleChange(e)} value={data.poids} type="text" />
                </div> <br/> Taille
                <div className="inputAnimated">
                    <input id='taille' onChange={(e)=> handleChange(e)} value={data.taille} type="text" />
                </div> 
                Etat Général: 
                <div className="inputAnimated">
                    <input id='etatGeneral' onChange={(e)=> handleChange(e)} value={data.etatGeneral} type="text" />
                </div><br/>
                Coeur: 
                <div className="inputAnimated">
                    <input id='coeur' onChange={(e)=> handleChange(e)} value={data.coeur} type="text" />
                </div> 
                Poumons:
                <div className="inputAnimated">
                    <input id='poumons' onChange={(e)=> handleChange(e)} value={data.poumons} type="text" />
                </div> <br/>
                ABD:
                <div className="inputAnimated">
                    <input id='abd' onChange={(e)=> handleChange(e)} value={data.abd} type="text" />
                </div> 
                ORL: 
                <div className="inputAnimated">
                    <input id='orl' onChange={(e)=> handleChange(e)} value={data.orl} type="text" />
                </div> <br/>
                Autres app:
                <div className="inputAnimated">
                    <input id='autresApp' onChange={(e)=> handleChange(e)} value={data.autresApp} type="text" />
                </div>
                <br/>

                Examens demandés:
                <textarea id='examenDemandes' onChange={(e)=> handleChange(e)} value={data.examenDemandes} style={{fontSize: 15}} cols="90" rows="3">
                    
                </textarea>
                Diagnostic Retenu:
                <textarea id='diagnosticRetenu' onChange={(e)=> handleChange(e)} value={data.diagnosticRetenu} style={{fontSize: 15}} cols="90" rows="3">

                </textarea>
                Conduite à Ténir:
                <textarea id='conduiteTenir' onChange={(e)=> handleChange(e)} value={data.conduiteTenir} style={{fontSize: 15}} cols="90" rows="3">

                </textarea>
                Evolution:
                <textarea id='evolution' onChange={(e)=> handleChange(e)} value={data.evolution} style={{fontSize: 15}} cols="90" rows="3">

                </textarea>
                <br/>
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
