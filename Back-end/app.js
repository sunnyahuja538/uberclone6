const express=require('express');
const app=express();
const connectDB=require('./db/db.js');
const userRoutes=require('./routes/user.routes.js');
const captainRoutes=require('./routes/captain.route.js');
const cors=require('cors');
const cookieParser=require('cookie-parser');//used to interact with cookies on the server
const { cookie } = require('express-validator');
const mapRoutes=require('./routes/maps.route.js');
const ridesRoutes=require('./routes/rides.routes.js');
connectDB();
app.use(cors({
    origin: '*' // Allow all origins
  }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.use('/maps',mapRoutes);
app.use('/rides',ridesRoutes);
module.exports=app;