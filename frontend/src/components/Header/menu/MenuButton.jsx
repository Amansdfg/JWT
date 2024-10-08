import photo from "../../../assets/No-photo.gif";
export default function MenuButton({onFocused}){
    return(
        <button onFocus={onFocused}
                className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <img className="h-8 w-8 rounded-full" src={photo} alt="" />
        </button>
    )
}