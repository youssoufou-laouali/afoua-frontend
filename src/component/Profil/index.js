import React,{useState}  from 'react'
import axios from 'axios'
import {useDispatch, useSelector } from "react-redux";
import { loadingTrue, loadingFalse } from "../../redux/LogIn/action";
import {toast} from 'react-toastify'
import './style.css'

const Profil = (props) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.login)
        
    let {name, lastName, phone, id}= user.currentUser

    const initialProfil={
        id,
        name,
        lastName,
        email: '',
        phone,
        urlPhoto: '',
        dateDeNaissance: ''
    }

    const [profil, setProfil] = useState(initialProfil)


  const handleChange= (e)=>{
    setProfil({...profil, [e.target.id]: e.target.value})
  }

  const handleSubmit= (e)=>{
      e.preventDefault()
      console.log(profil);
      dispatch(loadingTrue())
      axios.post('/api/agent/profil', profil)
      .then(user=>{
        dispatch(loadingFalse())
       console.log(user)   

       toast("Profil mise à jour", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        pauseOnHover: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        type: 'success'
        })

        setProfil(initialProfil)
      })
      .catch(errors=>{
        dispatch(loadingFalse())
        console.log(errors.response.data)

        if(errors.response.data.dateDeNaissance){
            toast(errors.response.data.dateDeNaissance, {
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
    
        <div className='profil-container'>
            
            <form className="profil-box" onSubmit={(e)=> handleSubmit(e)}>
                <div className="profil-flex">
                    <div>
                        <label htmlFor='name'>Prénom</label>
                        <input type="text" value={profil.name} onChange={(e)=>handleChange(e)} placeholder='Prénom' id='name' />
                    </div>
                    <div>
                        <label htmlFor='lastName'>Nom de famille</label> 
                        <input type="text" id='lastName' value={profil.lastName} onChange={(e)=>handleChange(e)} placeholder='Nom de Famille' />
                    </div>
                </div>
                <div className="profil-flex">
                    <div>
                        <label htmlFor='email'>Adresse Mail</label> 
                        <input type="email" placeholder='Email' value={profil.email} onChange={(e)=>handleChange(e)} id='email' />
                    </div>
                    <div>
                        <label htmlFor='phone'>Numéro de téléphone</label> 
                        <input type="number" id='phone' value={profil.phone} onChange={(e)=>handleChange(e)} placeholder='Numéro de téléphone' />
                    </div>
                </div>
                <div className="profil-flex">
                    <div>
                        <label htmlFor='dateDeNaissance'>Date de Naissance</label> 
                        <input type="date" value={profil.dateDeNaissance} placeholder='Date de Naissance' onChange={(e)=>handleChange(e)} id='dateDeNaissance' />
                    </div>
                    <div>
                        <label htmlFor='urlPhoto'>Photo de Profil</label> 
                        <input type="file" value={profil.urlPhoto} placeholder='photo de profil' onChange={(e)=>handleChange(e)} id='urlPhoto' />
                    </div>
                </div>
                <input className="input-submit" type="submit" />
            </form>
        </div>
    )
}


export default Profil
