/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'

const Pokemon = (data = {url}) => {
  const [poke, setPoke] = useState({})
  useEffect(() => {
    const getPokemon = async () => {
      const response = await fetch(data.url)
      const resolve = await response.json()
      const info = {
        id: resolve.id,
        name: resolve.name,
        img: resolve.sprites.other.dream_world.front_default || resolve.sprites.other['official-artwork'].front_default || resolve.sprites.front_default
      }
      setPoke(info)
    }
    getPokemon()
  },[])
  return (
    <div className="flex flex-col justify-center items-center gap-4 border-r-2 border-b-2 border-gray-900 rounded-lg bg-gray-700 drop-shadow">
      <h1 className="capitalize bg-green-800 text-gray-200 rounded-lg mt-2 px-2">{poke.name} #{poke.id}</h1>
      <img className="h-32 w-32 m-4" src={poke.img} alt={poke.name} />
    </div>
  )
}
export default Pokemon