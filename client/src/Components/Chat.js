import React, {useState, useEffect} from 'react'
import '../App.css'
import SendIcon from '@mui/icons-material/Send';

function Chat({socket, username, room}) {
    const [currentMessage,setCurrentMessage]= useState('')
   const [messageList,setMessageList]=useState([])
    const sendMessage = async ()=>{
        if(currentMessage!==""){
            const messageData ={
                room: room,
                author: username,
                message : currentMessage,
                time : new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            }
            setMessageList((list)=>[...list,messageData])
            await socket.emit('send_message', messageData)
        }
    }

    useEffect(()=>{
        socket.on('receive_message',(data)=>{
            setMessageList((list)=>[...list, data])
        })
    },[socket])
    return (
    <div className='chat_container'>
        <div className="chat-header">
            <p className='heading'>Live Chat</p>
        </div>
        <div className="chat_body" >
            {messageList.map((messageContent)=>{
                return (
                <div className='chat' id={messageContent.author == username?'user':'other'}>
                <h4>{messageContent.message}</h4>
                </div>
                )
            })}
        </div>
        <div className="chat-footer">
            <input className='chat_input' type="text" placeholder='Hey' onChange={(event)=>{setCurrentMessage(event.target.value)}} />
           <SendIcon onClick={sendMessage} className='send-icon'  style={{fontSize:'2rem', cursor:'pointer'}} />
        </div>
    </div>
  )
}

export default Chat