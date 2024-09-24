import { Modal } from "react-bootstrap"
import SendMessage from "./send-message"
import { useEffect, useState } from "react"

const MessageDialog = ({ receiver, show, onClose, onShow, title }) => {
    const [showDialog, setShowDialog] = useState(show || false)
    useEffect(() => {
        setShowDialog(show);
    }, [show])
    useEffect(() => {
        if (showDialog) {
            if (typeof onShow === "function")
                onShow();
        }
    }, [showDialog])
    const handleClose = () => {
        setShowDialog(false)
        if (typeof onClose === "function")
            onClose()
    }
    const showMessageBox = (e) => {
        setShowDialog(true)
    }
    return <>
        <div onClick={(e) => showMessageBox(e)}>{title}</div>
        <Modal show={showDialog} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Sending message to: {receiver.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body><SendMessage onMessageSent={handleClose} receiver={receiver}></SendMessage>
            </Modal.Body>
        </Modal>
    </>
}

export default MessageDialog