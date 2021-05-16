import React,{useState, useEffect} from 'react'
import './style.css'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../redux/LogIn/action";
import {useDispatch} from 'react-redux'
import ListPatient from './ListPatient'
import {toast} from 'react-toastify'
import Modal from '../Modal'
import { socket } from "../Header";


const Accueil = () => {

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [data, setData] = useState([])
    const [accueil, setAccueil] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        socket.on('message', (mes)=>{
            console.log(mes);
        })
    }, [])

    useEffect(() => {
        getInteraction()
    }, [])

    const [interaction, setInteraction] = useState([])
    const getInteraction= ()=>{
        axios.get('/api/interaction/perception')
        .then(res=>{
            console.log(res.data.interaction)
            setInteraction(res.data.interaction)
        })
        .catch(err=> {
            console.log(err.response.data);
        })
    }

    const handleSubmit= (e)=>{
        e.preventDefault()
        dispatch(loadingTrue())
        axios.post('/api/patient/verify', {name, lastName})
        .then(patients=>{
            dispatch(loadingFalse())
            if(patients.data.patient.length !== 0){
                toast("Veillez selectionner l'utilisateur parmis les réponses disponibles", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    type: 'info'
                }) 

                setData(patients.data.patient)
            }else{
                setData([])
                toast("aucun patient correspond à ce nom, veillez créer un nouveau", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    type: 'warning'
                }) 
            }
             
        })
        .catch(errors=>{
            setData([])
            dispatch(loadingFalse())
            console.log(errors.response.data)
            if(errors.response.data.name){
                toast(errors.response.data.name, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    type: 'error'
                })  
            }
            if(errors.response.data.lastName){
                toast(errors.response.data.lastName, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    type: 'error'
                })  
            }
           
        })
    }

    const handleChangeAccueil = (e)=>{
        setAccueil({...accueil, [e.target.id]: e.target.value})
    }

   
    //Add patient
    const createPatient= (e)=>{
        e.preventDefault()
        dispatch(loadingTrue())

        axios.post('/api/patient/add', patient)
        .then(response=>{
            
            console.log(response.data);
            axios.post('/api/accueil/add', {...accueil, patient: response.data._id})
            .then(res=>{
                dispatch(loadingFalse())
                console.log('resultat ' + res);

                socket.emit("accueil", res.data)

                toast("Le dossier du patient est prêt pour sa demande", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    type: 'success'
                }) 
                setAccueil({})
                setPatient({})
                setName('')
                setLastName('')
                setCreateAndSetAskPatient(false)
                setData([])
            })
            .catch(err=>{
                dispatch(loadingFalse())
                if(err.response.data.demande){

                toast(err.response.data.demande, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    type: 'error'
                }) 

                }

                if(err.response.data.patient){
                toast(err.response.data.patient, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    type: 'error'
                }) 
                }
            })
            
        })
        .catch(errors=> {
            dispatch(loadingFalse())
            console.log(errors.response.data);

            if(errors.response.data.lastName){
                toast(errors.response.data.lastName, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    type: 'error'
                })  
            }

                if(errors.response.data.name){
                    toast(errors.response.data.name, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        pauseOnHover: true,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        type: 'error'
                    })  
                }

                if(errors.response.data.phone){
                    toast(errors.response.data.phone, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        pauseOnHover: true,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                        type: 'error'
                    })  
                }
            
        })
    }

    let initialPatient= {
        name: name,
        lastName : lastName,
        phone:'',
        dateDeNaissance:'',
        email:'',
        urlPhoto:''
    }
    const [patient, setPatient] = useState(initialPatient)

    const handleChange= (e)=>{
        setPatient({...patient, [e.target.id]: e.target.value})
    }

    const [createAndSetAskPatient, setCreateAndSetAskPatient] = useState(false)
    const [setAskPatient, setSetAskPatient] = useState(false)
    const [idPatient, setIdPatient] = useState('')

    const openSetPatient= (id)=>{
        setIdPatient(id);
        setPatient({...patient, demande:''})
        setSetAskPatient(true)
    }


    const handlePatientAsk= (e)=>{

        e.preventDefault()
        console.log(idPatient);
        axios.post('/api/accueil/add', {...accueil, patient: idPatient})
            .then(res=>{
                dispatch(loadingFalse())
                console.log(res.data);
                socket.emit("accueil", res.data)
                toast("Le dossier du patient est prêt pour sa demande", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    type: 'success'
                }) 
                setName('')
                setLastName('')
                setPatient({})
                setAccueil({})
                setSetAskPatient(false)
                setData([])
            })
            .catch(err=>{
                dispatch(loadingFalse())
                if(err.response.data.demande){

                toast(err.response.data.demande, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    type: 'error'
                }) 

                }

                if(err.response.data.patient){
                toast(err.response.data.patient, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    type: 'error'
                }) 
                }
            })
    }

    return (
        <div className="accueil-container">
            <div>
                <h2 style={{textAlign: 'center'}}>Vérifier l'existance d'un patient</h2>
                <form className="accueil-form" onSubmit={(e)=> handleSubmit(e)}>
                    <div>
                        <label htmlFor='name'>Prénom du patient</label>
                       <input type="text" id="name" placeholder='Nom du patient' value={name} onChange={(e)=> {setName(e.target.value); setPatient({...patient, name: e.target.value})}} />                    
                    </div>
                    <div>
                        <label htmlFor='lastName'>Nom de famille du patient</label>
                        <input type="text" id="lastName" placeholder='Nom de famille du patient' value={lastName} onChange={(e)=> {setLastName(e.target.value); setPatient({...patient, lastName: e.target.value})}} />
                    </div>
                    <input style={{backgroundColor:'#2ecc71', cursor:'pointer', width:100, height:50, marginTop:20}} type="submit" value='Vérifier' />
                </form>
                <hr style={{marginTop: 40}}/>
                <button className='btn-add-patient' onClick={()=> setCreateAndSetAskPatient(true)}>Créer un nouveau patient</button>
                <hr style={{marginBottom: 40}}/>

                {
                    createAndSetAskPatient && (

                        <Modal close={()=>setCreateAndSetAskPatient(false)}> 
                            <div className='accueil-add-patient'> 
                                <form className="profil-box" onSubmit={(e)=> createPatient(e)}>
                                <h2 style={{textAlign: 'center'}}>Créer un dossier médical pour un nouveau patient</h2>
                                    <div className="profil-flex">
                                        <div>
                                            <label htmlFor='name'>Prénom</label>
                                            <input type="text" value={patient.name} onChange={(e)=>handleChange(e)} placeholder='Prénom' id='name' />
                                        </div>
                                        <div>
                                            <label htmlFor='lastName'>Nom de famille</label> 
                                            <input type="text" id='lastName' value={patient.lastName} onChange={(e)=>handleChange(e)} placeholder='Nom de Famille' />
                                        </div>
                                    </div>
                                    <div className="profil-flex">
                                        
                                        <div>
                                            <label htmlFor='phone'>Numéro de téléphone</label> 
                                            <input type="number" id='phone' value={patient.phone} onChange={(e)=>handleChange(e)} placeholder='Numéro de téléphone' />
                                        </div>
                                        <div>
                                            <label htmlFor='dateDeNaissance'>Date de Naissance</label> 
                                            <input type="date" value={patient.dateDeNaissance} placeholder='Date de Naissance' onChange={(e)=>handleChange(e)} id='dateDeNaissance' />
                                        </div>
                                    </div>

                                    <div className="profil-flex">
                                        
                                        <div>
                                            <label htmlFor='demande'>Demande</label> 
                                            <select id='demande' value={accueil.demande} onChange={(e)=>handleChangeAccueil(e)}>
                                                <option value='' >Demande</option>
                                                {
                                                    interaction!==[] && interaction.map((el, index)=>(
                                                        <option key={index} value={el.label}>{el.label}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor='assurencePriseEnCharge'>Assurance</label> 
                                            <input type="text" value={accueil.assurencePriseEnCharge} placeholder="Nom de l'assurance prise en charge" onChange={(e)=>handleChangeAccueil(e)} id='assurencePriseEnCharge' />
                                        </div>
                                    </div>
                                    {
                                        accueil.demande == '' ? (
                                            <input className="input-submit" style={{backgroundColor: 'grey'}} value='créer'  desabled />
                                        ):(
                                            <input className="input-submit" value='créer' type="submit" />
                                        )
                                    }
                                </form>
                            </div>
                        </Modal>
                    )
   
                }
                {
                    setAskPatient && (
                        <Modal close={()=> setSetAskPatient(false)}>
                            <div className='accueil-add-patient'> 
                                <form className="profil-box" onSubmit={(e)=> handlePatientAsk(e)}>
                                <h2 style={{textAlign: 'center'}}>Ajouter une demande pour ce patient</h2>

                                    <div className="profil-flex">
                                        
                                        <div>
                                            <label htmlFor='demande'>Demande</label> 
                                            <select id='demande' value={accueil.demande} onChange={(e)=>handleChangeAccueil(e)}>
                                                <option value='' >Demande</option>
                                                {
                                                    interaction!==[] && interaction.map((el, index)=>(
                                                        <option key={index} value={el.label}>{el.label}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor='assurencePriseEnCharge'>Assurance</label> 
                                            <input type="text" value={accueil.assurencePriseEnCharge} placeholder="Nom de l'assurance prise en charge" onChange={(e)=>handleChangeAccueil(e)} id='assurencePriseEnCharge' />
                                        </div>
                                    </div>
                                    {
                                        accueil.demande == '' ? (
                                            <input className="input-submit" style={{backgroundColor: 'grey'}} value='créer'  desabled />
                                        ):(
                                            <input className="input-submit" value='créer' type="submit" />
                                        )
                                    }
                                </form>
                            </div>
                        </Modal>
                    )
                }
            </div>
            <div className="accueil-patient">
            <h2 style={{textAlign: 'center'}}>La liste correspondante à la recherche du patient</h2>
                {
                    data.map(el=> 

                        <ListPatient
                            name={el.name}
                            lastName= {el.lastName}
                            id={el._id}
                            phone={el.phone}
                            openSetPatient={openSetPatient}
                        />
                    )
                   
                }
            </div>


        </div>
    )
}

export default Accueil
