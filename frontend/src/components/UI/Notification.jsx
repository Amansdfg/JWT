export default function Notification({type,message,onClose}){
    return(
        <div className="fixed top-32 bg-red-600 left-1/2 transform -translate-x-1/2">
            <span>{message}</span>
            <button onClick={onClose}>X</button>
        </div>
    )
}