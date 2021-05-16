import React, {useState, useEffect} from 'react'
import Header1 from '../Header1'
import {useSelector, useDispatch} from 'react-redux'
import './style.css'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../../redux/LogIn/action";

const CerificatDeVisiteMedicale = ({idPatient, print, label, namePatient, module, lastNamePatient, lieuDeNaissance, dateDeNaissance, close}) => {
    //User
    const [namePatientState, setNamePatient] = useState(namePatient)
    const [lastNamePatientState, setLastNamePatient] = useState(lastNamePatient)
    const [dateNaissancePatientState, setDateNaissancePatient] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        if(dateDeNaissance!== ''){
            setDateNaissancePatient(new Date(dateDeNaissance))
        }
        return () => {
            setDateNaissancePatient('')
        }
    }, [dateDeNaissance])
    
    const [lieuNaissancePatientState, setLieuNaissancePatient] = useState(lieuDeNaissance)
    

    //Agent
    const agent = useSelector(state => state.login)
    const nameAgent = agent.currentUser.name
    const lastNameAgent = agent.currentUser.lastName

    //Date
    const [date, setDate] = useState(new Date())

    //Submit
    const handleSubmit=()=>{
        dispatch(loadingTrue())
        axios.post('/certificatvisitemedicale/add', {patient: idPatient})
        .then(certificat=> {
            
            console.log(certificat.data.certificatVisiteMedicale)
            axios.post('/module/update', {
                certificatVisiteMedicale: certificat.data.certificatVisiteMedicale._id,
                module: module
            })
            .then(response=>{
                console.log(response, certificat);
                dispatch(loadingFalse())
                close()
                print()
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

    const handlePrint= ()=>{
       
    }
    
    return (
        <div className="A4">
            <Header1 date={date} />
            <h2>CERTIFICAT DE VISITE MEDICALE</h2>
            <div>
                En exécution des règlements en vigueur, nous soussigné 
                <div className="inputAnimated" >
                    <input type="text" value={`${nameAgent} ${lastNameAgent}`} id='nameAgent'/>
                   {
                       label && (
                            <label htmlFor='nameAgent'>nom de l'agent</label> 
                        )
                   } 
                </div> <br/>
                Certifions que le(la) nommé(e): 
                <div className="inputAnimated">
                    <input type="text" value={namePatientState} id='namePatient'/>
                    {
                        label && (
                            <label htmlFor='namePaient'>Prénom du patient</label> 
                        )
                    }
                    
                </div> 
                <div className="inputAnimated">
                    <input type="text" value={lastNamePatientState} id='lastNamePatient'/>
                    {
                        label && (
                            <label htmlFor='lastNamePatient'>Nom de famille du patient</label>
                        )
                    }
                    
                </div> <br/>
                Né(e) à 
                 <div className="inputAnimated" >
                    <input value={lieuNaissancePatientState} type="text" id='lieuNaissance'/>
                    {
                        label && (
                            <label htmlFor='lieuNaissance'>lieu de naissance</label>
                        )
                    }
                    
                </div> le : 
                <div className="inputAnimated" >
                    <input value={ dateNaissancePatientState !='' ? `${dateNaissancePatientState.getDate()}/${dateNaissancePatientState.getMonth()+1}/${dateNaissancePatientState.getFullYear()}`: ''} type="text" id='dateNaissance'/>
                    {
                        label && (
                            <label  htmlFor='dateNaissance'>date de Naissance</label>
                        )
                    }
                    
                </div> <br/>
                N'est atteint (e) d'aucun signe de maladie contagieuse ou chronique contre indiquant son aptitude au travail <br/>
                <br/>
                En conséquence, le (la) susnommé (e) est apte <br/>

                <div className="right">
                    Fait à Niamey, le  
                    <div className="inputAnimated" >
                        <input type="text" value={`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`} id='text'/>
                        {
                        label && (
                            <label htmlFor='date'>date</label>
                        )
                        }
                        
                    </div> <br/> <br/>
                    Le Médecin: 
                    
                </div>
                {
                    label && (
                        <button className="submitA4" onClick={()=>handleSubmit()}>Envoyer</button>
                    )
                }
                {
                    !label && (
                        <button className="submitA4" onClick={()=>handlePrint()}>Imprimer</button>
                    )
                }
            </div>
        </div>
    )
}

export default CerificatDeVisiteMedicale
