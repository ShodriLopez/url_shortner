import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import LinkViewer from "./LinkViewer";
import { RequestContext } from "../contexts/RequestContext.jsx";

const baseUrl = process.env.HOST || 'http://localhost:8000/api/'; //obtener del .env

const Searcher = ({ handleModal, children }) => {
    
    const [input, setInput] = useState()
    const [loading, setLoading] = useState(false)
    const {setMessage, setLink} = useContext(RequestContext)
    const [disabled, setDisabled] = useState();

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const validURL = (string) => {
        const pattern = new RegExp(
            /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%\/.\w-]*)?\??(?:[-+=&;%@.\w]*)#?\w*)?)/gm
        );

        return !!pattern.test(string);
    }

    const getShortenedLink = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formatStr = {
            "url": input.toString().toLowerCase().trim()
        };
    
        await axios.post(baseUrl+'shorten', formatStr)
        .then(res => {
            setLoading(false);
            setLink(baseUrl+res.data.shortUrl);
            setMessage({type: res.data.type, message: res.data.message});
        })
        .catch(err => {
          console.log(err);
          setMessage({type: 'error', message: "ERROR! could not connect to server"});
        })
      }

    useEffect(() => {
        validURL(input) 
            ? setDisabled(false) 
            : setDisabled(true)
      },[input])

    return (
        <div className="w-3/5">
            <form action="#" method="POST"
            onSubmit={(e) => getShortenedLink(e)}>
                <label className="block mb-2 font-bebasNeue text-6xl text-center sm:text-left font-medium text-gray-900 dark:text-white">{children}</label>
                <input type="text" id="link-text" onChange={handleChange}
                className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="https://www.long_link.com/search?q=long+link&sca_esv=600sxsrf=ACVn0-VFDypE1u-s9gbpRow%3A1706=gws-wiz-serp"/>
                <button disabled={disabled}
                className={`flex ${disabled ? 'opacity-40 bg-gray-500' : 'bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50'} justify-center text-gray-900 w-full hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2`} type="submit" >
                    { loading 
                    ? (
                        <svg className="w-6 h-5 text-gray-200 animate-spin fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    ) 
                    : 'Shorten it!'
                    }
                </button>  
            </form>
            <LinkViewer handleModal={handleModal}></LinkViewer>
        </div>
    )
}

export default Searcher