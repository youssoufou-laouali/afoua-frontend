import React from 'react'
import  './style.css'

const ListeInteraction = ({price, label, poste, id, openingModale}) => {
    return (
        <div key={id} className="listContainerInteraction" >
            <div><h3>{label}</h3> </div>
            <div className="flexInteraction">
                <div>{poste} </div>
                <div>{price} FCFA</div>
            </div>
            <div className="interactionOverlaye">
                <div><button onClick={()=>openingModale({price, label, poste, id})}>Modifier</button></div>
            </div>
        </div>
    )
}

export default ListeInteraction
