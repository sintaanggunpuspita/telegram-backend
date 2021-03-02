require('dotenv').config()
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const router = require('./src/routes/index')
// const chatmessageModel = require('./src/models/chatmessage')
const app = express()
const server = http.createServer(app)
const socket = require('socket.io')
const moment = require('moment')
moment.locale('id')

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cors())
app.use(morgan('dev'))

const io = socket (server)

io.on('connection', socket => {
    console.log('user connect');
    socket.on('setupUserLogin', id => {
        console.log('user baru join adalah'  + id)
        socket.join ('user: '+id)

    }) 
    socket.on('sendMessage', (data, callback) => {
        // console.log(data)
        const datachatmessage=data
        datachatmessage.time = new Date()

        //send to receiver
        io.to('user: ' + data.receiverId).emit ('receiverMessage', data)

        //send to sender
        callback(data)

        //save to database
        chatmessageModel.insertchatmessage(data)
        .then((result)=> {
        
        })
        .catch(err=>{
            console.log(err)
        })
        // io.emit.to  (`user: ${data.id.toString() }`, data)
    })
    socket.on('disconnect', ()=> {
        console.log('disconnect with id '+ socket.id)
    })
})

// initial socket
// const io = socket(server, {cors:{origin: " * "}
// })

//untuk socket
// io.on("connection", (socket) => {
//     console.log('ada client yang connect'+socket.id); 

//     socket.on('initialidUser', (idUser)=> {
//         socket.join('user:'+idUser)
//         console.log('user : '+idUser);
//     })

//     socket.on('receiverId', (data, callback)=> {
//         console.log('data yang dikirim dari client ='+data);
//         callback(data.message)
//         // const data ={
//         //     receiverId:'',
//         //     senderId:'',
//         //     time:''
//         // }
//     })
//     // const formatchatMessage ={
//     //     chatmessage: data.chatmessage,
//     //     senderId: data.senderId,
//     //     time: moment(new Date().format('LT'))
//     // }
//     // socket.broadcast.to('room:'+data.room).emit('kirimkembali', data.formatchatMessagee)
//     // socket.emit('kirim kembali', data.formatchatMessage)

//     socket.on('receiverMessage',(data)=> {
//         console.log('data yang dikirim dari client = '+data);

//         io.to('rom:'+data.room).emit('kirimkembali', data.message)
//     })
//         socket.on("disconnect", (reason) => {
//             console.log('client disconnect')
//       });
//   });


// io.on('connection', socket => {
//     console.log('user connect');
//     socket.on('setupUserLogin', id =>{
//         console.log('user baru join adalah ' + id)
//         socket.join('user:'+id)
//     })
//     socket.on('sendMessage', (data, callback) =>{
//         const dataMessage = data
//         dataMessage.createdAt = new Date()


    //untuk socket
     
        // send to sender
        // callback(data)

        // save to database
        // messageModel.insertMessage(dataMessage)
        // .then((result)=>{
        
        //untuk socket
//         io.on("connection", (socket)=>{
//             console.log('ada client yang connect '+socket.id);
//         } 
//         socket.on('receiverMessage',(data)=> {
//             console.log('data yang dikirim dari client ='+data);
            
//             socket.emit('kirimkembali', data)
//         })
//         socket.on("disconnect", () => {
//             console.log('client terputus')
//     })
// })
//         // send to receiver
//         io.to('user:'+data.receiverId).emit('receiveMessage', data)

//         })
//         .catch(err=>{
//             console.log(err)
//         })
//     })
//     socket.on('disconnect', () =>{
//         console.log('disconnect with id '+ socket.id )
//     })
// })


app.use('/api/v1', router)
server.listen(PORT, ()=>{
    console.log(` Server in running port ${PORT}`);

})