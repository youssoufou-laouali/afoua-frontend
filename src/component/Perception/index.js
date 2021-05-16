import React, {useState, useEffect} from 'react'
import { socket } from "../Header";
import axios from 'axios'
import ListPerception from './ListPerception'
import {useDispatch } from "react-redux";
import { loadingTrue, loadingFalse } from "../../redux/LogIn/action";
import {toast} from 'react-toastify'
import './style.css'
import Modal from '../Modal'

const Perception = () => {

    const [perceptionData, setPerceptionData] = useState([])
    const [openModal, setopenModal] = useState(false)
    const [patient, setPatient] = useState({})
    const dispatch = useDispatch()

    socket.on("muraccueil", data=>{
        getMurAccueil()
    })

    useEffect(() => {
        getInteraction()
    }, [])

    const [interaction, setInteraction] = useState([])
    const getInteraction= ()=>{
        axios.get('/api/interaction/perception')
        .then(res=>{
            setInteraction(res.data.interaction)
        })
        .catch(err=> {
            console.log(err.response.data);
            toast("Erreur serveur, Patienter quelques secondes puis recharger", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                pauseOnHover: true,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                type: 'warning'
            })
        })
    }


    const getMurAccueil= ()=>{
        dispatch(loadingTrue())
        axios.get('/api/muraccueil')
        .then(res => {
            dispatch(loadingFalse())
            setPerceptionData(res.data.accueil)
            
        })
        .catch(err=>{
            dispatch(loadingFalse())
            console.log(err.response.data)
            toast("Erreur serveur, Patienter quelques secondes puis recharger", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                pauseOnHover: true,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                type: 'warning'
                })
        })
        
    }
    const [DemandeCorrespondante, setDemandeCorrespondante] = useState({})

    const handleClick=({name, lastName, demande, id, assurencePriseEnCharge})=>{
        setopenModal(true)
        let correspondance = interaction.filter(el=> el.label==demande)
        setDemandeCorrespondante(correspondance[0])
        setPatient({name, lastName, demande, id,  assurencePriseEnCharge, price:correspondance[0].price, post: correspondance[0].poste, pourcentagePriseEnCharge:0, paye:correspondance[0].price})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(patient);
        dispatch(loadingTrue())
        axios.post('/api/accueil/perception', patient)
        .then(res=> {
            toast("La demande du patient est validée", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                pauseOnHover: true,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                type: 'success'
            })
            dispatch(loadingFalse())
            getMurAccueil()
            setopenModal(false)
            socket.emit('perception', res.data)
        })
        .catch(err=>{
            dispatch(loadingFalse())
            console.log(err.response.data)
        })
    }

    useEffect(() => {

        getMurAccueil()
        
    }, [])



    const handleChange=(e)=>{
        if(e.target.id= 'pourcentagePriseEnCharge'){
            
            let calc= patient.price - parseInt((parseInt(e.target.value) * patient.price)/100)
            setPatient({...patient, [e.target.id]: parseInt(e.target.value), paye: calc})
        }else{
            setPatient({...patient, [e.target.id]: e.target.value})
        }
        
    }

    return (
        <div className='perception'>
            {console.log(perceptionData)}
            <div className='list'>
            {
            perceptionData !== [] &&(
                perceptionData.map(el=>
                    (
                        <ListPerception 
                            handleClick={handleClick}
                            idPatient={el.accueil.patient._id}
                            id={el.accueil._id}
                            name={el.accueil.patient.name}
                            lastName={el.accueil.patient.lastName}
                            demande={el.accueil.demande}
                            assurencePriseEnCharge={el.accueil.assurencePriseEnCharge}
                        />
                    )
                )
            ) 
            }
            </div>
            { openModal &&
                (
                <Modal close={()=>setopenModal(false)} >
                    <div className='accueil-add-patient'> 
                        <form className="profil-box" onSubmit={(e)=>handleSubmit(e)}>
                        <h2 style={{textAlign: 'center'}}>Valider le payement d'un patient</h2>
                            <div className="profil-flex">
                                <div>
                                    <label htmlFor='name'>Prénom</label>
                                    <input type="text" value={patient.name} placeholder='Prénom' id='name' />
                                </div>
                                <div>
                                    <label htmlFor='lastName'>Nom de famille</label> 
                                    <input type="text" id='lastName' value={patient.lastName}  placeholder='Nom de Famille' />
                                </div>
                            </div>
                            <div className="profil-flex">
                                
                                <div>
                                    <label htmlFor='demande'>Demande</label> 
                                    <select id='demande' value={patient.demande}>
                                        <option disabled value='' >Demande</option>
                                        {
                                            interaction!==[] && interaction.map((el, index)=>(
                                                <option key={index} value={el.label}>{el.label}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor='price'>Prix</label> 
                                    <input type="number" value={DemandeCorrespondante.price} placeholder='prix' id='price' />
                                </div>
                            </div>

                            <div className="profil-flex">
                                
                                <div>
                                    <label htmlFor='assurencePriseEnCharge'>Assurance</label> 
                                    <input type="text" value={patient.assurencePriseEnCharge} placeholder="Nom de l'assurance prise en charge" onChange={(e)=>handleChange(e)} id='assurencePriseEnCharge' />
                                </div>
                                <div>
                                    <label htmlFor='pourcentagePriseEnCharge'>pourcentage assurance</label> 
                                    <input type="number" id='pourcentagePriseEnCharge' value={patient.pourcentagePriseEnCharge} onChange={(e)=>handleChange(e)} placeholder='pourcentage prise en charge' />
                                </div>
                                
                            </div>

                            <div className="profil-flex">
                                
                                <div>
                                    <label htmlFor='paye'>Montant à payer</label> 
                                    <input type="number" value={patient.paye} placeholder="Le Montant à payer" id='paye' />
                                </div>
                                <div>
                                    <label htmlFor='post'>Post médecin</label> 
                                    <input type="text" id='post' value={DemandeCorrespondante.poste}  placeholder='post du médecin' />
                                </div>
                                
                            </div>
                            
                            <input className="input-submit" value='créer' type="submit" />
                           
                        </form>
                    </div>

                </Modal>
                )
            }
        </div>
    )
}

export default Perception
