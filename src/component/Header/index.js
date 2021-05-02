import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { logOut } from '../../redux/LogIn/action'
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import Loading from '../Loading'
import  './style.css'

const Header = () => {
    const handleLogOut= ()=>{
        localStorage.removeItem('jwtToken')
        dispatch(logOut())
    }
    const dispatch = useDispatch()

    const history = useHistory()
    const currentUser = useSelector(state => state.login)
    

    useEffect(() => {
        if(!currentUser.isAuthenticated){
            history.push('/signin')
        }
    }, [currentUser, history])

    return (
        <div className="header-container">
            <div className="header-logo">
                <h1>Logo</h1>
            </div>
            <div className="header-brand">
                <div className="header-action">
                    <button>Agent</button>
                    <div>
                        {
                            !currentUser.isAuthenticated &&
                              <Link to="/signin">Se connecter</Link>
                        } 

                        {
                            currentUser.isAuthenticated && 
                            <Link onClick={()=>handleLogOut()} to="/">Se Déconnecter</Link>
                        }
                        {
                            currentUser.currentUser.isAdmin && 
                            <Link to="/register">Ajouter un Agent</Link>
                        }
                        {
                            currentUser.currentUser.post === 'superAdmin' && 
                            <Link to="/admin">Ajouter un Administrateur</Link>
                        }                    
                    </div>
                </div>
                <div>
                    <Link to='/profil'>Profil</Link>
                    <Link to='/password'>Changer le mot de passe</Link>
                </div>
            </div>
            {currentUser.isLoading && <Loading />}
        </div>
    )
}


export default Header
