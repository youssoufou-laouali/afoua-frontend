import React,{useState}  from 'react'
import axios from 'axios'
import {useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify'
import { loadingTrue, loadingFalse } from "../../redux/LogIn/action";
import './style.css'

const Password = (props) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.login)
        
    let {id}= user.currentUser

    const [reset, setReset] = useState({id, password: '', confirmPassword: ''})


  const handleChange= (e)=>{
    setReset({...reset, [e.target.id]: e.target.value})
  }

  const handleSubmit= (e)=>{
      e.preventDefault()
      console.log(reset);
      dispatch(loadingTrue())
      axios.post('/api/agent/password', reset)
      .then(user=>{
        dispatch(loadingFalse())
       console.log(user)  
       if(user.data.errors){
        toast(user.data.errors, {
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
       else{
            toast("votre mot de passe est mis à jour", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                pauseOnHover: true,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                type: 'success'
                }) 
       }
       
      })
      .catch(errors=>{
        dispatch(loadingFalse())
        console.log(errors.message)
        toast("Erreur veillez ressayer", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            pauseOnHover: true,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            type:'error'
            }) 
      })
  }

    return (
    
        <div className='reset-container'> 
            <form className="reset-box" onSubmit={(e)=> handleSubmit(e)}>
                <div className="reset-flex">
                    <div>
                        <label htmlFor='password'>Mot de passe</label>
                        <input type="text" value={reset.password} onChange={(e)=>handleChange(e)} placeholder='ajouter le nouveau mot de passe' id='password' />
                    </div>
                    <div>
                        <label htmlFor='confirmPassword'>Confirmer le nouveau mot de passe</label> 
                        <input type="text" id='confirmPassword' value={reset.confirmPassword} onChange={(e)=>handleChange(e)} placeholder='confirmer le mot de passe' />
                    </div>
                </div>
               <input className="input-submit" type="submit" />
            </form>
        </div>
    )
}


export default Password
