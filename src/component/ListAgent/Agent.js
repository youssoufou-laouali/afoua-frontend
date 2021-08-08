import React from 'react'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../redux/LogIn/action";
import {useDispatch, useSelector} from 'react-redux'
import './agent.css'
import {toast} from 'react-toastify'


const Agent = ({name, lastName, phone, post, email, id}) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.login)

    const ResetPassword= ()=>{
        dispatch(loadingTrue())
        axios.post('/api/agent/reset', {id, password:'123456'})
        .then(user=>{
          dispatch(loadingFalse())
         console.log(user)  

         toast('le mot de passe de '+ name + ' est rénitialiser à 123456', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            pauseOnHover: true,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            type: 'success'
            }) 
        })
        .catch(errors=>{
          dispatch(loadingFalse())
          console.log(errors.message)

          toast("Veillez ressayer, une erreur s'est survenue", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            pauseOnHover: true,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            type: 'error'
            }) 
        })
    }

    const disableAgent= ()=>{
        dispatch(loadingTrue())
        axios.post('/api/agent/delete', {id, post})
        .then(user=>{
          dispatch(loadingFalse())
         console.log(user)  
         window.location.reload(false);
         toast('le compte de '+ name + ' est désormais desactivé', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            pauseOnHover: true,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            type: 'success'
            })  
        })
        .catch(errors=>{
          dispatch(loadingFalse())
          console.log(errors.message)
          toast("Veillez ressayer, une erreur s'est survenue", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            pauseOnHover: true,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            type: 'error'
            }) 
        })
    }

    return (
        <div className="listAgent-container" key={id}>
            <div className='listAgent-container-inf'>
                <h3>{name} <span>{lastName}</span></h3>
                <div className="flexing">
                    <div>
                        {phone}
                    </div>
                    <div>
                        {post}
                    </div>
                </div>
                <small>{email} </small>
                <div className='actionAdmin'>
                    <div>
                        <button onClick={()=>ResetPassword()}> Restaurer son mot de passe</button>
                    </div>
                    <div>
                        <button onClick={()=> disableAgent()} > {(post.charAt(0) == '_') ? ('Activer cet Agent'):('Désactivé cet Agent')}</button>
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}

export default Agent
