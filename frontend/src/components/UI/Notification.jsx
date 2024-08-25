export default function Notification({ type, message, onClose }) {
    const typeStyles = {
        success: "bg-green-600",
        error: "bg-red-600",
        info: "bg-blue-600",
    };

    return (
        <div className={`fixed top-32 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md ${typeStyles[type] || "bg-gray-600"}`}>
            <span>{message}</span>
            <button className="ml-16 text-white" onClick={onClose}>X</button>
        </div>
    );
}
