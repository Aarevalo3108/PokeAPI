import { useState, useEffect } from 'react'

const Pokemon = async (url) => {
  const [poke, setPoke] = useState({})
  useEffect(() => {
    getPokemon(url).then((res) => {
      setPoke(res)
    })
  },[url])
  return (
  <div className="flex flex-col justify-center items-center gap-2" key={poke.id}>
    <h2 className="text-2xl text-gray-200">{poke.name}</h2>
    <img className="rounded-2xl" alt={poke.name} />
  </div>
  )
}

const getPokemon = async (url) => {
  const poke = await fetch(url);
  const dataPoke = await poke.json();
  return dataPoke
}

export default Pokemon