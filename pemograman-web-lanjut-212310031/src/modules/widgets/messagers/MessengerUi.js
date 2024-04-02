import React, { useEffect, useRef, useState } from "react";
import { ButtonPrimary, ButtonSecondary } from "./components/ButtonUi";
import ChatBody from "./components/ChatBody";
import moment from "moment";

export default function MessagersUI() {

    const StylesMessager = {
        chatBox: {
            minHeight:"200px",
            maxHeight:"45vh",
            overflowY: "auto",
        }
    };
    const [writeChat, setWriteChat] = useState("");
    const [myChat, setMyChat] = useState([
        { id: 1, message: "Hi", from: "Febri", date: "2024-02-22 10:30:00" },
        { id: 2, message: "Iya", from: "Angga", date: "2024-02-22 10:35:00" },
        { id: 3, message: "Apakah itu Micro-Frontend ?", from: "Febri", date: "2024-02-22 10:50:00" },
        { id: 4, message: "Kaga tau", from: "Angga", date: "2024-02-22 10:52:00" },
        { id: 5, message: "Apaan dah", from: "Angga", date: "2024-02-22 10:52:00" },
        { id: 6, message: "Arsitektur pada bagian FrontEnd aplikasi yang berpusat pada independensi suatu fitur dengan fitur lainnya.", from: "Febri", date: "2024-02-22 11:00:00" },
        { id: 7, message: "Bijiiii", from: "Angga", date: "2024-02-22 12:12:00" }
    ]);
    const endOfMessagesRef = useRef(null);
    
    useEffect(() => {
        scrollToBottom();
    }, [myChat]);

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({ behavior:"smooth" });
    };

    const HandlerSendChat = (e) => {
        e.preventDefault();
        const objChat = {
            id: 99,
            message: writeChat,
            from: "Febri",
            date: moment().format('YYYY-MMM-DD HH:mm')
        }
        setMyChat([...myChat, objChat]);
        setWriteChat("");
    }

    // Mengurutkan pesan-pesan chat berdasarkan tanggal
    const sortedChat = myChat.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="card" style={{backgroundColor: "#009999", maxWidth: '1810px', margin: '0 auto', borderRadius: 20}}>
            <div className="card-header">
                <h3 className="card-title align-items-start flex-column">
                    <span className="fw-bold mb-2 text-gray-900">Chats</span>
                </h3>
                <div className="card-toolbar">
                    <ButtonSecondary items={{ title: "Create new chat", btn_class: "btn-icon btn-clear" }}>
                        <i className="bi bi-pencil-square"></i>
                    </ButtonSecondary>
                </div>
            </div>
            <div className="card-body p-0" style={{backgroundColor: "#ffff99"}}>
                <div className="chat-message px-2 bg-light-primary" style={{...StylesMessager.chatBox, backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
                    <ChatBody data={sortedChat}/>
                    <div ref={endOfMessagesRef}/>
                </div>
                <div className="chat-send bg-light p-3">
                    <form method="post" autoComplete="off" onSubmit= {(e)=> HandlerSendChat(e)}>
                        <div className="d-flex justify-content-between align-items-center">
                            <input type="text" className="form-control me-2" autoFocus={true} value={writeChat} onChange={(e) => setWriteChat(e.target.value)}/>
                            <ButtonPrimary items={{ title: "Send", btn_class: "btn-icon btn-success", type: "submit" }}>
                                <i className="bi bi-send"></i>
                            </ButtonPrimary>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}