import style from "./Modal.module.css"
import { useEffect } from "react"

const Modal = ({ handleCloseModal, modalImage }) => {
    useEffect(() => {
        const closeEscModal = (e) => {
            if (e.key === "Escape") {
                handleCloseModal(e)
            }
        }
        window.addEventListener("keydown", closeEscModal)
        return () => window.removeEventListener("keydown", closeEscModal)
    })

    return (
        <div className={style.overlay} onClick={handleCloseModal}>
            <div className={style.modal}>
                <img src={modalImage} alt="" />
            </div>
        </div>
    )
}

export default Modal
