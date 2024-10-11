import React from 'react'
import { useState, useEffect } from 'react'



Searchcv.propTypes = {

}

export default function Searchcv({criteria, setCriteria}) {

  return (
    <div className='d-flex gap-3 mb-3'>
        <label htmlFor="criteria">Filtrer par nom</label>
        <input id='criteria' type="text" value={criteria} onChange={(e)=>{
            setCriteria(e.target.value)}}/>
    </div>
  )
}
