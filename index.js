const app=require('express')();
const server=require('http').Server(app);
const io=require('socket.io')(server);

const port= 3000;


server.listen(port,()=>{
    console.log('server is listening on 3000');
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
});