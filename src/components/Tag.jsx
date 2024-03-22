import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const Tag = () => {
    const [gif, setGif] = useState('');
    const [loading, setLoading] = useState('false');
const [tag,setTag] = useState('');

    async function fetchData() {
        setLoading(true);
        const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;

        const { data } = await axios.get(url);
        const imageSource = data.data.images.downsized_large.url;

        setGif(imageSource);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [])


    function clickHandler() {
        fetchData();
    }

    
    return (
        <div className="w-1/2 bg-blue-500 rounded-lg border border-black flex flex-col items-center gap-y-5 mt-[15px]">
            <h1 className="mt-[15px] text-2xl underline uppercase font-bold">Random {tag} Gif</h1>
            {
                loading ? (<Spinner />) : (<img src={gif} width="450" />)
            }

            <input
            className="w-10/12 text-lg py-2 rounded-lg mb-[3px] text-center"
             type="text"
             value={tag}
            onChange={((event) =>{
                setTag(event.target.value)
            }) }
            />
            <button onClick={clickHandler}
                className="w-10/12 bg-yellow-500 text-lg py-2 rounded-lg mb-[20px] hover:opacity-50 bg-yellow-300 transition-all"
            >
                Generate
            </button>
        </div>
    );
}

export default Tag;