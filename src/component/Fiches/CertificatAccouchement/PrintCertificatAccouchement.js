import React, { Component } from 'react'
import Header1 from '../Header1'

class PrintCertificatAccouchement extends Component {

    constructor(props){
        super(props)
    }

    date= new Date();

    render() {

        const {namePatient, lastNamePatient, nameAgent, lastNameAgent, data}= this.props

         
        return (
            <div className="A4">
            <Header1 date={this.date} />
            <h2>CERTIFICAT D'ACCOUCHEMENT</h2>
            <div>
                La Nommée: <strong>{` ${namePatient} ${lastNamePatient}`} </strong><br/><br/>
                Profession
                <div className="inputAnimated" >
                    <input type="text" value={data.profession}  id='profession'/>
                </div> MLE 
                <div className="inputAnimated" >
                    <input type="text" value={data.mle}  id='mle'/>
                </div> <br/><br/>

                A accouché le
                <div className="inputAnimated">
                    <input type="date" value={data.dateAccouchement} id='dateAccouchement'/>
                </div> D'UN ENFANT DE SEXE  
                <div className="inputAnimated">
                    <input type="text" value={data.sexe} id='sexe'/>
   
                </div>
                <br/>
                <br/>

                Et qui à reçu le Prénom de :
                <div className="inputAnimated">
                    <input type="text" value={data.prenom} id='prenom'/>
                </div> <br/> <br/>
                Dont le Père est 
                <div className="inputAnimated">
                    <input type="text" value={data.pere} id='pere'/>
                </div><br/> <br/>
                La Mère est 
                <div className="inputAnimated">
                    <input type="text" value={`${namePatient} ${lastNamePatient}`} />
                </div><br/> <br/>

                <div className="right">

                    La Sage Femme: 
                    <br/><br/><strong>{nameAgent} {lastNameAgent}</strong>
                    
                </div>
                 
                
            </div>
        </div>
        )
    }
}

export default PrintCertificatAccouchement
