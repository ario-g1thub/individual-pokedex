import { useState } from "react";
import Navbar from "./components/Navbar";
import PokeCard from "./components/PokeCards";
import axios from "axios";
import { useEffect } from "react";

const App = () => {

  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(" https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();

  const pokeFun = async () => {
    setLoading(true)
    const res = await axios.get(url);
    // console.log(res.data.results)
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results)
    setLoading(false)
    // console.log(pokeData)
  }
  const getPokemon=async(res)=>{
    res.map(async(item)=>{
        const result=await axios.get(item.url)
        console.log(result.data)
        setPokeData(state=>{
            state=[...state,result.data]
            return state;
        })
    })
  }

  useEffect(() => {
    pokeFun();
  }, [url])

  return (
    <>
      <div className="flex m-10">
        <Navbar />
      </div>

      <div className="flex">
        <PokeCard pokemon={pokeData} loading={loading} />
      </div>
    </>
  )
};
export default App;