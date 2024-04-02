/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import Types from '../components/Types'

const Pokemon = (data = {url}) => {
  const [poke, setPoke] = useState({})
  useEffect(() => {
    const getPokemon = async () => {
      const response = await fetch(data.url)
      const resolve = await response.json()
      const info = {
        id: resolve.id,
        name: resolve.name,
        img: resolve.sprites.other.dream_world.front_default || resolve.sprites.other['official-artwork'].front_default || resolve.sprites.front_default,
        height: resolve.height,
        weight: resolve.weight,
        stats: resolve.stats,
        types: resolve.types
      }
      setPoke(info)
    }
    getPokemon()
  },[])
  return (
    <div className="flex justify-center items-center gap-6 border-r-2 border-b-2 border-gray-900 rounded-lg bg-gray-700 drop-shadow hover:scale-110 p-4">
      <div className="flex flex-col w-2/3">
        <h1 className="capitalize bg-green-800 text-gray-200 rounded-lg mt-2 px-2">{poke.name} #{poke.id}</h1>
        <img className="h-32 w-32 m-4" src={poke.img} alt={poke.name} />
        <span className="flex gap-2 justify-center items-center">
          {poke.types && poke.types.map((type, index) => (
            <img className="max-w-18 min-w-16 h-4" key={index} src={Types(type.type.name)}></img>
            ))
          }
        </span>
      </div>
      <div className="flex flex-col w-1/3 gap-2">
        <div>
        <p className="text-gray-200 text-sm">H: {poke.height/10} m</p>
        <p className="text-gray-200 text-sm">W: {poke.weight/10} kg</p>
        </div>
        <ul>
          {poke.stats && poke.stats.map((stat, index) => (
            <li key={index} className={colors(stat.stat.name) + " text-gray-200 text-sm rounded-md p-1 text-center"}>{stat.stat.name[0].toUpperCase() + stat.stat.name.slice(1)[0]}: {stat.base_stat}</li>
            )
            )}
        </ul>
      </div>
    </div>
  )
}

const colors = (nameStat) => {
  switch (nameStat) {
    case 'hp':
      return 'bg-red-500'
    case 'attack':
      return 'bg-orange-500'
    case 'defense':
      return 'bg-sky-500'
    case 'special-attack':
      return 'bg-blue-500'
    case 'special-defense':
      return 'bg-green-500'
    case 'speed':
      return 'bg-violet-500'
    default:
      return 'bg-gray-500'
  }
}

export default Pokemon