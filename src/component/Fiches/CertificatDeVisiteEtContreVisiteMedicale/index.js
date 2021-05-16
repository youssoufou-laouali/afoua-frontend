import React,{useState, useEffect} from 'react'
import Header1 from '../Header1'
import axios from 'axios'

const CertificatDeVisiteEtContreVisiteMedicale = ({namePatient, lastNamePatient, dateDeNaissance, lieuDeNaissance, idPatient, module, nameAgent, lastNameAgent, AgentNames, changeAgent2, agent2}) => {
    const [naissance, setNaissance] = useState('')
    
    const date = new Date()
    useEffect(() => {
        dateDeNaissance !== '' && setNaissance(new Date(dateDeNaissance))
        
    }, [])

    const handleSubmit=()=>{
        axios.post('/certificatvisitecontrevisite/add', {
            patient: idPatient,
            createdBy2: agent2
        })
        .then(res=> console.log(res.data))
        .catch(err=> console.log(err))
    }

    return (
        <div className="A4">
            
            <Header1 date={date} />
            <div>
            <h3>CERTIFICAT DE VISITE MEDICALE</h3>

            En exécution des règlements en vigueur, nous soussigné 
            <div className="inputAnimated" >
                <input type="text" value={`${nameAgent} ${lastNameAgent}`} />
                <label htmlFor='nameAgent'>nom de l'agent</label> 
            </div> <br/>
            Certifions que le (la) nommé (e):
            <div className="inputAnimated" >
                <input type="text" value={`${namePatient} ${lastNamePatient}`} />
                <label htmlFor='nameAgent'>nom du patient</label> 
            </div> <br/>
            Né (e) à: 
            <div className="inputAnimated" >
                <input type="text" value={`${lieuDeNaissance}`} />
                <label htmlFor='nameAgent'>lieu de naissance</label> 
            </div> le :
            <div className="inputAnimated" >
                <input type="text" value={naissance !='' ? `${naissance.getDate()}/${naissance.getMonth()+1}/${naissance.getFullYear()}`: ''} />
                <label htmlFor='nameAgent'>nom de l'agent</label> 
            </div> <br/>

            N'est atteint (e) d'aucun signe de maladie contagieuse ou chronique contre indiquant son aptitude au travail <br/>
            <br/>
            En conséquence, le (la) susnommé (e) est apte <br/>

            <div className="right">
                Fait à Niamey, le  
                <div className="inputAnimated" >
                    <input type="text" value={`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` }/>
                    <label htmlFor='date'>date</label>
                </div> <br/> <br/>
                Le Médecin: 
            </div>
            <hr/>


            <h3>CERTIFICAT DE CONTRE VISITE MEDICALE</h3>

            En exécution des règlements en vigueur, nous soussigné 
            <div className="inputAnimated" >
                <select value={agent2} onChange={(e)=>changeAgent2(e.target.value)} >
                    <option value="" key="">Choisir le deuxieme médecin</option>
                    {
                        AgentNames.map(el=>{
                            return <option value={el.id} key={el.id}>{el.name}</option>
                        })
                    }
                </select>
                
            </div> <br/>
            Certifions que le (la) nommé (e):
            <div className="inputAnimated" >
                <input type="text" value={`${namePatient} ${lastNamePatient}`} />
                <label htmlFor='nameAgent'>nom du patient</label> 
            </div> <br/>
            Né (e) à: 
            <div className="inputAnimated" >
                <input type="text" value={`${lieuDeNaissance}`} />
                <label htmlFor='nameAgent'>lieu de naissance</label> 
            </div> le :
            <div className="inputAnimated" >
                <input type="text" value={naissance !='' ? `${naissance.getDate()}/${naissance.getMonth()+1}/${naissance.getFullYear()}`: ''} />
                <label htmlFor='nameAgent'>nom de l'agent</label> 
            </div> <br/>

            N'est atteint (e) d'aucun signe de maladie contagieuse ou chronique contre indiquant son aptitude au travail <br/>
            <br/>
            En conséquence, le (la) susnommé (e) est apte <br/>

            <div className="right">
                Fait à Niamey, le  
                <div className="inputAnimated" >
                    <input type="text" value={`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}` }/>
                    <label htmlFor='date'>date</label>
                </div> <br/> <br/>
                Le Médecin: 
            </div>

            <button className="submitA4" onClick={()=>handleSubmit()}>Envoyer</button>
            </div>
        </div>
    )
}

export default CertificatDeVisiteEtContreVisiteMedicale
