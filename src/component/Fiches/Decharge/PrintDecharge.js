import React, { Component } from 'react'
import Header1 from '../Header1';

export class PrintDecharge extends Component {

    constructor(props){
        super(props)
    }

    date= new Date();
    render() {
        const { responsable, typeResponsable, nameAgent, lastNameAgent }= this.props
        return (
            <div className="A4">
            <Header1 date={this.date} />
            <h2>Decharge </h2>
            <div>
                Je soussigné 
                <div className="inputAnimated" >
                    <input type="text" value={responsable} />
                </div> 
                <div className="dechargeRow">
                    <div>
                        <label>Malade</label> <input type="checkbox" checked={typeResponsable.malade} id='malade' />
                    </div>
                    <div>
                        <label>Parent</label> <input type="checkbox" checked={typeResponsable.parent}  id='parent' />
                    </div>
                    <div>
                        <label>Accompagnant</label> <input type="checkbox" id='accompagnant' checked={typeResponsable.accompagnant}  />
                    </div>
                </div>
                Décide de quitter la Clinique AFOUA ce jour
                <div className="inputAnimated" >
                    <input type="text" value={`${this.date.getDate()}/${this.date.getMonth()+1}/${this.date.getFullYear()}` } />
                </div>  <br/>
                A 
                <div className="inputAnimated" >
                    <input type="text" value={`${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()}` } />
                </div> (heures), contre avis médical. <br/>
                Attestation établie pour servir et valoir ce que de droit.
                <div className="dechargeRow" style={{marginTop: 80}}>
                    <div>
                        <h4>Le Médecin</h4>
                        {nameAgent} {lastNameAgent}
                    </div>

                    <div>
                        <div className="inputAnimated" >
                            <input type="text" value={responsable} />
                        </div> <br/>
                        Signature
                    </div>

                </div>
                
            </div>
        </div>
        )
    }
}

export default PrintDecharge
