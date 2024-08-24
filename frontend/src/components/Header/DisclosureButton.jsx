import {NavLink} from "react-router-dom";

export default function DisclosureButton({children,handle,...props}){
    return(
        <NavLink onClick={()=>handle()} {...props}>
            {children}
        </NavLink>
    )
}