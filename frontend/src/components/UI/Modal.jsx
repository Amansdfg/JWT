import {useEffect, useRef} from "react";
import {createPortal} from "react-dom";

function Modal({children,onClose}){
    const dialog=useRef();
    useEffect(() => {
        const modal=dialog.current;
        modal.showModal();
        return()=>{
            modal.close();
        }
    }, []);
    return createPortal(
    <dialog className="modal fixed top-[10vh] left-1/2 transform -translate-x-1/2 w-[30rem] max-h-[80vh] bg-[#e2e5eb] border-none rounded-[6px] z-[100] shadow-md flex flex-col justify-between p-8 animate-slide-down-fade-in backdrop:fixed backdrop:inset-0 backdrop:h-screen backdrop:w-screen backdrop:z-[00] " ref={dialog} onClose={onClose}>
        {children}
    </dialog>,
        document.getElementById('modal')
)
}