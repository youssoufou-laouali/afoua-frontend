import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Header1 from '../Header1'
import {useSelector, useDispatch} from 'react-redux'
import { loadingTrue, loadingFalse } from "../../../redux/LogIn/action";

const CompteRenduHospitalisation = ({namePatient, lastNamePatient, handleChange, data, dateDeNaissance, idPatient, closeCG, printCG}) => {
    const date= new Date()
    const dispatch = useDispatch()

    //Agent
    const agent = useSelector(state => state.login)
    const nameAgent = agent.currentUser.name
    const lastNameAgent = agent.currentUser.lastName

    const handleSubmit=()=>{
        dispatch(loadingTrue())
        axios.post('/generale/add', {...data, patient: idPatient})
        .then(res=> {
            dispatch(loadingFalse())
            closeCG()
            printCG()
        })
        .catch(err=>{
            dispatch(loadingFalse())
        })
    }

    return (
        <div className="A4 A4CRH">
            <Header1 date={date} />
            
            <h2>Consultation médecine Génerale</h2><br/>

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
                <label>Fonction</label>
                <div className="inputAnimated">
                    <input id='fonction' onChange={(e)=> handleChange(e)} value={data.fonction} type="text" />
                </div> <br/> <br/>

                <label>Motif de Consultation</label>
                <div className="inputAnimated">
                    <input id='motifConsultation' onChange={(e)=> handleChange(e)} value={data.motifConsultation} type="text" />
                </div> <br/>
               
               <div>
                   Intérrogatoires <br/>
                   ATCD 
                   Personnels: <br/>
                   
                    Medical
                    <div className="inputAnimated">
                        <input id='medical' onChange={(e)=> handleChange(e)} value={data.medical} type="text" />
                    </div> 
                    chirurgical
                    <div className="inputAnimated">
                        <input id='chirurgical' onChange={(e)=> handleChange(e)} value={data.chirurgical} type="text" />
                    </div> 
                    gyneco-obstetrique
                    <div className="inputAnimated">
                        <input id='gynecoObstetrique' onChange={(e)=> handleChange(e)} value={data.gynecoObstetrique} type="text" />
                    </div> 
                    Allergies Medicamenteuse ou alimentation
                    <div className="inputAnimated">
                        <input id='allergies' onChange={(e)=> handleChange(e)} value={data.allergies} type="text" />
                    </div> 
                    ATCDs <br/>
                    Familiaux: 
                    <div className="inputAnimated">
                        <input id='familiaux' onChange={(e)=> handleChange(e)} value={data.familiaux} type="text" />
                    </div> 
                    Automédication ou prescription médicale reçu: 
                    <div className="inputAnimated">
                        <input id='automedication' onChange={(e)=> handleChange(e)} value={data.automedication} type="text" />
                    </div> 
                    Hospitalisation recente pour: 
                    <div className="inputAnimated">
                        <input id='hospitalisationRecente' onChange={(e)=> handleChange(e)} value={data.hospitalisationRecente} type="text" />
                    </div> 
                    Constantes: <br/>
                    T°
                    <div className="inputAnimated">
                        <input id='t' onChange={(e)=> handleChange(e)} value={data.t} type="text" />
                    </div>  
                    FC
                    <div className="inputAnimated">
                        <input id='fc' onChange={(e)=> handleChange(e)} value={data.fc} type="text" />
                    </div> 
                    SpO2
                    <div className="inputAnimated">
                        <input id='spo2' onChange={(e)=> handleChange(e)} value={data.spo2} type="text" />
                    </div> 
                    TA 
                    <div className="inputAnimated">
                        <input id='ta' onChange={(e)=> handleChange(e)} value={data.ta} type="text" />
                    </div>  <br/>
                    Signe Généreaux: 
                    <div className="inputAnimated">
                        <input id='signeGenereaux' onChange={(e)=> handleChange(e)} value={data.signeGenereaux} type="text" />
                    </div>  <br/>
                    Examen Physique 
                    <div className="inputAnimated">
                        <input id='examenPhysique' onChange={(e)=> handleChange(e)} value={data.examenPhysique} type="text" />
                    </div>  <br/>
                    Soins reçu en urgence à l'admission
                    <div className="inputAnimated">
                        <input id='soinsRecuUrgence' onChange={(e)=> handleChange(e)} value={data.soinsRecuUrgence} type="text" />
                    </div>  <br/>
                    Examens complementaires et resultats 
                    <div className="inputAnimated">
                        <input id='examenResultat' onChange={(e)=> handleChange(e)} value={data.examenResultat} type="text" />
                    </div>  <br/>
                    Ordonnance prescrite et/ou hospitalisation
                    <div className="inputAnimated">
                        <input id='ordonnanceHospitalisation' onChange={(e)=> handleChange(e)} value={data.ordonnanceHospitalisation} type="date" />
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
