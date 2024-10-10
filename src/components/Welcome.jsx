import React from 'react'

Welcome.propTypes = {

}

export default function Welcome({name}) {
  return (
    <div className='col-8 text-center'>
        <h1 className='mb-3'>Welcome {name} </h1>
        <p>Bienvenue sur notre plateforme dédiée à la création et la gestion de CV. Que vous soyez en début de carrière ou un professionnel chevronné, notre outil intuitif vous aide à construire un CV percutant et personnalisé en quelques étapes simples. Mettez en valeur vos compétences, vos expériences et démarquez-vous auprès des recruteurs grâce à notre interface conviviale et nos modèles élégants. Commencez dès maintenant à construire votre avenir professionnel avec nous.</p>
    </div>
  )
}