import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Header1 from '../Header1'
import './style.css'
import {useSelector, useDispatch} from 'react-redux'
import { loadingTrue, loadingFalse } from "../../../redux/LogIn/action";

const CompteRenduHospitalisation = ({namePatient, lastNamePatient, handleExamenDM, handleChange, data, dateDeNaissance, idPatient, closeDM, printDM}) => {
    const date= new Date()
    const dispatch = useDispatch()

    //Agent
    const agent = useSelector(state => state.login)
    const nameAgent = agent.currentUser.name
    const lastNameAgent = agent.currentUser.lastName

    const handleSubmit=()=>{
        dispatch(loadingTrue())
        axios.post('/dossier/add', {...data, patient: idPatient, examensUlterieurs: Examens})
        .then(res=> {
            dispatch(loadingFalse())
            handleExamenDM(Examens)
            closeDM()
            printDM()
            console.log(res);
        })
        .catch(err=>{
            dispatch(loadingFalse())
            console.log(err);
        })
    }
    const initialExamensUlterieurs= {
        date: '', heure : '', compteRendu: '', modifications: ''
    }
    const [examensUlterieurs, setExamensUlterieurs] = useState(initialExamensUlterieurs)

    const handleChangeExamen= (e)=>{
        setExamensUlterieurs({...examensUlterieurs, [e.target.id]: e.target.value})
    }
    const [Examens, setExamens] = useState([])
    const handleAdd =()=>{
        setExamens([...Examens, examensUlterieurs])
        setExamensUlterieurs(initialExamensUlterieurs)
    }
    const handleDelete= (i)=>{
        setExamens(Examens.filter((el, index)=> i !== index))
    }
    return (
        <div className="A4 A4CRH">
            <Header1 date={date} />
            
            <h2>Dossier Médical</h2><br/>

            <div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                Nom et Prénom: <strong>{namePatient} {lastNamePatient}</strong>  <br/> Age: {parseInt(date.getFullYear())-parseInt(dateDeNaissance)} <br/>
                Sexe
                <div className="inputAnimated">
                    <select id='sexe' value={data.sexe} onChange={(e)=> handleChange(e)}>
                        <option value="" key="" >Aucun</option>
                        <option value="M" key="M">Masculin</option>
                        <option value="F" key="F">Feminin</option>
                    </select>
                    
                </div> <br/>

                <label>Adresse:</label>
                <div className="inputAnimated">
                    <input id='adresse' onChange={(e)=> handleChange(e)} value={data.adresse} type="text" />
                </div> <br/>
                Observation prise par: Dr <strong>{nameAgent} {lastNameAgent} </strong>
                </div>
                <div>
                    <h4>Type d'Assurance</h4>
                    Nom et Prénom Assuré: 
                    <div className="inputAnimated">
                        <input id='assure' onChange={(e)=> handleChange(e)} value={data.assure} type="text" />
                    </div> <br/>
                    N°Police: 
                    <div className="inputAnimated">
                        <input id='numPolice' onChange={(e)=> handleChange(e)} value={data.numPolice} type="text" />
                    </div> <br/>
                    N° assuré:
                    <div className="inputAnimated">
                        <input id='numAssure' onChange={(e)=> handleChange(e)} value={data.numAssure} type="text" />
                    </div>
                </div>
                </div>
                Entrée le: 
                <div className="inputAnimated">
                    <input id='entree' onChange={(e)=> handleChange(e)} value={data.entree} type="date" />
                </div>
                Sortie le:
                <div className="inputAnimated">
                    <input id='sortie' onChange={(e)=> handleChange(e)} value={data.sortie} type="date" />
                </div>
                Chambre: 
                <div className="inputAnimated">
                    <input id='chambre' onChange={(e)=> handleChange(e)} value={data.chambre} type="text" />
                </div>
                Motif de Consultation:
                <div className="inputAnimated">
                    <input id='motifConsultation' onChange={(e)=> handleChange(e)} value={data.motifConsultation} type="text" />
                </div> <br/>
                Histoire de la maladie:
                <textarea id='histoireMaladie' onChange={(e)=> handleChange(e)} value={data.histoireMaladie} style={{fontSize: 15}} cols="90" rows="4">
                    
                </textarea>

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
                            <input id='chirurgical' onChange={(e)=> handleChange(e)} value={data.chirurgical} type="text" />
                        </div> <br/>
                        <label>Gynéco-obstétrique: </label> : 
                        <div className="inputAnimated">
                            <input id='gynecoObstetrique' onChange={(e)=> handleChange(e)} value={data.gynecoObstetrique} type="text" />
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
                <br/>
                RESUME:
                <textarea id='resume' onChange={(e)=> handleChange(e)} value={data.resume} style={{fontSize: 15}} cols="90" rows="3">
                    
                </textarea>

                Examens demandés:
                <textarea id='examenDemandes' onChange={(e)=> handleChange(e)} value={data.examenDemandes} style={{fontSize: 15}} cols="90" rows="3">
                    
                </textarea>
                Diagnostic Retenu:
                <textarea id='diagnosticRetenu' onChange={(e)=> handleChange(e)} value={data.diagnosticRetenu} style={{fontSize: 15}} cols="90" rows="2">

                </textarea>
                Conduite à Ténir:
                <textarea id='conduiteTenir' onChange={(e)=> handleChange(e)} value={data.conduiteTenir} style={{fontSize: 15}} cols="90" rows="3">

                </textarea>
                
            </div>

            <div>
                <h1>Examens Ultérieurs</h1>
                <div>
                    Dates Heures Médecins:
                    <div className="inputAnimated">
                        <input id='date' onChange={(e)=> handleChangeExamen(e)} value={examensUlterieurs.date} type="date" />
                        <input id='heure' onChange={(e)=> handleChangeExamen(e)} value={examensUlterieurs.heure} type="time" />
                    </div> <br/>
                    Compte Rendu: Examen clinique - Para clinique:
                    <div className="inputAnimated">
                        <input id='compteRendu' onChange={(e)=> handleChangeExamen(e)} value={examensUlterieurs.compteRendu} type="text" />
                    </div> 
                    Modification Thérapeutiques Actes:
                    <div className="inputAnimated">
                        <input id='modifications' onChange={(e)=> handleChangeExamen(e)} value={examensUlterieurs.modifications} type="text" />
                    </div> 
                    <button onClick={()=>handleAdd()}>Ajouter</button>
                </div>
                <table>
                    <tr>
                        <th>Dates Heures Médecins:</th>
                        <th>Compte Rendu: Examen clinique - Para clinique:</th>
                        <th>Modification Thérapeutiques Actes:</th>
                    </tr>
                    {
                        Examens && (
                            Examens.map((el, index)=> {
                            return(
                                <tr key={index}>
                                    <td> {el.date}---{el.heure} </td>
                                    <td>{el.compteRendu}</td>
                                    <td>{el.modifications} </td>
                                    <button onClick={()=> handleDelete(index)}>X</button>
                                </tr>
                            )
                        }))
                    }
                    <tr>
                        <td colSpan={3}>
                            <strong>Observation</strong>
                            <textarea id='observations' onChange={(e)=> handleChange(e)} value={data.observations} style={{fontSize: 15}} cols="90" rows="1">

                            </textarea>
                        </td>
                    </tr>
                </table>
            </div>
            <button className="submitA4" onClick={()=>handleSubmit()}>Valider</button>
        </div>
    )
}

export default CompteRenduHospitalisation
