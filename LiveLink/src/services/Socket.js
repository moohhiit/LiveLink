import { io } from "socket.io-client"


 function CreateSocket(uN){

   
    const socket = io('http://localhost:5001', {
        auth: {
            userName: uN
        }
    })
}


export default CreateSocket