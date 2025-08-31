import React, { useEffect, useState,useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import SearchMessage from "../Components/SearchMessage.jsx";
import {jwtDecode} from "jwt-decode";
import { useSelector } from "react-redux";
import { initSocket,getSocket } from "../utils/socket.js";


const Messages = () => {
  const currentuser = useSelector((state)=> state.user.user);
  const { id } = useParams();
  const location = useLocation();
  const user = location.state?.user;
  const [token,settoken] = useState(null);
  const username = currentuser?.username;
  const [chatuser,setchatuser] = useState(user || null);

  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);

  
   const socketRef = useRef(null);

   useEffect(() =>{
    if(user){
      setchatuser(user);
      return;
    }

    const fetchuser = async() =>{
      try{
        const res = await fetch(`/api/v1/users/${id}`,{
          method:"GET",
          credentials:"include",
        });

        if(!res.ok) return console.log("failed  to fetch user");
        const data = await res.json();
        console.log("bhai chl to ache se raha hai")
        setchatuser(data.data);
      }
      catch(err){
        console.log("Error Fetching user by id:",err);
      }
    };
    if(id) fetchuser();
   },[id,user]);



   useEffect(() => {
  if (!id || !chatuser) return;

  const s = getSocket();
  if (!s) return;

  // Purani history le aa
  s.emit("get-messages", { withUser: chatuser.username });

  // Listen for history
  s.on("messages-history", (msgs) => {
    const sorted = msgs.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
    setMessages(sorted);
  });

  // Listen for new messages
  s.on("receive-message", (msg) => {
    setMessages((prev) => [...prev, msg]);
  });

  return () => {
    s.off("messages-history");
    s.off("receive-message");
  };
}, [id, chatuser]);


  
useEffect(()=>{
   const storedtoken = localStorage.getItem("accesstoken");
   if(storedtoken){
    settoken(storedtoken);
    const decoded = jwtDecode(storedtoken);
    
   }
   else{
    console.log("No token found is localStorage!");
   }
},[])

useEffect(() =>{
  if(!token) return;
  

  const s = initSocket(token);   // ✅ ab ek hi baar initialize hoga
  socketRef.current = s;

  s.on("connect", () => {
    console.log("connected:", s.id);
  });

  // Cleanup listeners only (not disconnect)
  return () => {
    s.off("connect");
  };

  

},[token])


const handlesubmit = () => {
  if (!inputMessage.trim()) return;

  const s = getSocket();
  if (!s) return;

  s.emit("send-message", {
    to: chatuser?.username,
    message: inputMessage
  });

  // Local append (optimistic update)
  setMessages((prev) => [
    ...prev,
    {
      sender: username,
      receiver: chatuser?.username,
      message: inputMessage,
      timestamp: new Date(),
    }
  ]);

  setInputMessage("");
};



  return (
   <div className="w-screen bg-pink-600">
     <div 
      className={`flex h-screen  text-white    overflow-hidden 
        pl-[77px]
      `} 
    >
      {/* Left Chat List with SearchMessage */} 
       <div className="w-96 border-r  border-gray-800 p-4 bg-black flex-shrink-0">
        <h2 className="text-xl font-bold mb-4">Messages</h2>
        <SearchMessage />
      </div>

      {/* Right Chat Area */}
      <div className="flex-1  bg-black flex flex-col">
        {!id ? (
          <div className="flex-1 flex items-center w-full justify-center">
            <div className="text-center">
              <div className="text-5xl mb-4">💬</div>
              <p className="text-lg font-semibold">Your messages</p>
              <p className="text-gray-400">Send a message to start a chat.</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Send message
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col flex-1">
            {/* Header */}
            <div className="flex items-center border-b border-gray-800 p-4">
              <img
                src={chatuser?.avatar}
                alt={chatuser?.username}
                className="h-10 w-10 rounded-full mr-2"
              />
              <div>
                <p className="font-semibold">{chatuser?.username}</p>
                <p className="text-sm text-gray-400">{chatuser?.name}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
  {messages.map((msg, i) => (
    <div
      key={i}
      className={`flex ${
        msg.sender === username ? "justify-end" : "justify-start"
      } mb-2`}
    >
      <div
        className={`max-w-xs p-2 rounded-lg ${
          msg.sender === username
            ? "bg-blue-500 text-white"
            : "bg-gray-800 text-white"
        }`}
      >
        {msg.message}
      </div>
    </div>
  ))}
</div>


            {/* Input */}
            <div className="p-4 border-t border-gray-800 flex items-center">
              <input
               type="text"
               value={inputMessage}
               onChange={(e) => setInputMessage(e.target.value)}
               placeholder="Message..."
               className="flex-1 p-2 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none"
              />
              <button onClick={handlesubmit} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
   </div>
  );
};

export default Messages;
