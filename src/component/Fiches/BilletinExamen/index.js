import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Header1 from '../Header1'
import './style.css'
import {useSelector, useDispatch} from 'react-redux'
import { loadingTrue, loadingFalse } from "../../../redux/LogIn/action";
import { socket } from '../../Header'

const CompteRenduHospitalisation = ({namePatient, lastNamePatient, idUpdate, dateDeNaissance, idPatient, closeBilExam, printBilExam, handleProductsExam, productsExam, handleDelete, handleDeleteResponse}) => {
    const date= new Date()
    const dispatch = useDispatch()

    const [interaction, setInteraction] = useState([])
    const getProducts= ()=>{
        axios.get('/api/interaction/perception')
        .then(res=>{
            setInteraction(res.data.interaction)
        })
        .catch(err=> {
        })
    }
    useEffect(() => {
        getProducts()
    }, [])

    //Agent
    const agent = useSelector(state => state.login)
    const nameAgent = agent.currentUser.name
    const lastNameAgent = agent.currentUser.lastName

    const handleUpdate=()=> {
        dispatch(loadingTrue())
        console.log(productsExam, idUpdate);
        axios.post('/bulletinexamen/update', { id: idUpdate, data: productsExam})
        .then(res=> {
            dispatch(loadingFalse())
            //printBilExam()
            console.log(res);
        })
        .catch(err=>{
            dispatch(loadingFalse())
            console.log(err);
        })
    }
    const handleSubmit=()=>{
        dispatch(loadingTrue())
        axios.post('/bulletinexamen/add', { patient: idPatient, data: productsExam})
        .then(res=> {
            axios.post('/api/accueil/add', {demande: productsExam, assurencePriseEnCharge: '', patient: idPatient, idSup: res.data._id})
            .then(responses =>{
                dispatch(loadingFalse())
                socket.emit("accueil", res.data)
                closeBilExam()
                printBilExam()
            })
            .catch(err=>{
                dispatch(loadingFalse())
            })
        })
        .catch(err=>{
            dispatch(loadingFalse())
        })
    }
    const [currentProduct, setCurrentProduct] = useState({})
    const handleChangeProduct = (e)=>{
        let element= interaction.find(el=> el.label==e.target.value)
        setCurrentProduct(element)
    }

    const [indexResponse, setIndexResponse] = useState(null)
    const handleIndexLabo = (index)=> {
        let resp= ''
        productsExam.map((el, i)=> {
            if(index==i) resp = el.response;
        })
        setResponseInd(resp);
        setIndexResponse(index);
    }
    const [responseInd, setResponseInd] = useState('')
    const handleResponseChange= (e)=>{
        setResponseInd(e.target.value)
    }

    const handleAddResponse=()=>{
        handleProductsExam({response: responseInd, index: indexResponse})
        setResponseInd('');
        setIndexResponse(null)
    }
    const handleAdd=()=>{
        handleProductsExam({...currentProduct, nbr: 1})
    }

    return (
        <div className="A4 A4CRH">
            <Header1 date={date} />
            
            <h3>Billetin d'examen</h3>

            <div>
                Nom et Prénom: <strong>{namePatient} {lastNamePatient}</strong> &ensp; &ensp; &ensp;  Age: {parseInt(date.getFullYear())-parseInt(dateDeNaissance)}
                <br/>
                {
                (agent.currentUser.post !== 'infirmiere' && agent.currentUser.post !== 'laboratoire') && (
                    <>
                    <label>Demande</label>
                    <div className="inputAnimated">
                        <select value={currentProduct.label || ''} onChange={(e)=>handleChangeProduct(e)}>
                            <option value="" key="">AUCUN</option>
                            {
                                interaction.map(el=> {
                                    return(
                                        <option value={el.label} key={el._id}>{el.label}</option>
                                    )
                                })
                            }
                        </select>
                        
                    </div>
                    <button onClick={()=>handleAdd()} style={{cursor: 'pointer',border: 'none', color: 'white', backgroundColor:'gray', padding:'10px 15px', borderRadius:10}}>Ajouter</button>
                    </>
                )}
                {
                    ((agent.currentUser.post == 'laboratoire' || agent.currentUser.post == 'superAdmin') && (indexResponse != null)) && (
                        <div className="inputAnimated">
                            <input type="text" value={responseInd} onChange={(e)=>handleResponseChange(e)} placeholder="Response" />
                            <button onClick={()=>handleAddResponse()} style={{cursor: 'pointer', border: 'none', color: 'white', backgroundColor:'gray', padding:'10px 15px', borderRadius:10}}>Ajouter</button>
                        </div>
                    )
                }
                <div className="BEFlex">
                    <div style={{width:'50%', minHeight: 300}}>
                        <div style={{border: '1px black solid'}}>
                            <h4>Demande</h4>
                            <div>
                                <table>
                            {
                            productsExam.map((el, index)=> {
                                return (
                                    <tr key={index} id={index} style={{height: 50}}>
                                        <td style={{padding: '5px 20px'}}>
                                            {
                                                el.label || el.acteMedicale
                                            }
                                        </td>
                                        
                                        <td>{
                                            (agent.currentUser.post !== 'infirmiere' && agent.currentUser.post !== 'laboratoire') && (
                                                <button style={{height: 50}} onClick={()=>handleDelete(index)} >supprimer</button>
                                            )
                                            }
                                            {
                                                (agent.currentUser.post == 'laboratoire' || agent.currentUser.post == 'superAdmin') && (
                                                    <button style={{height: 50}} onClick={()=>handleIndexLabo(index)} >Reponse</button>
                                                    )
                                            }
                                        </td>
                                    </tr>
                                        )
                                    })
                                }
                                </table>
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
                            <table>
                            {
                            productsExam.map((el, index)=> {
                                return (
                                    <tr style={{height: 50}} key={index} id={index}>
                                        <td>
                                            {
                                                el.response
                                            }
                                        </td>
                                    </tr>
                                        )
                                    })
                                }
                                </table>
                            </div>
                            <div>
                                Laborantin: <br/> <br/> Agent: <strong>  </strong>
                            </div>
                        </div>
                        
                    </div>
                </div>
                {
                   agent.currentUser.post !== 'laboratoire' && (
                    <button className="submitA4" onClick={()=>handleSubmit()}>Valider</button>
                   )
                }
                {
                   (agent.currentUser.post == 'laboratoire' || agent.currentUser.post == 'superAdmin')  && (
                    <button className="submitA4" onClick={()=>handleUpdate()}>Enregistrer</button>
                   )
                }
            </div>
        </div>
    )
}

export default CompteRenduHospitalisation
