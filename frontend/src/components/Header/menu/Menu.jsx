import MenuButton from "./MenuButton.jsx";
import MenuItems from "./MenuItems.jsx";
import {useState} from "react";
export default function Menu(){
    const[isFocused,setIsFocused]=useState(false);
    function toggleFocus(){
        setIsFocused(!isFocused)
    }
    return(
        <div className="relative ml-3">
            <div>
                <MenuButton onFocused={toggleFocus}/>
            </div>
            <MenuItems focused={isFocused}/>
        </div>
    )
}