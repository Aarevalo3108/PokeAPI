import {useState, useEffect} from 'react';
import Pokemon from './Pokemon';
import Heart from '../img/heart.svg';
import Search from '../img/search.svg';
import axios from 'axios';
import logo from '../img/logo.svg';


const App = () => {
  const urlAPI = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=";
  const [pokemons, setPokemons] = useState([]);
  const [pages, setPages] = useState(0);
  useEffect(() => {
    const getPokemones = async (url = urlAPI) => {
      const response = await fetch(`${url}${pages}`);
      const listaPoke = await response.json();
      setPokemons(listaPoke.results);
    }
    getPokemones(urlAPI)
  },[pages]);
  const [pokemonName, setPokemonName] = useState('');
  const[pokemonData, setPokemonData] = useState(null);
  const handleChange = (e) => {
    setPokemonName(e.target.value.toLowerCase())
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      setPokemonData(response.data);
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      setPokemonData(null);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 pt-0">
      <nav className="grid sm:grid-cols-3 items-center justify-items-center h-24 sticky z-10 top-0 text-2xl text-gray-200 font-mono w-full bg-gray-800 rounded p-2">
        <img src={logo} alt="logo"  className='w-32 h-20 hidden sm:flex'/>
        <form onSubmit={handleSubmit} className="flex flex-row gap-1 bg-white/80 rounded-md py-1 px-1">
          <button disabled={pokemonData == null ? true : false} className={(pokemonData ? 'text-red-500' : 'text-yellow-600') + " flex justify-center items-center px-2"} type='button' onClick={() => {setPokemonData(null); setPokemonName('')}}>
            <span className="text-2xl">
            {pokemonData ? '❌' : '🔵'}
            </span>
            <img className='hidden sm:flex' src={Search} alt="" />
          </button>
          <input placeholder='Pokebusqueda' type="text" className="focus:outline-none pl-4 text-xl text-black max-sm:w-60" value={pokemonName} onChange={handleChange}/>
          <button className='text-yellow-600' type='submit' disabled={pokemonName === '' ? true : false}><span>🔎</span></button>
        </form>
        <img src={Heart} alt="logo"  className='w-16 h-20 hidden sm:flex'/>
        <div className="sm:col-start-2 mt-16 sm:mt-0"> {pokemonData && (
          <Pokemon key={pokemonData.name ? pokemonData.name : '' } data={pokemonData } url={`https://pokeapi.co/api/v2/pokemon/${pokemonName}`}/>
        )}</div>
      </nav>
      <div className="flex flex-col gap-8 bg-transparent p-12 rounded-lg mx-12">
        <div className="flex justify-between w-full bg-gray-700 p-4 rounded-lg border-gray-900 border-r-2 border-b-2">
          <button className={"text-2xl text-gray-200 p-2 rounded-lg" + (pages < 1 ? ' bg-gray-800' : ' bg-green-800')} onClick={() => setPages(pages - 20)} disabled={pages < 1}>Atras</button>
          <button className={"text-2xl text-gray-200 p-2 bg-green-800 rounded-lg" + (pages > 1297 ? ' bg-gray-800' : ' bg-green-800')} onClick={() => setPages(pages + 20)} disabled={pages > 1297}>Siguiente</button>
        </div>
        <div className="grid justify-center items-center gap-6 text-gray-200 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pokemons.map((pokemon) => <Pokemon key={pokemon.name} url={pokemon.url}/>) }
        </div>
        <div className="flex w-full justify-between bg-gray-700 p-4 rounded-lg border-gray-900 border-r-2 border-b-2">
          <button className={"text-2xl text-gray-200 p-2 rounded-lg" + (pages < 1 ? ' bg-gray-800' : ' bg-green-800')} onClick={() => setPages(pages - 20)} disabled={pages < 1}>Atras</button>
          <button className={"text-2xl text-gray-200 p-2 rounded-lg" + (pages > 1297 ? ' bg-gray-800' : ' bg-green-800')} onClick={() => setPages(pages + 20)} disabled={pages > 1297}>Siguiente</button>
        </div>
      </div>
    </div>
  );
}

export default App;

/*<div>
        <h2>{pokemonData.name}</h2>
        <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        <p>Height: {pokemonData.height}</p>
        <p>Weight: {pokemonData.weight}</p>
        <p>Abilities:</p>
        <ul>
          {pokemonData.abilities.map((ability, index) => (
            <li key={index}>{ability.ability.name}</li>
          ))}
        </ul>
      </div>*/

