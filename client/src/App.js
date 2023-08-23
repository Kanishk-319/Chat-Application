
import './App.css';
import io from 'socket.io-client'
import { useState } from 'react'
import Chat from './Components/Chat';


const socket = io.connect('http://localhost:3001')

function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [perm,setPerm] = useState(false)

  const joinRoom =()=>{
    if(username !== "" && room !== ""){
      socket.emit('join_room', room)
      setPerm(true)
    }
  }
  return (
    <div className='app_container'>
      <h3 className='heading'>Chat Application</h3>
    { perm == false ?(
      <div className='joinChat_body' >
        <input className='join_inputs' type="text" placeholder="Username" onChange={(event) => { setUsername(event.target.value) }} />
        <input className='join_inputs' type="text" placeholder="Room no." onChange={(event)=>{ setRoom(event.target.value) }} />
        <button onClick={joinRoom} type="button" className="btn btn-success join_button">Join Room</button>
      </div>
    ) :(
    <Chat socket={socket} username={username} room ={room}/>)
    }
    </div>
  );
}

export default App;
