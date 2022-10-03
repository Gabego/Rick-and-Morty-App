
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import getRandomNumber from './utils/getRandomNumber'
import LocationInfo from './components/LocationInfo'
import CarResident from './components/CarResident'
import FilterList from './components/FilterList'
import ErrorScreen from './components/ErrorScreen'


function App() {

  //para guardar una locaition
  const [location, setLocation] = useState()
  //para guardar la informaicn del imput y hacer la pateicion cuando se hace submit
  const [searchInput, setSearchInput] = useState('')
  // para guardar las sugerencias de la API
  const [suggestedList, setSuggestedList] = useState()
  //para indicar si hay error o no
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    let id = getRandomNumber()

    if (searchInput) {
      id = searchInput
    }
    const URL = `https://rickandmortyapi.com/api/location/${id}`

    axios.get(URL)
      .then(res => {
        setHasError(false)
        setLocation(res.data)
      })
      .catch(err => setHasError(true))


  }, [searchInput])

  const handleSubmit = event => {
    event.preventDefault()
    setSearchInput(event.target.idLocation.value)
  }

  const handleChange = event => {
    if (event.target.value === '') {
      return setSuggestedList()
    } else {

      const URL = `https://rickandmortyapi.com/api/location?name=${event.target.value}`

      axios.get(URL)
        .then(res => setSuggestedList(res.data.results))
        .catch(err => console.log(err))

    }
  }

  return (
    <div className="App">

      <h1>Rick and Morty</h1>
      <form onSubmit={handleSubmit}>
        <input
          id='idLocation'
          placeholder='Enter number from 1 to 126'
          type="text"
          onChange={handleChange} />
        <button>Seacrh</button>
        <FilterList
          suggestedList={suggestedList}
          setSearchInput={setSearchInput} />

      </form>


      {hasError ?
        <ErrorScreen />
        :
        <>
          <LocationInfo location={location} />
          <div className='card-container'>
            {
              location?.residents.map(url => (
                <CarResident
                  key={url}
                  url={url}
                />
              ))

            }
          </div>
        </>

      }


    </div>
  )
}


export default App
