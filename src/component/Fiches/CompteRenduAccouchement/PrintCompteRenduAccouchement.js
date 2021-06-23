import React, { Component } from 'react'
import Header1 from '../Header1'

class PrintCompteRenduAccouchement extends Component {

    constructor(props){
        super(props)
    }

    date= new Date();

    render() {

        const {namePatient, lastNamePatient, nameAgent, lastNameAgent, data}= this.props

         
        return (
            <div className="A4">
            <Header1 date={this.date} />
            <h2>COMPTE RENDU D'ACCOUCHEMENT</h2>
            <div>
              
               <strong>{data.cra}</strong>
            </div>
        </div>
        )
    }
}

export default PrintCompteRenduAccouchement
