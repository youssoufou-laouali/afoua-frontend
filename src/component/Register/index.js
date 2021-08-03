import React,{useState, useEffect}  from 'react'
import axios from 'axios'
import {useDispatch, useSelector } from "react-redux";
import { loadingTrue, loadingFalse } from "../../redux/LogIn/action";
import {toast} from 'react-toastify'
import  './style.css'
import { logOut } from '../../redux/LogIn/action'
import {useHistory} from 'react-router-dom'

const Register = (props) => {

    const dispatch = useDispatch()
    const handleLogOut= ()=>{
        localStorage.removeItem('jwtToken')
        dispatch(logOut())
    }
    
    const history = useHistory()
    const currentUser = useSelector(state => state.login)
    useEffect(() => {
        if(currentUser.currentUser.exp*1000 <= Date.now()){
            handleLogOut()
        }
        if(currentUser.currentUser.post !== 'admin' && currentUser.currentUser.post !== 'superAdmin'){
            history.push('/')
        }
    }, [])


    useEffect(() => {
        if(!currentUser.isAuthenticated){
            history.push('/signin')
        }
    }, [currentUser, history])

    const initialRegister={
        name: '',
        lastName: '',
        email: '',
        phone:'',
        password:'123456',
        post:''
    }
    const [posts, setPosts] = useState([])
    const [register, setRegister] = useState(initialRegister)
    
    useEffect(() => {
        
       axios.get('/api/post')
       .then(data=>{
           setPosts(data.data[0].posts)})
       .catch(errors=>{
           console.log(errors)
       })  
    }, [posts])


  const handleChange= (e)=>{
    setRegister({...register, [e.target.id]: e.target.value})
  }

  const handleSubmit= (e)=>{
      e.preventDefault()
      dispatch(loadingTrue())
      axios.post('/api/agent/register', register)
      .then(user=>{
        dispatch(loadingFalse())
       console.log(user)

       toast( user.data.agent.name +" vient d'être ajouter", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        type: 'success'
        })

        setRegister(initialRegister)
      })
      .catch(errors=>{
        dispatch(loadingFalse())
        console.log(errors.response.data)
        const {name, lastName, post, phone}= errors.response.data
        if(name){
            toast(name, {
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
        if(lastName){
            toast(lastName, {
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
        if(post){
            toast(post, {
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
        if(phone){
            toast(phone, {
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
    
        <div className='register-container'>
            
            <form className="register-box" onSubmit={(e)=> handleSubmit(e)}>
                <div className="register-flex">
                    <div>
                        <label htmlFor='name'>Prénom</label>
                        <input type="text" value={register.name} onChange={(e)=>handleChange(e)} placeholder='Prénom' id='name' />
                    </div>
                    <div>
                        <label htmlFor='lastName'>Nom de famille</label> 
                        <input type="text" id='lastName' value={register.lastName} onChange={(e)=>handleChange(e)} placeholder='Nom de Famille' />
                    </div>
                </div>
                <div className="register-flex">
                    <div>
                        <label htmlFor='email'>Adresse Mail</label> 
                        <input type="email" placeholder='Email' value={register.email} onChange={(e)=>handleChange(e)} id='email' />
                    </div>
                    <div>
                        <label htmlFor='phone'>Numéro de téléphone</label> 
                        <input type="number" id='phone' value={register.phone} onChange={(e)=>handleChange(e)} placeholder='Numéro de téléphone' />
                    </div>
                </div>
                <div className="register-flex">
                    <div>
                        <label htmlFor='password'>Mot de Passe</label> 
                        <input type="text" defaultValue='123456' placeholder='Mot de Passe' id='password' />
                    </div>
                    <div>
                        <label htmlFor='post'>Post</label> 
                        <select id='post' value={register.post} onChange={(e)=>handleChange(e)}>
                            <option disabled value='' >Specialité</option>
                            {posts!==[] && posts.map((el, index)=>(
                                <option key={index} value={el}>{el}</option>
                            ))
                        }
                        </select>
                    </div>
                </div>
                <input className="input-submit" type="submit" />
            </form>
        </div>
    )
}


export default Register
