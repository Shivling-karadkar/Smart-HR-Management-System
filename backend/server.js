const express=require("express");
const dotenv =require("dotenv");
const connectDB=require("./config/db");
const cors = require('cors');
const http=require('http');
const socketio=require('socket.io');


dotenv.config();
connectDB();

const app=express(); 
const server =http.createServer(app);
const io =socketio(server,{
    cors:{
        origin: process.env.FRONTEND_URL || '*'
    }
});

io.on('connection',(socket)=>{
    console.log(`socket connected`,socket.id);
    socket.on('disconnect',()=>console.log(`Socket disconnected`,socket.id));
});

app.use((req,res,next)=>{
    req.io=io;
    next();
})
app.use(cors({origin:process.env.FRONTEND_URL || '*'}));
app.use(express.json());
// In your backend server.js
app.use('/uploads', express.static('uploads'));

app.use('/auth',require('./routes/authRoutes'));

app.use('/candidates',require('./routes/candidateRoutes'));
app.use('/employee',require('./routes/employeeRoutes'));
app.use('/interviews',require('./routes/interviewRoutes'));
app.use('/leaves',require('./routes/leaveRoutes'));


const PORT= process.env.PORT || 5000
server.listen(PORT,()=>console.log(`server is running on ${PORT}`))