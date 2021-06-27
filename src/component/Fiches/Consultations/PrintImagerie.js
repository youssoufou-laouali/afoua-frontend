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
                Nom et Prénom: <strong>{namePatient} {lastNamePatient}</strong>   Age: {parseInt(this.date.getFullYear())-parseInt(dateDeNaissance)}
                <label>Echographies:</label><br/>
                Libellé: 
                <div className="inputAnimated">
                    <input id='echographie' value={data.echographie} type="text" />
                </div> <br/>
                <label>Observations</label>
                <div className="inputAnimated">
                    <input id='observations' value={data.observations} type="text" />
                </div> <br/> <br/>

                <label>Conclusion</label>
                <div className="inputAnimated">
                    <input id='conclusion' value={data.conclusion} type="text" />
                </div> <br/>
                <label>Radiographie</label><br/>
                Libellé: 
                <div className="inputAnimated"> 
                    <input id='radiographie' value={data.radiographie} type="text" />
                </div> <br/>
                Rapport de la Radiographie: 
                <textarea value={data.rapport} id='rapport' style={{fontSize:15}} cols="90" rows="1">
            
                </textarea><br/>
                <div>
                    <strong>Médecin:</strong> <br/> <br/> {nameAgent} {lastNameAgent}
                </div>
            </div>
           
            </div>
        )
    }
}

export default PrintEchographieAbdominal
