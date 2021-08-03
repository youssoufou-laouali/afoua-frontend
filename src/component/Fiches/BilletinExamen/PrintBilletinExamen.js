import React, { Component } from 'react'
import Header1 from '../Header1'

class PrintBilletinExamen extends Component {

    constructor(props){
        super(props)
    }

    date= new Date();

    render() {

        const {namePatient, lastNamePatient,dateDeNaissance ,nameAgent, lastNameAgent, productsExam}= this.props
        console.log(productsExam);
         
        return (
            <div className="A4">
            <Header1 date={this.date} />
            <h2>Billetin Examen</h2>
            <div>
                Nom et Prénom: <strong>{namePatient} {lastNamePatient}</strong> &ensp; &ensp; &ensp;  Age: {parseInt(this.date.getFullYear())-parseInt(dateDeNaissance)}
                 
                <div className="BEFlex">
                    <div style={{width:'50%', minHeight: 300}}>
                        <div style={{border: '1px black solid'}}>
                            <h4>Demande</h4>
                            <div>
                                <table>
                            {
                            productsExam.map((el, index)=> {
                                return (
                                    <tr key={index} id={index} style={{height: 50}}>
                                        <td style={{padding: '5px 20px'}}>
                                            {
                                                el.label
                                            }
                                        </td>
                                    </tr>
                                        )
                                    })
                                }
                                </table>
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
                            <table>
                            {
                            productsExam.map((el, index)=> {
                                return (
                                    <tr style={{height: 50}} key={index} id={index}>
                                        <td>
                                            {
                                                el.response
                                            }
                                        </td>
                                    </tr>
                                        )
                                    })
                                }
                                </table>
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

export default PrintBilletinExamen
