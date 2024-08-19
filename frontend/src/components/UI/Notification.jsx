export default function Notification({type,message,onClose}){
    return(
        <div className="fixed top-32 bg-red-600 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md">
            <span>{message}</span>
            <button className="ml-16" onClick={onClose}>X</button>
        </div>
    )
}