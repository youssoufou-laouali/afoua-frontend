import React, {useState, useEffect, useRef} from 'react'
import { socket } from "../Header";
import axios from 'axios'
import ListPerception from './ListPerception'
import {useDispatch, useSelector } from "react-redux";
import { loadingTrue, loadingFalse } from "../../redux/LogIn/action";
import {toast} from 'react-toastify'
import './style.css'
import Modal from '../Modal'
import Recu from './Recu';
import ReactToPrint from 'react-to-print';
import { logOut } from '../../redux/LogIn/action'
import {useHistory} from 'react-router-dom'

const Perception = () => {

    const [perceptionData, setPerceptionData] = useState([])
    const [openModal, setopenModal] = useState(false)
    const [patient, setPatient] = useState({})
    const history = useHistory()
    const currentUser = useSelector(state => state.login)
    const dispatch = useDispatch()
    const handleLogOut= ()=>{
        localStorage.removeItem('jwtToken')
        dispatch(logOut())
    }
    useEffect(() => {
        if(currentUser.currentUser.exp*1000 <= Date.now()){
            handleLogOut()
        }
    }, [])


    useEffect(() => {
        if(!currentUser.isAuthenticated){
            history.push('/signin')
        }
    }, [currentUser, history])

    const refRecu = useRef()

    const agent = useSelector(state => state.login)
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
    const [product, setProduct] = useState([])

    const handleClick=({name, lastName, demande, id, assurencePriseEnCharge})=>{
        console.log(demande);
        let z = demande.map(el=> {
            return {
                acteMedicale: el.label,
                tarif: el.price,
                nbr: el.nbr || 1,
                txpc: 0,
                montant: el.price * (el.nbr || 1),
                poste: el.poste
            }
        })

       setPatient({name, lastName, id,  assurencePriseEnCharge, pourcentagePriseEnCharge:0})
       setProduct(z)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        setopenModal(true)
        
        dispatch(loadingTrue())
        axios.post('/api/accueil/perception', 
            {
                demande: product,
                montant: montantTotal,
                assurencePriseEnCharge: patient.assurencePriseEnCharge,
                pourcentage: patient.pourcentagePriseEnCharge,
                post: product[0].poste,
                numPC: patient.numPC,
                police: patient.police,
                id: patient.id 
            })
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
            setopenModal(true)
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

    const handleChangeDemande=(e)=>{
        
        let i= e.target.classList[1]
        i= parseInt(i)
        let labelle= e.target.classList[0]
        let copy= [...product]
        if(labelle=='txpc'){
            if(e.target.value){
                copy[i].montant= (parseInt(copy[i].tarif) - parseInt((parseInt(copy[i].tarif)*parseInt(e.target.value)/100)))*parseInt(copy[i].nbr)
            }else{
                copy[i].montant= parseInt(copy[i].tarif) * parseInt(copy[i].nbr)
            }
        }else if(labelle=='nbr'){
            if(e.target.value){
                copy[i].montant= (parseInt(copy[i].tarif) - parseInt((parseInt(copy[i].tarif)* parseInt(copy[i].txpc))/100))*parseInt(e.target.value)
            }else{
                copy[i].montant= parseInt(copy[i].tarif)
            }
        }
        
        copy[i][labelle]= e.target.value
        
        setProduct(copy)
        
    }

   

    const [montantTotal, setMontantTotal] = useState(0)

    useEffect(() => {
        console.log('patient', patient);
        let x=0
        product.map(el=> {
            x += el.montant
        })
        setMontantTotal(x)
    }, [product, patient])

    const handleChange=(e)=>{
        if(e.target.id== 'pourcentagePriseEnCharge'){
            
            setProduct(product.map(el=>{
                el.txpc= parseInt(e.target.value)
                if(e.target.value && parseInt(e.target.value) !== 0){
                    el.montant= (parseInt(el.tarif) - (parseInt(el.tarif) * parseInt(e.target.value))/100)*parseInt(el.nbr)
                }else{
                    el.montant= parseInt(el.tarif) * el.nbr
                }
                return el
            }))
            setPatient({...patient, [e.target.id]: parseInt(e.target.value)})
        }else{
            setPatient({...patient, [e.target.id]: e.target.value})
        }
        
    }

    return (
        <div className='perception'>
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
            <div className='selectedPatientPaye'>
                <h4>{patient.name} <span>{patient.lastName}</span> </h4>
                <div>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <div>
                            <div className="profil-flex">
                                    
                                <div>
                                    <label htmlFor='assurencePriseEnCharge'>Assurance</label> 
                                    <input type="text" value={patient.assurencePriseEnCharge} placeholder="Nom de l'assurance prise en charge" onChange={(e)=>handleChange(e)} id='assurencePriseEnCharge' />
                                </div>
                                <div>
                                    <label htmlFor='pourcentagePriseEnCharge'>pourcentage</label> 
                                    <input type="number" value={patient.pourcentagePriseEnCharge} onChange={(e)=>handleChange(e)} id='pourcentagePriseEnCharge' placeholder='pourcentage prise en charge' />
                                </div>
                           
                                <div>
                                    <label htmlFor='numPC'>N° PC</label> 
                                    <input type="string" id='numPC' value={patient.numPC} onChange={(e)=>handleChange(e)} placeholder='N° PC' />
                                </div>
                                <div>
                                    <label htmlFor='police'>POLICE</label> 
                                    <input type="string" id='police' value={patient.police} onChange={(e)=>handleChange(e)} placeholder='police' />
                                </div>
                                    
                            </div>
                            <div>
                                <table>
                                    <tr>
                                        <th style={{width:250}}>Acte Médical</th>
                                        <th>Tarif</th>
                                        <th>Nbr</th>
                                        <th>T x PC ( % )</th>
                                        <th>Montant Net</th>
                                    </tr>
                                    {
                                        product.map((el, index)=>(
                                            <tr key={el.label}>
                                                <td><input style={{width:250}} value={el.acteMedicale} type="text"/></td>
                                                <td><input value={el.tarif} type="text" className={`tarif ${index}`} /></td>
                                                <td><input value={el.nbr} onChange={(e)=>handleChangeDemande(e)} type="number" className={`nbr ${index}`} /></td>
                                                <td><input value={el.txpc} onChange={(e)=>handleChangeDemande(e)} type="number" className={`txpc ${index}`} /></td>
                                                <td><input type="text" value={el.montant} /></td>
                                            </tr>
                                        ))
                                    }
                                    {
                                        (product.length && product.length !==0) && (
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th>{montantTotal} FCFA</th>
                                            </tr>
                                        )
                                    }
                                    
                                </table>
                            </div>
                            <div >
                                <input type="submit" style={{display: 'block', margin: '20px auto'}}  className="input-submit" value='valider' />
                            </div>
                                
                        </div>
                    </form>
                </div>
            </div>
            { openModal &&
                (
                <Modal close={()=>setopenModal(false)} >
                {
                    <>
                    <ReactToPrint
                        trigger={() => <button className="printBoutton">Imprimer</button>}
                        content={() => refRecu.current}
                    />
                    <Recu ref={refRecu} patient={patient} product={product} montantTotal={montantTotal} agent={agent.currentUser} />
                    </>
                }
                </Modal>
                )
            }
        </div>
    )
}

export default Perception
