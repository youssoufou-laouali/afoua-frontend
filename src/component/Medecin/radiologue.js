import React,{useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../redux/LogIn/action";
import {useDispatch} from 'react-redux'
import ListMedecin from './ListMedecin'
import './style.css'
import EchograhieAbdominale from '../Fiches/EchographieAbdominale';
import PrintEchographieAbdominale from '../Fiches/EchographieAbdominale/PrintEchographieAbdominale';
import EchoVesicoProstatique from '../Fiches/EchoVesicoProstatique';
import PrintEchoVesicoProstatique from '../Fiches/EchoVesicoProstatique/PrintEchoVesicoProstatique';
import Modal from '../Modal'
import {toast} from 'react-toastify'
import ReactToPrint from "react-to-print";
import {useSelector} from 'react-redux'
import {socket} from '../Header'
import { logOut } from '../../redux/LogIn/action'
import {useHistory} from 'react-router-dom'


const Medecin = () => {
    const [data, setData] = useState([])
    const [close, setClose] = useState(false)
    const [patientSelect, setPatientSelect] = useState({})
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state.login)
    const handleLogOut= ()=>{
        localStorage.removeItem('jwtToken')
        dispatch(logOut())
    }
    useEffect(() => {
        if(currentUser.currentUser.exp*1000 <= Date.now()){
            handleLogOut()
        }
        if(currentUser.currentUser.post !== 'radiologue' && currentUser.currentUser.post !== 'superAdmin'){
            history.push('/')
        }
    }, [])


    useEffect(() => {
        if(!currentUser.isAuthenticated){
            history.push('/signin')
        }
    }, [currentUser, history])

    //patient
    const [updatePatient, setUpdatePatient] = useState(false)
    const [patient, setPatient] = useState({
        name:'', lastName: '',
        phone: 0, dateDeNaissance:'',
        lieuDeNaissance: '', adresse: '', id: ''
    })
    const updatingPatient=()=>{
        setUpdatePatient(!updatePatient)
    }

    const handleChange= (e)=>{
        e.target.id=='phone' ? setPatient({...patient, [e.target.id]: parseInt(e.target.value)}):
        setPatient({...patient, [e.target.id]: e.target.value})
        
    }

    const [DossierMedicals, setDossierMedical] = useState([])
    const loadDossierMedical= (id)=>{
        axios.post('/dossier', {id: id})
        .then(res=>{
            setDossierMedical(res.data)
            console.log(res.data);
        })
        .catch(errors=> console.log(errors))
    }

    const patchPatient= (e)=>{
        e.preventDefault()
        dispatch(loadingTrue())
        axios.post('/api/patient/update', patient)
            .then(res=>{
                dispatch(loadingFalse())

                toast("Le profil du patient est mis à jour", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    pauseOnHover: true,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    type: 'success'
                }) 
                updatingPatient()
            })
            .catch(err=>{
                dispatch(loadingFalse())
                console.log(err);
            })
    }
    //Agent
    const agent = useSelector(state => state.login)
    const nameAgent = agent.currentUser.name
    const lastNameAgent = agent.currentUser.lastName

    //EchograhieAbdominale
    const refEA= useRef()
    const [closeEA, setCloseEA] = useState(false)
    const [ea, setPrintEA] = useState(false)
    const closingEA=()=>{
        setCloseEA(!closeEA)
    }
    const printEA=()=>{
        setPrintEA(!ea)
    } 
    const [dataEA, setDataEA] = useState({})
    const handleChangeEA=(e)=>{
        setDataEA({...dataEA, [e.target.id]: e.target.value})
    }
    //EchoVesicoProstatique
    const refEVP= useRef()
    const [closeEVP, setCloseEVP] = useState(false)
    const [evp, setPrintEVP] = useState(false)
    const closingEVP=()=>{
        setCloseEVP(!closeEVP)
    }
    const printEVP=()=>{
        setPrintEVP(!evp)
    } 
    const [dataEVP, setDataEVP] = useState({})
    const handleChangeEVP=(e)=>{
        setDataEVP({...dataEVP, [e.target.id]: e.target.value})
    }

    //filtrer les accées des medecins
    const getGeant=()=>{
        axios.get('/api/geant')
        .then(res=>{
            let y = res.data.accueil.filter(el=> el.geant.post==agent.currentUser.post || agent.currentUser.post=='superAdmin')
            setData(y);
            console.log(res.data.accueil);
        })
        .catch(err=>{
            console.log(err.response);
        })
    }

    useEffect(() => {
        getGeant()

    }, [])

    const [AgentNames, setAgentNames] = useState([])
    useEffect(() => {
       axios.get('/api/agent')
       .then(agents=>{
            let agentnames = agents.data.agent.map(el=> {
              return  {id: el._id, name: el.name + ' ' + el.lastName}
            })
            setAgentNames(agentnames)
       })
       .catch(err=> console.log(err))
    }, [])

    useEffect(() => {
        socket.on('murgeant', data=>{
            getGeant()
        })
    }, [])


    const handlePatient=({idGeant, demande, patientName, patientLastName, adresse, patientPhone, patientId, module, dateDeNaissance, lieuDeNaissance})=>{
        setPatientSelect({idGeant, demande, patientName, patientLastName, adresse, patientPhone, patientId, module, dateDeNaissance, lieuDeNaissance})
        const date= new Date(dateDeNaissance)
        let j = date.getDate()
        let m= date.getMonth()+1
        const a= date.getFullYear()
        
        j= j<10 ? '0'+j : j+''
        m= m<10 ? '0'+m : m+''


        const naissanceDate =a + '-'+m+'-'+j;
        setPatient({name: patientName, lastName: patientLastName, id: patientId, phone: patientPhone, dateDeNaissance: naissanceDate , lieuDeNaissance, adresse})
        toast(`${patientName} ${patientLastName} est seletionné`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            pauseOnHover: true,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            type: 'success'
            })
        updatingPatient()
        loadDossierMedical(patientId)
    }

    return (
        <div style={{display: 'flex'}}>
            <div>
                <div className="listMedecinContainer">
                    {
                        data !==[] && (
                            data.map(el=>
                            
                            <ListMedecin 
                                handlePatient={handlePatient}
                                patientName={el.geant.patient.name}
                                patientLastName={el.geant.patient.lastName}
                                patientPhone={el.geant.patient.phone}
                                patientId={el.geant.patient._id}
                                demande={el.geant.demande}
                                post={el.geant.post}
                                idGeant={el._id}
                                adresse={el.geant.patient.adresse? el.geant.patient.adresse : '' }
                                module={el.geant.module}
                                dateDeNaissance={el.geant.patient.dateDeNaissance ? el.geant.patient.dateDeNaissance : ''}
                                lieuDeNaissance={el.geant.patient.lieuDeNaissance ? el.geant.patient.lieuDeNaissance : ''}
                            />
                           )
                        )
                    }
                </div>
                <div>
                    { patientSelect.idGeant &&(
                    <div className="buttonAddContainer">
                        <div className="buttonAdd">+</div>
                        <ul>
                            <li onClick={()=>closingEA()}>Echographie Abdominale</li>
                            <li onClick={()=>closingEVP()}>Echographie Vesico-Prostatique</li>
                        </ul>
                    </div>)
                    }
                </div>
            </div>
            <div style={{textAlign: 'center', minWidth:'60vw'}}>

                {
                    //Update Patient
                    updatePatient && (
                        <Modal close={setUpdatePatient}> 
                            <div className='accueil-add-patient'> 
                                <form className="profil-box" onSubmit={(e)=> patchPatient(e)}>
                                <h2 style={{textAlign: 'center'}}>Mettre à jour le profil du patient</h2>
                                    <div className="profil-flex">
                                        <div>
                                            <label htmlFor='name'>Prénom</label>
                                            <input type="text" value={patient.name} onChange={(e)=>handleChange(e)} placeholder='Prénom' id='name' />
                                        </div>
                                        <div>
                                            <label htmlFor='lastName'>Nom de famille</label> 
                                            <input type="text" id='lastName' value={patient.lastName} onChange={(e)=>handleChange(e)} placeholder='Nom de Famille' />
                                        </div>
                                    </div>
                                    <div className="profil-flex">
                                        
                                        <div>
                                            <label htmlFor='phone'>Numéro de téléphone</label> 
                                            <input type="number" id='phone' value={patient.phone} onChange={(e)=>handleChange(e)} placeholder='Numéro de téléphone' />
                                        </div>
                                        <div>
                                            <label htmlFor='dateDeNaissance'>Date de Naissance</label> 
                                            <input type="date" value={patient.dateDeNaissance} placeholder='Date de Naissance' onChange={(e)=>handleChange(e)} id='dateDeNaissance' />
                                        </div>
                                    </div>
                                    <div className="profil-flex">
                                        
                                        <div>
                                            <label htmlFor='lieuDeNaissance'>Lieu de Naissance</label> 
                                            <input type="text" id='lieuDeNaissance' value={patient.lieuDeNaissance} onChange={(e)=>handleChange(e)} placeholder='Lieu de Naissance' />
                                        </div>
                                        <div>
                                            <label htmlFor='adresse'>Adresse</label> 
                                            <input type="text" value={patient.adresse} placeholder='Adresse' onChange={(e)=>handleChange(e)} id='Adresse' />
                                        </div>
                                    </div>                                       
                                        <input className="input-submit" value='validé' type="submit" />
                                     
                                </form>
                            </div>
                        </Modal>
                    )
                }
                
                {
                    closeEA &&(
                        <Modal close={closingEA}>
                            <EchograhieAbdominale 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                data={dataEA}
                                idPatient={patient.id}
                                dateDeNaissance= {patient.dateDeNaissance}
                                closeEA={closingEA}
                                printEA={printEA}
                                handleChange={handleChangeEA}
                            />
                        </Modal>)
                }
                {
                    ea && (
                        <Modal close={printEA}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refEA.current}
                            />

                            <PrintEchographieAbdominale
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                dateDeNaissance={patient.dateDeNaissance}
                                data={dataEA}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refEA}
                            />
                        </Modal>
                    )
                }
                {
                    closeEVP &&(
                        <Modal close={closingEVP}>
                            <EchoVesicoProstatique 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                data={dataEVP}
                                idPatient={patient.id}
                                dateDeNaissance= {patient.dateDeNaissance}
                                closeEVP={closingEVP}
                                printEVP={printEVP}
                                handleChange={handleChangeEVP}
                            />
                        </Modal>)
                }
                {
                    evp && (
                        <Modal close={printEVP}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refEVP.current}
                            />

                            <PrintEchoVesicoProstatique
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                dateDeNaissance={patient.dateDeNaissance}
                                data={dataEVP}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refEVP}
                            />
                        </Modal>
                    )
                }
            </div>
        </div>
    )
}

export default Medecin
