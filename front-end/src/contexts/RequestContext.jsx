import { createContext, useState } from "react";

export const RequestContext = createContext(null);

export const RequestContextProvider = ({children}) => {
    const [message, setMessage] = useState({type: null, message: null});
    const [link, setLink] = useState(null);

    return (
        <RequestContext.Provider
            value={{
                message,
                setMessage,
                link,
                setLink
            }}
        >
            {children}
        </RequestContext.Provider>
    );
}
