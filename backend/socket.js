const { Server } = require('socket.io');

module.exports = function (server) {
  const io = new Server(server, {
    cors: {
      origin: "*",  // Allow all origins (adjust as needed)
      methods: ["GET", "POST"]
    }
  });

  const emailToSocket = new Map();

//   io.on("connection", (socket) => {
//     console.log("A user connected:", socket.id);
//     socket.on("join-room", (data) => {
//       // console.log(data);
//       const { roomId, emailId } = data;
//       console.log("User", emailId, "joined room", roomId , "with id", socket.id);
//       emailToSocket.set(emailId, socket.id);
//       socket.join(roomId);
//       socket.emit("joined-room",{roomId});
//       socket.broadcast.to(roomId).emit("user-joined", { emailId });
//     });


//     socket.on("me",(data)=>{
//       const {emailId} = data;
//       socket.emit("userId",emailToSocket.get(emailId));
//     })


//     socket.on("calling",(data)=>{
//       console.log(`incoming call from ${data.name} by user ${data.from} to user ${data.to} with id ${emailToSocket.get(data.to)}`)
//       const userSocket = emailToSocket.get(data.to);
//       io.to(userSocket).emit("called",{
//         signal:data.signalData,
//         from:data.from,
//         name:data.name,
//       })
//       // console.log(data);
//     })


//     socket.on("accept-call", (data) => {
//       // console.log(data);
//       const { signalData, to } = data;
//       const callerSocket = emailToSocket.get(to); // Retrieve caller’s socket ID
//       if (callerSocket) {
//          io.to(callerSocket).emit("call-accepted", { signal: signalData }); // Send signal back
//       }
//    });
   



//     socket.on("disconnect", () => {
//       console.log("A user disconnected:", socket.id);
//     });
//   });
//   console.log("Socket.IO server is running");
// };





io.on("connection", (socket) => {
  console.log("New user joined:", socket.id);

  socket.on("joined-room", (data) => {
    const { roomId, emailId } = data;
    console.log("User", emailId, "joined room:", roomId);
    emailToSocket.set(emailId, socket.id);
    socket.join(roomId);
    socket.emit("me", socket.id);
    socket.broadcast.to(roomId).emit("user-joined", { emailId, socketId: socket.id });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", (data) => {
    console.log(`Incoming call from ${data.from}`);
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });

  socket.on("answerCall", (data) => {
    console.log(`Answering call for ${data.to}`);
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

}
