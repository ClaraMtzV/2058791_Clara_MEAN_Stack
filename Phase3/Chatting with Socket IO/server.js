let msgsArray = [
    "Hello, client how have you been doing today?", 
    "I am happy to assist you today!",
    "Are you feeling well today?",
    "Do you like going on trips?",
    "I love going to the movie theatre.",
    "I don't like waking up early. Do you?",
    "A song is a poem with music.",
    "I hope robots never take over the world!",
    "I hope you had a good day today!",
    "God bless you!"
]

//let random_num = Math.floor(Math.random()*9) ;
let counter = 0;
let express = require("express");

let app = express();
let http = require("http").Server(app);

let io = require('socket.io')(http);

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "\\index.html");
})


io.on("connection",(socket)=>{
    counter ++;
    console.log("Client connected");
    socket.on("client_msg",(msg)=>{
        console.log(msg);
        let random_num = Math.floor(Math.random()*9) ;
        io.emit("server_msg","SERVER SAYS: "+ msgsArray[random_num])
    })
})


// io.on("connection",(socket)=>{
//     console.log("Client connected");
//     socket.on("obj",(msg)=>{
//         console.log(msg);
//     })
    
//     let random_num = Math.floor(Math.random()*9) ;
//     socket.emit("obj1","SERVER SAYS: "+ msgsArray[random_num])
// })

http.listen(9090,()=>console.log("Server running on port number 9090"));
