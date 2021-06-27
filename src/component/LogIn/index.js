import React,{useState, useEffect}  from 'react'
import {connect} from 'react-redux'
import {apiLogin} from '../../redux/LogIn/action'
import Loading from '../Loading'
import {toast} from 'react-toastify'
import  './style.css'
import {useHistory} from 'react-router-dom'


const LogIn = (props) => {

    const history = useHistory()

    useEffect(() => {
        console.log(props.loginState);

        if(props.loginState.errors.phone){
            toast(props.loginState.errors.phone, {
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

        if(props.loginState.errors.password){
            toast(props.loginState.errors.password, {
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

        if(props.loginState.isAuthenticated){
            toast('Bienvenue! La clinique vous souhaite bon travail', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                pauseOnHover: true,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                type: 'success'
                })

                history.push('/accueil')
        }
        
    }, [props.loginState])

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')

    const handlePhone= (e)=>{
        setPhone(e.target.value)
    }

    const handlePassword= (e)=>{
        setPassword(e.target.value)
    }

    const handleSubmit= (e)=>{
        e.preventDefault()
        props.login({phone, password})
    }

    return (
        <div className="login-Box">
            {props.loginState.isLoading && <Loading />}
            <form className='login-Form' onSubmit={(e)=> handleSubmit(e)}>
                <h1>Se Connecter</h1> <br/>
                <input type="tel" className='login-Input' value={phone} onChange={(e)=>handlePhone(e) } placeholder="Numéro De Téléphone" />
                <input type="password" className='login-Input' value={password} onChange={(e)=>handlePassword(e) } placeholder="Mot De Passe" />
                <input type="submit" className="login-Submit" placeholder="connecter" />
            </form>
        </div>
    )
}

const mapStateToProps= state =>{
    return {
        loginState: state.login
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        login: ({phone, password}) =>dispatch(apiLogin({phone, password}))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogIn)
