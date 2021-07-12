import React, { Component } from 'react'
import Header1 from '../Header1'

class PrintEchographieAbdominal extends Component {

    constructor(props){
        super(props)
    }

    date= new Date();

    render() {

        const {namePatient, lastNamePatient,dateDeNaissance ,nameAgent, lastNameAgent, data}= this.props

         
        return (
            <div className="A4">
            <Header1 date={this.date} />
            <h2>Consultation Pediatrique</h2>
            <div>
                Nom et Prénom: <strong>{namePatient} {lastNamePatient}</strong> &ensp; &ensp; &ensp;  Age: {parseInt(this.date.getFullYear())-parseInt(dateDeNaissance)}
                 
                <div className="BEFlex">
                    <div style={{width:'50%'}}>
                        <div style={{border: '1px black solid'}}>
                            <h4>Demande</h4>
                            <div>
                                <textarea value={data.demande} id='demande' style={{fontSize:15}} onChange={e=>handleChange(e)} cols="45" rows="6">
                    
                                </textarea>
                            </div>
                            <div>
                                Médecin: <br/> <br/> Dr <strong> {nameAgent} {lastNameAgent} </strong>
                            </div>
                        </div>
                    </div>
                    <div style={{width:'50%'}}>
                        <div style={{border: '1px black solid'}}>
                            <h4>Reponse</h4>
                            <div>
                                <textarea value={data.reponse} id='reponse' style={{fontSize:15}} onChange={e=>handleChange(e)} cols="45" rows="6">
                    
                                </textarea>
                            </div>
                            <div>
                                Laborantin: <br/> <br/> Agent: <strong>  </strong>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
           
            </div>
        )
    }
}

export default PrintEchographieAbdominal
