import MenuButton from "./MenuButton.jsx";
import MenuItems from "./MenuItems.jsx";
import {useState} from "react";
export default function Menu({user}){
    const[isFocused,setIsFocused]=useState(false);
    return(
        <div className="relative ml-3">
            <div>
                <MenuButton onFocused={setIsFocused} user={user}/>
            </div>
            <MenuItems focused={isFocused}/>
        </div>
    )
}