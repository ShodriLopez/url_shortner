import { useContext } from "react";
import { RequestContext } from "../contexts/RequestContext";
import SvgIcon from "./SvgIcon";

const LinkViewer = () => {
    const { link } = useContext(RequestContext);

    return (
        <div className={`flex justify-center text-center ${link ? 'visible' : 'invisible'}`}>
            <button className="w-8 bg-gray-50 rounded-l-lg">
                <SvgIcon type='share' width="5" height="5"/>
            </button>
            <a href=""
            className="w-full text-xs lg:text-base bg-gray-50">
                {'Use it shortened '+link}
            </a>
            <button className="w-8 bg-gray-50 rounded-r-lg">
                <SvgIcon type='copy'  width="5" height="5"/>
            </button>
        </div>
    )
}

export default LinkViewer