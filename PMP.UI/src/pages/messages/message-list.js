import { useEffect, useState } from "react"
import { Accordion } from "react-bootstrap"
import Card from 'react-bootstrap/Card';
import { MessageService } from "../../service/messager-service"
import moment from 'moment'
import SendMessage from "../../components/messages/send-message";
import MessageDialog from "../../components/messages/message-dialog";
const MessageList = () => {
    const [messages, setmessages] = useState([])
    useEffect(() => {
        MessageService.getMyMessage().then(res => {
            setmessages(res);
        })
    }, [])
    return <div className="message-list">

        {messages.length > 0 ?
            <div>
                <h3 className="text-center mb-2 mt-2">My Messages</h3>
                <Accordion defaultActiveKey="0">
                    {messages.map((m, index) => {
                        return <Accordion.Item eventKey={index}>

                            <Card>
                                <Card.Header style={{ color: "#0D6EFD" }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
                                    </svg>
                                    &nbsp; Sender: {m.senderName}
                                    <MessageDialog title={"Reply"} receiver={{ id: m.senderId, name: m.senderName }}></MessageDialog>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>{m.message}</Card.Title>
                                    <Card.Text>
                                        {moment(m.createdDate).fromNow()}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Accordion.Item>
                    })}

                </Accordion>
            </div>

            : ""}

    </div>
}

export default MessageList