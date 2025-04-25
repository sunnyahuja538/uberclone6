const socketIo=require('socket.io')
const userModel=require('./models/user-model')
const captainModel=require('./models/captain.model')
let io;
function initializeSocket(server){
    io=socketIo(server,{
        cors:{
            origin:'*',
            methods:['GET','POST']
        }
    });
    io.on('connection',(socket)=>{
        console.log(`Client connected:${socket.id}`)
//         ✅ Purpose of join:
// This allows the client (user or captain) to:

// Introduce themselves to the server after connection.

// Send their user ID and type (user or captain).

// The server then:

// Stores the current socket.id in the database.
        socket.on('join',async (data)=>{
            const {userId,userType}=data;
            console.log(`User ${userId} joined as ${userType}`)
            if(userType==='user')
            {
                await userModel.findByIdAndUpdate(userId,{
                    socketId:socket.id
                })
            }
            else{
                await captainModel.findByIdAndUpdate(userId,{
                    socketId:socket.id
                })
            }
        })
        socket.on("update-location-captain",async(data)=>{
            const {userId,location}=data;
            if( !location||!location.ltd||!location.lng){
                return socket.emit('error',{
                    message:'Invalid location data'
                })
            }
            
            
            
                await captainModel.findByIdAndUpdate(userId,{
                    location:{
                        ltd:location.ltd,
                        lng:location.lng
                    }
                })
            
        })
        socket.on('disconnect',()=>{
            console.log(`Client disconnected:${socket.id}`)
        });
    });
}
function sendMessageToSocketId(socketId,message){
    if(io){
        console.log('inside socket')
        io.to(socketId).emit(message.event,message.data);
    }
    else{
       console.log('Socketio is not initialize') 
    }
}
module.exports={initializeSocket,sendMessageToSocketId}
// useEffect runs once (if dependency array is []).

// But inside that, any event listeners you attach to the socket are active for the lifetime of the socket.

// They don’t require useEffect to rerun — the socket handles them under the hood.