import {useEffect, useRef} from "react";
import {createPortal} from "react-dom";

function Modal({children,onClose,classes}){
    const dialog=useRef();
    useEffect(() => {
        const modal=dialog.current;
        modal.showModal();
        return()=>{
            modal.close();
        }
    }, []);
    document.getElementById('modal')
    return createPortal(
        <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-[1]"> </div>

            <dialog
                className={`modal  fixed top-[5%] left-1/2 transform -translate-x-1/2  bg-[#e2e5eb] border-none rounded-md z-[2] shadow-md flex flex-col justify-between ${classes??undefined}`}
                ref={dialog }
                onClose= {onClose}
            >
                {children}
            </dialog>
        </div>,
        document.getElementById('modal')
    );
}
export  default Modal;