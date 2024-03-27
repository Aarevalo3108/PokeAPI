import {useState, useEffect} from 'react'
import Pokemon from './Pokemon'
const App = () => {
  const urlAPI = "https://pokeapi.co/api/v2/pokemon"
  const [data, setData] = useState([]);
  const [pages, setPages] = useState(0);
  useEffect(() => {
    fetch(`${urlAPI}?limit=10&offset=${pages}`)
      .then((res) => res.json())
      .then((res) => setData(res))
  },[pages])
  if(!data || !data.results) return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl text-gray-200">Loading...</h1>
    </div>
  );
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <div className="flex gap-4 justify-center items-center">
        {pages > 1 && (
          <button className="text-2xl text-gray-200 p-2 bg-blue-500 rounded-full" onClick={() => setPages(pages - 10)}>Previous</button>
        )}
        {pages < 1302 && (
          <button className="text-2xl text-gray-200 p-2 bg-blue-500 rounded-full" onClick={() => setPages(pages + 10)}>Next</button>
        )}
      </div>
      <h1 className="text-3xl text-gray-200">Characters</h1>
      <div className="grid grid-cols-3 justify-center items-center gap-6">
      {data.results && <Pokemon url={data.results[0].url} key={data.results[0].name} /> }
      <img src="poke.sprites.other.dream_world.front_default" alt="" />
      </div>
    </div>
  )
}

export default App