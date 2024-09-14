import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function Home() {
  const socket = io("http://localhost:8000", {
    withCredentials: true,
    transports: ["websocket", "polling"],
  });

  const [messages, setMessage] = useState<string[]>([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("message", (msg) => {
      setMessage((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("message", "Hello from client!");
  };
  const clearMessage = () => {
    setMessage([]);
  };

  return (
    <div className="main-container">
      <p>Socket IO</p>
      <div className="button-container">
        <button className="emit-button" onClick={sendMessage}>
          Emit Message
        </button>
        <button className="emit-button" onClick={clearMessage}>
          Clear
        </button>
      </div>
      <ul>
        {messages?.map((msg, idx) => {
          return <li key={idx}>{msg}</li>;
        })}
      </ul>
    </div>
  );
}

export default Home;
