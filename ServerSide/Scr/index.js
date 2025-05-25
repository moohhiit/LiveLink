import express from "express"

const app = express()
PORT = 3001

app.use(express.json())

app.get('/' , (req, res)=>{
    console.log("Message Recive ")
})



app.listen(3001 , ()=>{

    console.log("The Server is running on Port 3001")

})