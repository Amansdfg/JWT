import MenuItem from "./MenuItem.jsx";

import {setting} from "../../../util/list.js";
export default function MenuItems({focused}){
    console.log("sd")
    return(
        <div className={` ${focused?"block":"hidden"} absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in`}>
            {setting.map((item) => (
                <MenuItem key={item.name} item={item}/>
            ))}
        </div>
    )
}