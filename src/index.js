// require('dotenv').config
// Load environment variables.
import dotenv from "dotenv"
import {app} from "./app.js"
import connectDB from "./db/db.js";

dotenv.config({
    path:'.env'
})


// Connect to the MongoDB database.
connectDB()

.then( ()=>{
    // If successful, start the web server.
    app.on("error" , (error) =>{
            console.log("err",error);
            throw error
 })
 // If there's an error, log it and terminate the process.
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`server is running at port: ${process.env.PORT}`);
     
    })

    
})


.catch((err)=>{
    console.log("MONGO db connection failed ", err);
    
})












// import express from "express"

// ;( async () => {
//     try{
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("error",(error) => {
//         console.log("ERROR",error);
//         throw  error
//        })

//        app.listen(process.env.PORT , () =>{
//         console.log(`App islistening on port ${proces.env.PORT}`);
//        })


//     }catch(error){
//         console.error("ERROR:",error)
//         throw err
//     }
// })()