import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../redux/LogIn/action";
import {useDispatch, useSelector} from 'react-redux'
import ListeInteraction from './ListeInteraction'
import Modal from '../Modal'
import {toast} from 'react-toastify'
import { logOut } from '../../redux/LogIn/action'
import {useHistory} from 'react-router-dom'


const Interaction = () => {
    const initialInteraction= {label:'', price: '', poste: ''}
    const [interaction, setInteraction] = useState(initialInteraction)
    const [update, setUpdate] = useState(initialInteraction)
    const [data, setData] = useState([])
    const [isOpenModal, setIsopenModal] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state.login)
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
    const getInteraction= ()=>{
        axios.get('/api/interaction/perception')
        .then(res=>{
            console.log(res.data.interaction)
            setData(res.data.interaction)
        })
        .catch(err=> {
            console.log(err.response.data);
        })
    }
    useEffect(() => {
        getInteraction()
    }, [])

    const handleChange= (e)=>{
        setInteraction({...interaction,[e.target.id]: e.target.value})
    }
    const handleChangeUpdate= (e)=>{
        setUpdate({...update,[e.target.id]: e.target.value})
    }

    const handleSubmit= (e)=>{
        e.preventDefault()
        dispatch(loadingTrue())
        axios.post('/api/interaction/add', interaction)
        .then(res=>{
            dispatch(loadingFalse())
            console.log(res.data)
            setInteraction(initialInteraction)
        })
        .catch(err=>{
            dispatch(loadingFalse())
            console.log(err.response.data)
        })
    }

    const handleUpdate= (e)=>{
        e.preventDefault()
        dispatch(loadingTrue())
        axios.post('/api/interaction/update', update)
        .then(res=>{
            dispatch(loadingFalse())
            setIsopenModal(false)
            console.log(res.data);
            getInteraction()
        })
        .catch(err=>{
            dispatch(loadingFalse())
            console.log(err.response.data);
        })
    }

    const closeModale= ()=>{
        setIsopenModal(false)
    }

    const openingModale= ({price, label, poste, id})=>{
        setIsopenModal(true)
        setUpdate({price, label, poste, id})
    }

    return (
        <div style={{backgroundColor: '#191919'}}>
            <div>
                <form className="profil-box" onSubmit={(e)=> handleSubmit(e)} >
                    
                    <div className="profil-flex">
                        <div>
                            <label htmlFor='label'>Libellé</label>
                            <input type="text" value={interaction.label} onChange={(e)=>handleChange(e)} placeholder='Libellé' id='label' />
                        </div>
                        <div>
                            <label htmlFor='price'>Prix</label> 
                            <input type="number" id='price' value={interaction.price} onChange={(e)=>handleChange(e)} placeholder='Prix' />
                        </div>
                        
                    </div>

                    <div className="profil-flex">
                        <div>
                            <label htmlFor='poste'>Post</label> 
                            <input type="text" id='poste' value={interaction.poste} onChange={(e)=>handleChange(e)} placeholder='Post' />
                        </div>
                        <div>
                        <label> Valider</label> 
                            <input type="submit" value='Envoyer' />
                        </div>
                    </div>
                    
                </form>
            </div>
            <div>
                {
                    data!==[] && (
                        data.map(el=> 
                        <ListeInteraction
                            price={el.price} 
                            label={el.label}
                            poste={el.poste}
                            id={el._id}
                            openingModale={openingModale}
                        />)
                    )
                }
            </div>

            {
                isOpenModal && (
                    <Modal close={closeModale}>
                    <div>
                        <form className="profil-box" onSubmit={(e)=> handleUpdate(e)} >
                            
                            <div className="profil-flex">
                                <div>
                                    <label htmlFor='label'>Libellé</label>
                                    <input type="text" value={update.label} onChange={(e)=>handleChangeUpdate(e)} placeholder='Libellé' id='label' />
                                </div>
                                <div>
                                    <label htmlFor='price'>Prix</label> 
                                    <input type="number" id='price' value={update.price} onChange={(e)=>handleChangeUpdate(e)} placeholder='Prix' />
                                </div>
                                
                            </div>

                            <div className="profil-flex">
                                <div>
                                    <label htmlFor='poste'>Post</label> 
                                    <input type="text" id='poste' value={update.poste} onChange={(e)=>handleChangeUpdate(e)} placeholder='Post' />
                                </div>
                                <div>
                                <label> Valider</label> 
                                    <input type="submit" value='Envoyer' />
                                </div>
                            </div>
                            
                        </form>
                    </div>
                    </Modal>
                )
            }
            
        </div>
    )
}

export default Interaction
