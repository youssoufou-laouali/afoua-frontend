import React,{useState, useEffect, useRef} from 'react'
import axios from 'axios'
import { loadingTrue, loadingFalse } from "../../redux/LogIn/action";
import {useDispatch} from 'react-redux'
import ListMedecin from './ListMedecin'
import './style.css'
import CerificatDeVisiteMedicale from '../Fiches/CerificatDeVisiteMedicale'
import PrintCertificatDeVisiteMedical from '../Fiches/CerificatDeVisiteMedicale/PrintCertificatDeVisiteMedical'
import CertificatDeVisiteEtContreVisiteMedicale from '../Fiches/CertificatDeVisiteEtContreVisiteMedicale'
import PrintCertificatDeVisiteEtContreVisiteMedicale from '../Fiches/CertificatDeVisiteEtContreVisiteMedicale/PrintCertificatDeVisiteEtContreVisiteMedicale'
import Decharge from '../Fiches/Decharge'
import PrintDecharge from '../Fiches/Decharge/PrintDecharge'
import SoinsUrgence from '../Fiches/SoinsUrgence'
import PrintSointUrgence from '../Fiches/SoinsUrgence/PrintSoinsUrgence'
import CertificatMedical from '../Fiches/CertificatMedical'
import PrintCertificatMedical from '../Fiches/CertificatMedical/PrintCertificatMedical';
import CompteRenduHospitalisation from '../Fiches/CompteRenduHospitalisation';
import PrintCompteRenduHospitalisation from '../Fiches/CompteRenduHospitalisation/PrintCompteRenduHospitalisation';
import CertificatGrossesse from '../Fiches/CertificatDeGrossesse'
import PrintCertificatGrossesse from '../Fiches/CertificatDeGrossesse/PrintCertificatGrossesse';
import CertificatAccouchement from '../Fiches/CertificatAccouchement'
import PrintCertificatAccouchement from '../Fiches/CertificatAccouchement/PrintCertificatAccouchement';
import Modal from '../Modal'
import {toast} from 'react-toastify'
import ReactToPrint from "react-to-print";
import {useSelector} from 'react-redux'
import {socket} from '../Header'


const Medecin = () => {
    const [data, setData] = useState([])
    const [close, setClose] = useState(false)
    const [patientSelect, setPatientSelect] = useState({})
    const dispatch = useDispatch()

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

    const closing=()=>{
        setClose(!close)
    }
    //Certificat de visite Medical
    const [printCertificatDeVisiteMedicale, setPrintCertificatDeVisiteMedicale] = useState(false)
    const justificationCVM=(a)=>{
        setJustification(a)
    }
    const [justification, setJustification] = useState(`N'est atteint (e) d'aucun signe de maladie contagieuse ou chronique contre indiquant son aptitude au travail. 
En conséquence, le (la) susnommé (e) est apte`)
    const refCertificatDeVisiteMedicale = useRef()

    const print=()=>{
        setPrintCertificatDeVisiteMedicale(!printCertificatDeVisiteMedicale)
    }

    //Certificat de Visite et contre visite médical
    const [agent2, setAgent2] = useState('')
    const changeAgent2=(id)=>{
        setAgent2(id)
    }
    const [closeCVCVM, setCloseCVCVM] = useState(false)
    const [CVCM, setPrintCVCM] = useState(false)
    const refCertificatDeVisiteContreVisiteMedicale = useRef()
    const closingCVCVM=()=>{
        setCloseCVCVM(!closeCVCVM)
    }

    const printCVCM= ()=>{
        setPrintCVCM(!CVCM)
    }

    //Decharge
    const [closeDecharge, setCloseDecharge] = useState(false)
    const [decharge, setPrintDecharge] = useState(false)
    const closingDecharge=()=>{
        setCloseDecharge(!closeDecharge)
    }
    const printDecharge =()=>{
        setPrintDecharge(!decharge)
    }
    const [responsable, setResponsable] = useState('')
    const handleChangeResponsableDecharge=(e)=>{
        setResponsable(e.target.value)
    }
    const [typeResponsable, setTypeResponsable] = useState({
        malade: false, parent: false, accompagnant: false
        })
    const handleChangeTypeResponsableDecharge=(e)=>{
        setTypeResponsable({malade: false, parent: false, accompagnant: false, [e.target.id]: e.target.checked})
    }
    const refDecharge= useRef()

    //Certificat médical
    const refCM= useRef()
    const [closeCM, setCloseCM] = useState(false)
    const [certificatMedical, setPrintCertificatMedical] = useState(false)
    const closingCM= ()=>{
        setCloseCM(!closeCM)
    }
    const printCM=()=>{
        setPrintCertificatMedical(!certificatMedical)
    }

    const [constat, setConstat] = useState('')
    const handleChangeConstat=(e)=>{
        setConstat(e.target.value)
    }
    //Soins en urgence
    const refSEU= useRef()
    const [closeSEU, setCloseSEU] = useState(false)
    const [seu, setPrintSEU] = useState(false)
    const closingSEU=()=>{
        setCloseSEU(!closeSEU)
    }
    const printSEU=()=>{
        setPrintSEU(!seu)
    }  
    const [products, setProducts] = useState([])
    const handleProducts=(e)=>{
        if(!e){
            setProducts([])
            return
        }
        setProducts([...products, e])
    }

    const handleDeleteProduct= (i)=>{
        
        let a = products.filter((el, index)=> index !==i )
        setProducts(a)
    }

    //Compte rendu Hospitalisation
    const refCRH= useRef()
    const [closeCRH, setCloseCRH] = useState(false)
    const [crh, setPrintCRH] = useState(false)
    const closingCRH=()=>{
        setCloseCRH(!closeCRH)
    }
    const printCRH=()=>{
        setPrintCRH(!crh)
    }  

    const [dataCRH, setDataCRH] = useState({})
    const handleChangeCRH=(e)=>{
        setDataCRH({...dataCRH, [e.target.id]: e.target.value})
        console.log(e.target.value, dataCRH);
    }

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


    const handlePatient=({idGeant, demande, patientName, patientLastName, patientPhone, patientId, module, dateDeNaissance, lieuDeNaissance})=>{
        setPatientSelect({idGeant, demande, patientName, patientLastName, patientPhone, patientId, module, dateDeNaissance, lieuDeNaissance})
        const date= new Date(dateDeNaissance)
        let j = date.getDate()
        let m= date.getMonth()+1
        const a= date.getFullYear()
        
        j= j<10 ? '0'+j : j+''
        m= m<10 ? '0'+m : m+''


        const naissanceDate =a + '-'+m+'-'+j;
        setPatient({name: patientName, lastName: patientLastName, id: patientId, phone: patientPhone, dateDeNaissance: naissanceDate , lieuDeNaissance})
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
        console.log(new Date(dateDeNaissance));
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
                            <li onClick={()=>closing()}>Certificat De Visite Medicale</li>
                            <li onClick={()=>closingCVCVM()}>Certificat De Visite et Contre Visite Medicale</li>
                            <li onClick={()=>closingDecharge()} >Decharge</li>
                            <li onClick={()=>closingCM()}>Certificat Medical</li>
                            <li onClick={()=>closingSEU()}>Soins en Urgence</li>
                            <li onClick={()=>closingCRH()}>Compte Rendu D'Hospitalisation</li>
                            <li onClick={()=>closingCG()}>Certificat de Grossesse</li>
                            <li onClick={()=>closingCA()}>Certificat D'Accouchement</li>
                        </ul>
                    </div>)
                    }
                </div>
            </div>
            <div style={{textAlign: 'center', minWidth:'60vw'}}>
                    <h3>{patient.name} { patient.lastName}</h3>
                    né(e) le { patient.dateDeNaissance} à {patient.lieuDeNaissance}
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
                    close && 
                    <Modal close={closing}>
                        <CerificatDeVisiteMedicale 
                            namePatient={patient.name}
                            lastNamePatient={patient.lastName}
                            dateDeNaissance={patient.dateDeNaissance}
                            lieuDeNaissance={patient.lieuDeNaissance}
                            idPatient={patient.id}
                            module={patientSelect.module}
                            close={closing}
                            print={print}
                            label={true}
                            justificationCVM={justificationCVM}
                            justification={justification}
                        />
                    </Modal>

                }
                {
                    printCertificatDeVisiteMedicale && (

                        <Modal close={print}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refCertificatDeVisiteMedicale.current}
                            />

                            <PrintCertificatDeVisiteMedical
                                namePatient={patient.name}
                                lastNamePatient={patient.lastName}
                                dateDeNaissance={patient.dateDeNaissance}
                                lieuDeNaissance={patient.lieuDeNaissance}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                justification={justification}
                                ref={refCertificatDeVisiteMedicale}
                            />
                        </Modal>
                )}
                {
                    closeCVCVM &&(
                    <Modal close={closingCVCVM}>
                        <CertificatDeVisiteEtContreVisiteMedicale
                            namePatient={patientSelect.patientName}
                            lastNamePatient={patientSelect.patientLastName}
                            dateDeNaissance={patientSelect.dateDeNaissance}
                            lieuDeNaissance={patientSelect.lieuDeNaissance}
                            idPatient={patientSelect.patientId}
                            module={patientSelect.module}
                            nameAgent={nameAgent}
                            lastNameAgent={lastNameAgent}
                            AgentNames={AgentNames}
                            changeAgent2={changeAgent2}
                            agent2={agent2}
                            closingCVCVM={closingCVCVM}
                            printCVCM={printCVCM}
                        />
                    </Modal>)
                }

                {
                    CVCM && (
                        <Modal close={printCVCM}>

                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refCertificatDeVisiteContreVisiteMedicale.current}
                            />

                            <PrintCertificatDeVisiteEtContreVisiteMedicale
                            namePatient={patientSelect.patientName}
                            lastNamePatient={patientSelect.patientLastName}
                            dateDeNaissance={patientSelect.dateDeNaissance}
                            lieuDeNaissance={patientSelect.lieuDeNaissance}
                            idPatient={patientSelect.patientId}
                            module={patientSelect.module}
                            nameAgent={nameAgent}
                            lastNameAgent={lastNameAgent}
                            AgentNames={AgentNames}
                            agent2={agent2}
                            ref={refCertificatDeVisiteContreVisiteMedicale}
                            />
                        </Modal>
                    )
                }
                {
                    closeDecharge &&(
                        <Modal close={closingDecharge}>
                            <Decharge 
                                handleChangeResponsableDecharge={handleChangeResponsableDecharge}
                                responsable={responsable}
                                handleChangeTypeResponsableDecharge={handleChangeTypeResponsableDecharge}
                                typeResponsable={typeResponsable}
                                patient={patient.id}
                                module={patientSelect.module}
                                printDecharge={printDecharge}
                                closeDecharge={closingDecharge}
                            />
                        </Modal>
                    )
                }
                {
                    decharge &&(
                        <Modal close={printDecharge}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refDecharge.current}
                            />

                            <PrintDecharge 
                                handleChangeResponsableDecharge={handleChangeResponsableDecharge}
                                responsable={responsable}
                                handleChangeTypeResponsableDecharge={handleChangeTypeResponsableDecharge}
                                typeResponsable={typeResponsable}
                                patient={patient.id}
                                printDecharge={printDecharge}
                                closeDecharge={closingDecharge}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refDecharge}
                            />
                        </Modal>
                    )
                }
                {
                    closeCM && (
                        <Modal close={closingCM}>
                            <CertificatMedical 
                                closeCM={closingCM}
                                printCM={printCM}
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                idPatient={patient.id}
                                constat={constat}
                                handleChangeConstat={handleChangeConstat}
                                module={patientSelect.module}
                            />
                        </Modal>
                    )
                }
                {
                    certificatMedical && (

                        <Modal close={printCM}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refCM.current}
                            />
                            <PrintCertificatMedical 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                constat={constat}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refCM}
                            />
                        </Modal>
                    )
                }
                {
                    closeSEU &&(
                        <Modal close={closingSEU}>
                            <SoinsUrgence 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                dateDeNaissance={patient.dateDeNaissance}
                                products={products}
                                handleProducts={handleProducts}
                                handleDelete={handleDeleteProduct}
                                idPatient={patient.id}
                                closeSEU={closingSEU}
                                printSEU={printSEU}
                            />
                        </Modal>
                    )
                }
                {
                    seu &&(
                        <Modal close={printSEU}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refSEU.current}
                            />

                            <PrintSointUrgence
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                dateDeNaissance={patient.dateDeNaissance}
                                products={products}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refSEU}
                            />
                        </Modal>
                    )
                }
                {
                    closeCRH &&(
                        <Modal close={closingCRH}>
                            <CompteRenduHospitalisation 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                dateDeNaissance={patient.dateDeNaissance}
                                handleChange={handleChangeCRH}
                                data={dataCRH}
                                printCRH={printCRH}
                                closeCRH={closingCRH}
                               
                            />
                        </Modal>
                    )
                }
                {
                    crh &&(
                        <Modal close={printCRH}>
                            <ReactToPrint
                                trigger={() => <button className="printBoutton">Imprimer</button>}
                                content={() => refCRH.current}
                            />

                            <PrintCompteRenduHospitalisation 
                                namePatient={patient.name}
                                lastNamePatient= {patient.lastName}
                                dateDeNaissance={patient.dateDeNaissance}
                                data={dataCRH}
                                nameAgent={nameAgent}
                                lastNameAgent={lastNameAgent}
                                ref={refCRH}
                            />
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
            </div>
        </div>
    )
}

export default Medecin
