import React from 'react'

const LocationInfo = ({location}) => {

//console.log(location)

  return (
    <article className='information'>
       <h2>{location?.name}</h2>
       <ul className='information__data'>
        <li><span>Type: </span>{location?.type}</li>
        <li><span>Dimension: </span>{location?.dimension}</li>
        <li><span>Population: </span>{location?.residents.length}</li>
       </ul>
    </article>
  )
}

export default LocationInfo