import {useState, useEffect} from 'react'
import Pokemon from './Pokemon'
import Pokedex from '../img/pokedex.svg'
import Heart from '../img/Pokemon.svg'
import Search from '../img/search.svg'
import axios from 'axios'

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
  
 
    const [pokemonName, setPokemonName] = useState('');
    const[pokemonData, setPokemonData] = useState(null)

    const handleChange = (e) => {
      setPokemonName(e.target.value.toLowerCase())
    }
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setPokemonData(null);
      }
}

  return (
<div className="flex flex-col justify-center items-center gap-8 p-8">
  <nav className="flex justify-center items-center sticky z-10 top-0 p-4 text-2xl text-gray-200 flex justify-between gap-2 items-center font-mono w-full h-20 bg-gray-800 rounded">
      <div className='flex flex-row items-center justify-center g-4 max-md:hidden '>
          <img src={Pokedex} alt="pokedex"  className='max-w-20'/> 
          <p>Pokedex</p>
      </div>
    <form onSubmit={handleSubmit} className="flex flex-row gap-1 bg-white/80 rounded-md py-1 px-1">
        <img src={Search} alt="" />
        <input placeholder='Pokebusqueda' type="text" className="bg-inherit focus:outline-none pl-1 text-2xl w-full text-black max-sm:w-60" value={pokemonName} onChange={handleChange}/>
        <button type='submit'>search</button>
    </form>
    <img src={Heart} alt="" />
  </nav>
      <div className="flex flex-col justify-center items-center gap-8 bg-slate-400 p-8 rounded-lg">
        <div className="flex w-full gap-4 justify-center items-center bg-gray-700 p-4 rounded-lg border-gray-900 border-r-2 border-b-2">
        {pages > 1 && (
          <button className="text-2xl text-gray-200 p-2 bg-green-800 rounded-lg" onClick={() => setPages(pages - 20)}>Previous</button>
        )}
        {pages < 1302 && (
          <button className="text-2xl text-gray-200 p-2 bg-green-800 rounded-lg" onClick={() => setPages(pages + 20)}>Next</button>
        )}
       </div>
        <div className="grid justify-center items-center gap-6 text-gray-200 min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {pokemons.map((pokemon) => <Pokemon key={pokemon.name} url={pokemon.url}/>) }
        </div>
        {pokemonData && (
      <Pokemon key={pokemonName} url={`https://pokeapi.co/api/v2/pokemon/${pokemonName}`}/>
      )}
      </div>
    </div>
  )
}

export default App
