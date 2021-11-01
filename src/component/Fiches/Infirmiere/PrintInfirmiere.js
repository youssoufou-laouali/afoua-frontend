import React, { Component } from 'react'
import Header1 from '../Header1'

class PrintInfirmiere extends Component {

    constructor(props){
        super(props)
    }

     retX=(i)=>{
        let results=[]
        for(let a=0; a<i; a++){
            results.push(i)
        }
        return results
    }
    date= new Date();

    render() {

        const {namePatient, lastNamePatient,dateDeNaissance ,nameAgent, lastNameAgent, data}= this.props

         
        return (
            <div className="A4 A4Infirmiere">
            <Header1 date={this.date} />
            <div>
                Nom et Prénom: <strong>{` ${namePatient} ${lastNamePatient}`} </strong> 
                age: <strong>{this.date.getFullYear()-parseInt(dateDeNaissance)}</strong>
                Sexe:
                <div className="inputAnimated" >
                 <input type="text" value={data.sexe}  id='sexe'/>
                 </div> <br/>
                Poid:
                <div className="inputAnimated" >
                 <input type="text" value={data.poids}  id='poids'/>
                 </div> Kg
                Chambre N°
                <div className="inputAnimated" >
                 <input type="text" value={data.chambre}  id='chambre'/>
                 </div>
                <br/>
                

                <table style={{borderSpacing: 0, padding: 5, textAlign: 'center'}}>
                    <tr>
                        <th style={{width: 250}}>
                            TRAITEMENT
                        </th>
                        <th>
                            J1 <br/>
                            <tr>
                                <td>M</td>
                                <td>M</td>
                                <td>S</td>
                            </tr>
                        </th>
                        <th>
                            J2 <br/>
                            <tr>
                                <td>M</td>
                                <td>M</td>
                                <td>S</td>
                            </tr>
                        </th>
                        <th>
                            J3 
                            <tr>
                                <td>M</td>
                                <td>M</td>
                                <td>S</td>
                            </tr>
                        </th>
                        <th>
                            J4 <br/>
                            <tr>
                                <td>M</td>
                                <td>M</td>
                                <td>S</td>
                            </tr>
                        </th>
                        <th>
                            J5 <br/>
                            <tr>
                                <td>M</td>
                                <td>M</td>
                                <td>S</td>
                            </tr>
                        </th>
                        <th>
                            J6 <br/>
                            <tr>
                                <td>M</td>
                                <td>M</td>
                                <td>S</td>
                            </tr>
                        </th>
                    </tr>
                    {
                        data.traitement.map((el, index)=>{
                            console.log(el, index);
                            return (
                                <tr key={index}>
                                    <td>{el.labbel}</td>
                                    <td>
                                        <tr>
                                            <td>
                                            <input type="checkbox" checked={el.j1matin} />
                                            </td>
                                            <td>
                                            <input type="checkbox" checked={el.j1midi} />
                                            </td>
                                            <td>
                                            <input type="checkbox" checked={el.j1soir} />
                                            </td>
                                            
                                        </tr>
                                    </td>
                                    <td>
                                        <tr>
                                            <td>
                                            <input type="checkbox" checked={el.j2matin} />
                                            </td>
                                            <td>
                                            <input type="checkbox" checked={el.j2midi} />
                                            </td>
                                            <td>
                                            <input type="checkbox" checked={el.j2soir} />
                                            </td>
                                            
                                        </tr>
                                    </td>
                                    <td>
                                        <tr>
                                            <td>
                                            <input type="checkbox" checked={el.j3matin} />
                                            </td>
                                            <td>
                                            <input type="checkbox" checked={el.j3midi} />
                                            </td>
                                            <td>
                                            <input type="checkbox" checked={el.j3soir} />
                                            </td>
                                            
                                        </tr>
                                    </td>
                                    <td>
                                        <tr>
                                            <td>
                                            <input type="checkbox" checked={el.j4matin} />
                                            </td>
                                            <td>
                                            <input type="checkbox" checked={el.j4midi} />
                                            </td>
                                            <td>
                                            <input type="checkbox" checked={el.j4soir} />
                                            </td>
                                            
                                        </tr>
                                    </td>
                                    <td>
                                        <tr>
                                            <td>
                                            <input type="checkbox" checked={el.j5matin} />
                                            </td>
                                            <td>
                                            <input type="checkbox" checked={el.j5midi} />
                                            </td>
                                            <td>
                                            <input type="checkbox" checked={el.j5soir} />
                                            </td>
                                            
                                        </tr>
                                    </td>
                                    <td>
                                        <tr>
                                            <td>
                                            <input type="checkbox" checked={el.j6matin} />
                                            </td>
                                            <td>
                                            <input type="checkbox" checked={el.j6midi} />
                                            </td>
                                            <td>
                                            <input type="checkbox" checked={el.j6soir} />
                                            </td>
                                            
                                        </tr>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    <tr style={{height: 20}}> 
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    </tr>
                    <tr>
                        <th>
                            <td>FR</td>
                            <td>Ur cc</td>
                            <td>Pouls</td>
                            <td>TA</td>
                            <td>T°</td>
                        </th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>
                            <td></td>
                            <td>3500</td>
                            <td>180</td>
                            <td></td>
                            <td>42°</td>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t42.j1} />
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t42.j2}/>
                        </td>
                        <td>
                            <input type="checkbox"checked={data?.t42.j3}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t42.j4}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t42.j5}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t42.j6}/>
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                            <td></td>
                            <td>3000</td>
                            <td>160</td>
                            <td></td>
                            <td>41°</td>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t41.j1} />
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t41.j2}/>
                        </td>
                        <td>
                            <input type="checkbox"checked={data?.t41.j3}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t41.j4}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t41.j5}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t41.j6}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <td>50</td>
                            <td>2500</td>
                            <td>140</td>
                            <td>25</td>
                            <td>40°</td>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t40.j1} />
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t40.j2}/>
                        </td>
                        <td>
                            <input type="checkbox"checked={data?.t40.j3}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t40.j4}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t40.j5}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t40.j6}/>
                        </td>
                       
                    </tr>
                    <tr>
                        <td>
                            <td>40</td>
                            <td>2000</td>
                            <td>120</td>
                            <td>20</td>
                            <td>39°</td>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t39.j1} />
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t39.j2}/>
                        </td>
                        <td>
                            <input type="checkbox"checked={data?.t39.j3}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t39.j4}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t39.j5}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t39.j6}/>
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                            <td>30</td>
                            <td>1500</td>
                            <td>100</td>
                            <td>15</td>
                            <td>38°</td>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t38.j1} />
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t38.j2}/>
                        </td>
                        <td>
                            <input type="checkbox"checked={data?.t38.j3}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t38.j4}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t38.j5}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t38.j6}/>
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                            <td>20</td>
                            <td>1000</td>
                            <td>80</td>
                            <td>10</td>
                            <td>37°</td>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t37.j1} />
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t37.j2}/>
                        </td>
                        <td>
                            <input type="checkbox"checked={data?.t37.j3}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t37.j4}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t37.j5}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t37.j6}/>
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                            <td>10</td>
                            <td>500</td>
                            <td>60</td>
                            <td>5</td>
                            <td>36°</td>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t36.j1} />
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t36.j2}/>
                        </td>
                        <td>
                            <input type="checkbox"checked={data?.t36.j3}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t36.j4}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t36.j5}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t36.j6}/>
                        </td>
                        
                    </tr>
                    <tr>
                        <td>
                            <td></td>
                            <td>0</td>
                            <td>40</td>
                            <td></td>
                            <td>35°</td>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t35.j1} />
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t35.j2}/>
                        </td>
                        <td>
                            <input type="checkbox"checked={data?.t35.j3}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t35.j4}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t35.j5}/>
                        </td>
                        <td>
                            <input type="checkbox" checked={data?.t35.j6}/>
                        </td>
                       
                    </tr>
                    <tr>
                        <th rowSpan={6}>EXAMENS COMPLEMENTAIRES</th>
                        <th colSpan={6}>
                            
                            {
                                data.examensComplementaires.map((el, index)=>{
                                    return (
                                        <tr key={index}>{el} </tr>
                                    )
                                })
                            }
                        </th>
                    </tr>
                </table>

            </div>  
        </div>
        )
    }
}

export default PrintInfirmiere
