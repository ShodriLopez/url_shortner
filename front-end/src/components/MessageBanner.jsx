import SvgIcon from "./SvgIcon"
import { useContext } from "react"
import { RequestContext } from "../contexts/RequestContext"

const MessageBanner = () => {
    const { message } = useContext(RequestContext)

    return (
        <div className={`flex flex-row items-center rounded-b-lg bg-gradient-to-r 
        ${message.message ? 'visible opacity-100' : 'invisible opacity-0'}
        ${message.type !== 'success'
        ? 'from-red-200 via-red-400 to-red-500 shadow-lg shadow-red-500/50'
        : 'from-lime-200 via-lime-400 to-lime-500 shadow-lg shadow-lime-500/50'}
        `}>
            <SvgIcon type={message.type}></SvgIcon>
            <p>{message.message}</p>
        </div>
    )
}

export default MessageBanner