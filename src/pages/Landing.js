import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Header} from '../component/Header'
import LogIn from '../component/LogIn'
import Accueil from '../component/Accueil'
import Register from '../component/Register'
import Admin from '../component/RegisterAdmin'
import Profil from '../component/Profil'
import Reset from '../component/Password'
import ListAgent from '../component/ListAgent'
import Perception from '../component/Perception'

const Landing = () => {

    return (
        <>
        <Router>
            <Header />
            <Route exact path='/signin' component={LogIn} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/accueil' component={Accueil} />
            <Route exact path='/admin' component={Admin} />
            <Route exact path='/profil' component={Profil} />
            <Route exact path='/password' component={Reset} />
            <Route exact path='/list' component={ListAgent} />
            <Route exact path='/perception' component={Perception} />
        </Router>
        </>
    )
}

export default Landing
