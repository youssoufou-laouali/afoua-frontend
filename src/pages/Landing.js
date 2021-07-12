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
import Interaction from '../component/Interaction'
import Medecin from '../component/Medecin'
import Infirmiere from '../component/Medecin/infirmiere'
import SageFemme from '../component/Medecin/sagefemme'
import Radiologue from '../component/Medecin/radiologue'

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
            <Route exact path='/interaction' component={Interaction} />
            <Route exact path='/medecin' component={Medecin} />
            <Route exact path='/infirmiere' component={Infirmiere} />
            <Route exact path='/sagefemme' component={SageFemme} />
            <Route exact path='/radiologue' component={Radiologue} />
        </Router>
        </>
    )
}

export default Landing
