import { useRef } from "react"
import { UserService } from "../../service/userservice";
import { MessageService } from "../../service/messager-service";

const SendMessage = ({ receiver, onMessageSent }) => {
    const formRef = useRef(null)
    const send = (e) => {
        e.preventDefault();
        let form = formRef.current;
        let messageInfo = {
            senderId: UserService.getUser().id,
            receiverId: receiver.id,
            message: form["message"].value
        }
        MessageService.sendMessage(messageInfo).then(res => {
            alert("Message sent successfully!");
            if (typeof onMessageSent === "function")
                onMessageSent(messageInfo)
        })
    }

    return <>
        <div className="message-box">
            <form ref={formRef}>
                <label className="form-label">Message</label>
                <textarea name="message" className="form-control"></textarea>
                <div className="row action-buttons float-end">
                    <button onClick={(e) => send(e)} className="btn btn-primary">Send</button>
                </div>
            </form>
        </div>
    </>
}

export default SendMessage