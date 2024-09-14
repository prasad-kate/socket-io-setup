import { io } from "socket.io-client";

function Home() {
  const socket = io("http://localhost:8000", {
    withCredentials: true,
    transports: ["websocket", "polling"],
  });

  socket.on("connect", () => {
    console.log("Connected to server");
  });

  socket.on("message", (msg) => {
    console.log("Message from server:", msg);
  });

  const sendMessage = () => {
    socket.emit("message", "Hello from client!");
  };

  return (
    <div className="main-container">
      <p>Socket IO</p>
      <button className="emit-button" onClick={sendMessage}>
        Emit
      </button>
    </div>
  );
}

export default Home;
