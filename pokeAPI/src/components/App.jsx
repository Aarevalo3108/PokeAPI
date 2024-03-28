import {useState, useEffect} from 'react'
import Pokemon from './Pokemon'
import Pokedex from '../img/pokedex.svg'
const App = () => {
  const urlAPI = "https://pokeapi.co/api/v2/pokemon?limit=20&offset="
  const [pokemons, setPokemons] = useState([])
  const [pages, setPages] = useState(0)
  useEffect(() => {
    const getPokemones = async (url = urlAPI) => {
      const response = await fetch(`${url}${pages}`)
      const listaPoke = await response.json()
      setPokemons(listaPoke.results)
    }
    getPokemones(urlAPI)
  },[pages])
  return (
    <div className="flex flex-col justify-center items-center gap-8 p-8">
      <h1 className="text-3xl text-gray-200 flex gap-2 items-center justify-center">Pokedex<img src={Pokedex} alt="pokedex" /></h1>
      <nav className="flex gap-4 justify-center items-center">
        {pages > 1 && (
          <button className="text-2xl text-gray-200 p-2 bg-violet-500 rounded-lg" onClick={() => setPages(pages - 20)}>Previous</button>
        )}
        {pages < 1302 && (
          <button className="text-2xl text-gray-200 p-2 bg-violet-500 rounded-lg" onClick={() => setPages(pages + 20)}>Next</button>
        )}
      </nav>
      <div className="grid grid-cols-5 justify-center items-center gap-6 text-gray-200 min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {pokemons.map((pokemon) => <Pokemon key={pokemon.name} url={pokemon.url}/>) }
      </div>
    </div>
  )
}

export default App