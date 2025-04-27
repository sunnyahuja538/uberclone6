import React, { createContext, useEffect, useState } from 'react'
import {io} from 'socket.io-client'
export const SocketContextData=createContext();
const socket=io(`${import.meta.env.VITE_BACKEND_URL}`)
const SocketContext = ({children}) => {
   
    //initialize client connection run only when component mount.
    useEffect(()=>{
        socket.on('connect',()=>{
            console.log('connected to server')
        })
        socket.on('disconnect',()=>{
            console.log('Disconnected')
        })
    },[])
    //message is an object
    function sendMessage(eventName,message)
    {console.log(`message send ${message} to ${eventName}`);
        socket.emit(eventName,message);
    }
    function recieveMessage(eventName,callback){
        socket.on(eventName,callback)
    }
  return (
    <SocketContextData.Provider value={{socket,sendMessage,recieveMessage}}>
        {children}
    </SocketContextData.Provider>
  )
}

export default SocketContext