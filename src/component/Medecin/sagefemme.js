import React,{useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../redux/LogIn/action";
import {useDispatch} from 'react-redux'
import ListMedecin from './ListMedecin'
import './style.css'
import CertificatGrossesse from '../Fiches/CertificatDeGrossesse'
import PrintCertificatGrossesse from '../Fiches/CertificatDeGrossesse/PrintCertificatGrossesse';
import CertificatAccouchement from '../Fiches/CertificatAccouchement'
import PrintCertificatAccouchement from '../Fiches/CertificatAccouchement/PrintCertificatAccouchement';
import CompteRenduAccouchement from '../Fiches/CompteRenduAccouchement';
import PrintCompteRenduAccouchement from '../Fiches/CompteRenduAccouchement/PrintCompteRenduAccouchement';
import PrintDossier from '../Fiches/DossierMedical/PrintDossier'
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

    //Certificat de grossesse
    const refCG= useRef()
    const [closeCG, setCloseCG] = useState(false)
    const [cg, setPrintCG] = useState(false)
    const closingCG=()=>{
        setCloseCG(!closeCG)
    }
    const printCG=()=>{
        setPrintCG(!cg)
    }  

    const [dataCG, setDataCG] = useState({})
    const handleChangeCG=(e)=>{
        setDataCG({...dataCG, [e.target.id]: e.target.value})
    }
    //Certificat d'accouchement
    const refCA= useRef()
    const [closeCA, setCloseCA] = useState(false)
    const [ca, setPrintCA] = useState(false)
    const closingCA=()=>{
        setCloseCA(!closeCA)
    }
    const printCA=()=>{
        setPrintCA(!ca)
    } 
    const [dataCA, setDataCA] = useState({})
    const handleChangeCA=(e)=>{
        setDataCA({...dataCA, [e.target.id]: e.target.value})
    }

    //Compte Rendu D'accouchement
    const refCRA= useRef()
    const [closeCRA, setCloseCRA] = useState(false)
    const [cra, setPrintCRA] = useState(false)
    const closingCRA=()=>{
        setCloseCRA(!closeCRA)
    }
    const printCRA=()=>{
        setPrintCRA(!cra)
    } 
    const [dataCRA, setDataCRA] = useState({})
    const handleChangeCRA=(e)=>{
        setDataCRA({...dataCRA, [e.target.id]: e.target.value})
    }

    //Dossier Medical
    const refDM= useRef()
    const [closeDM, setCloseDM] = useState(false)
    const [DM, setPrintDM] = useState(false)
    const closingDM=()=>{
        setCloseDM(!closeDM)
    }
    const printDM=()=>{
        setPrintDM(!DM)
    } 
    const [dataDM, setDataDM] = useState({})
    const handleChangeDM=(e)=>{
        setDataDM({...dataDM, [e.target.id]: e.target.value})
    }
    const [ExamenDM, setExamenDM] = useState([])
    const handleExamenDM= (data)=>{
        setExamenDM(data)
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
                            <li onClick={()=>closingCG()}>Certificat de Grossesse</li>
                            <li onClick={()=>closingCA()}>Certificat D'Accouchement</li>
                            <li onClick={()=>closingCRA()}>Compte Rendu D'Accouchement</li>
                        </ul>
                    </div>)
                    }
                </div>
            </div>
            <div style={{textAlign: 'center', minWidth:'60vw'}}>

                    <div style={{width: '100%', height: '520px', overflow: 'scroll'}}>
                        {
                            DossierMedicals.length !== 0 && (
                                <div style={{backgroundColor: 'black'}}>
                                    <PrintDossier
                                        namePatient={patient.name}
                                        lastNamePatient= {patient.lastName}
                                        dateDeNaissance={patient.dateDeNaissance}
                                        data={DossierMedicals[0]}
                                        nameAgent={nameAgent}
                                        lastNameAgent={lastNameAgent}
                                        Examens={DossierMedicals[0].examensUlterieurs}
                                    />
                                </div>)
                            }
                    </div>

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
                    closeCG &&(
                        <Modal close={closingCG}>
                            <CertificatGrossesse 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                printCG={printCG}
                                closeCG={closingCG}
                                idPatient={patient.id}
                                data={dataCG}
                                handleChange={handleChangeCG}
                            />
                            
                        </Modal>
                    )
                }
                {
                    cg && (
                        <Modal close={printCG}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refCG.current}
                            />

                            <PrintCertificatGrossesse 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                data={dataCG}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refCG}
                            />
                        </Modal>
                    )
                }

                {
                    closeCA &&(
                        <Modal close={closingCA}>
                            <CertificatAccouchement 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                printCA={printCA}
                                closeCA={closingCA}
                                idPatient={patient.id}
                                data={dataCA}
                                handleChange={handleChangeCA}
                            />
                        </Modal>
                    )
                }

                {
                    ca && (
                        <Modal close={printCA}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refCA.current}
                            />

                            <PrintCertificatAccouchement 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                data={dataCA}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refCA}
                            />
                        </Modal>
                    )
                }
                {
                   closeCRA &&(
                    <Modal close={closingCRA}>
                        <CompteRenduAccouchement 
                            namePatient={patient.name}
                            lastNamePatient= {patient.lastName}
                            data={dataCRA}
                            idPatient={patient.id}
                            nameAgent={nameAgent}
                            lastNameAgent={lastNameAgent} 
                            closeCRA={closingCRA}
                            printCRA={printCRA}
                            handleChange={handleChangeCRA}
                        />
                    </Modal>
                )
                }
                {
                    cra && (
                        <Modal close={printCRA}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refCRA.current}
                            />

                            <PrintCompteRenduAccouchement 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                data={dataCRA}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refCRA}
                            />
                        </Modal>
                    )
                }
            </div>
        </div>
    )
}

export default Medecin
