
import {useState,useRef} from "react";

export default function ImagePicker({ label, name }) {
    const [currentImage, setCurrentImage] = useState();
    const imageRef = useRef();

    function handlePickClick() {
        imageRef.current.click();
    }

    function imageChange(event) {
        const file = event.target.files[0];
        if (!file) {
            setCurrentImage(null);
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setCurrentImage(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }

    return (
        <div className="picker">
            <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
                {label}
            </label>
            <div className="flex items-start gap-6 mb-4">
                <div className="relative flex items-center justify-center w-40 h-40 border-2 border-gray-400 text-center text-gray-400">
                    {!currentImage && <p className="m-0 p-4">No image picked yet.</p>}
                    {currentImage && (
                        <img
                            src={currentImage}
                            alt="The image selected by user"
                            className="object-cover w-full h-full"
                        />
                    )}
                </div>
                <input
                    type="file"
                    id={name}
                    accept="image/png, image/jpeg"
                    name={name}
                    ref={imageRef}
                    className="hidden"
                    onChange={imageChange}
                    required
                />
                <button
                    type="button"
                    className="px-6 py-2 bg-gray-400 rounded-sm cursor-pointer text-inherit hover:bg-gray-500 focus:bg-gray-500"
                    onClick={handlePickClick}
                >
                    Pick an Image
                </button>
            </div>
        </div>
    );
}
