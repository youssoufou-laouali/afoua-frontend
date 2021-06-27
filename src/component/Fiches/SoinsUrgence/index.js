import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Header1 from '../Header1'
import './style.css'
import {useSelector, useDispatch} from 'react-redux'
import { loadingTrue, loadingFalse } from "../../../redux/LogIn/action";
import { socket } from '../../Header'

const SoinsUrgence = ({namePatient, lastNamePatient, dateDeNaissance, idPatient, products, handleProducts, handleDelete, closeSEU, printSEU}) => {
    const date= new Date()
    const dispatch = useDispatch()

    //Agent
    const agent = useSelector(state => state.login)
    const nameAgent = agent.currentUser.name
    const lastNameAgent = agent.currentUser.lastName

    const [interaction, setInteraction] = useState([])
    const getProducts= ()=>{
        axios.get('/api/interaction/perception')
        .then(res=>{
            console.log(res);
            setInteraction(res.data.interaction)
        })
        .catch(err=> {
            console.log(err.response.data);
        })
    }
    useEffect(() => {
        getProducts()
        handleProducts()
    }, [])


    const [currentProduct, setCurrentProduct] = useState({})
    const handleChangeProduct = (e)=>{
        let element= interaction.find(el=> el.label==e.target.value)
        setQuantity(1)
        setCurrentProduct(element)
    }

    const [quantity, setQuantity] = useState(1)
    const handleChangeQuantity=(e)=>{
        setQuantity(parseInt(e.target.value))
    }

    const handleAdd=()=>{
        handleProducts({...currentProduct, nbr: quantity})
    }


    const handleSubmit= ()=>{
        dispatch(loadingTrue())
        axios.post('/api/accueil/add', {demande: products, assurencePriseEnCharge: '', patient: idPatient})
            .then(res=>{
                socket.emit("accueil", res.data)
                axios.post('/soinsurgence/add', {demande: products, patient: idPatient})
                .then(certificat=> {
                    
                    axios.post('/module/update', {
                        soinsUrgence: certificat.data.soinsUrgence._id,
                        module: module
                    })
                    .then(response=>{
                        console.log('yes');
                        dispatch(loadingFalse())
                        closeSEU()
                        printSEU()
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
            })
            .catch(err=>{
                dispatch(loadingFalse())
            })
    }


    return (
        <div className="A4">
            <Header1 date={date} />
        <br/>
        <br/>
            <div>
                <div>
                    NOM: {namePatient}
                </div> <br/>
                <div>
                    PRENOM: {lastNamePatient}
                </div> <br/>
                <div>
                    AGE: {parseInt(date.getFullYear())-parseInt(dateDeNaissance)}
                </div>
            </div><br/>
            
            <h2>SOINS EN URGENCE</h2><br/>

            <div>
                <label>Produit</label>
                <div className="inputAnimated">
                    <select value={currentProduct.label || ''} onChange={(e)=>handleChangeProduct(e)}>
                        <option value="" key="" disabled>AUCUN</option>
                        {
                            interaction.map(el=>{
                                return(
                                    <option value={el.label} key={el._id}>{el.label}</option>
                                )
                            })
                        }
                    </select>
                    
                </div>

                <div className="inputAnimated">
                    <input value={quantity} onChange={(e)=>handleChangeQuantity(e)} type="number" />
                    <label>Quantité</label>
                </div>

                <button onClick={()=>handleAdd()} style={{cursor: 'pointer',border: 'none', color: 'white', backgroundColor:'gray', padding:'10px 15px', borderRadius:10}}>Ajouter</button>

            </div>
            <div>
                <div>
                    <table className="tSEU">
                        <tr>
                            <th style={{width: 400}}>DESIGNATION DES PRODUITS</th>
                            <th>QUANTITE</th>
                            <th>SUPPRIMER</th>
                        </tr>
                        {
                            products.map((el, index)=> {
                            
                                return (
                                    <tr key={index} id={index}>
                                        <td>
                                            {
                                                el.label
                                            }
                                        </td>
                                        <td>
                                            {
                                                el.nbr
                                            }
                                        </td>
                                        <td>
                                            <button onClick={()=>handleDelete(index)} >supprimer</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
                <button className="submitA4" onClick={()=>handleSubmit()}>Valider</button>
            </div>
        </div>
    )
}

export default SoinsUrgence
