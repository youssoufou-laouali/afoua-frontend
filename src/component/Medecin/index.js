import React,{useState, useEffect} from 'react'
import axios from 'axios'
import ListMedecin from './ListMedecin'
import './style.css'

const Medecin = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('/api/geant')
        .then(res=>{
            setData(res.data.accueil);
            console.log(res.data.accueil);
        })
        .catch(err=>{
            console.log(err.response.data);
        })
    }, [])

    return (
        <div>
            <div>
                <div className="listMedecinContainer">
                    {
                        data !==[] && (
                            data.map(el=>
                            <ListMedecin 
                                patientName={el.geant.patient.name}
                                patientLastName={el.geant.patient.lastName}
                                patientPhone={el.geant.patient.phone}
                                patientId={el.geant.patient._id}
                                demande={el.geant.demande}
                                post={el.geant.post}
                                idGeant={el._id}
                            />
                            )
                        )
                    }
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Medecin
