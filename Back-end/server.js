const dotenv= require('dotenv');
dotenv.config();
const http=require('http');
const app=require("./app.js");
const PORT=process.env.PORT||3000;
// Create an HTTP server that uses the Express app to handle requests
const server=http.createServer(app);


server.listen(PORT,()=>{
    console.log('server is running');
});