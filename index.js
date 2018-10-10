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

app.get('/group1',(req,res)=>{
    res.sendFile(__dirname + '/public/group1.html');
});

app.get('/group2',(req,res)=>{
    res.sendFile(__dirname + '/public/group2.html');
});

app.get('/group3',(req,res)=>{
    res.sendFile(__dirname + '/public/group3.html');
});

const tech=io.of('/tech');

tech.on('connection',(socket)=>{
    socket.on('join',(data)=>{
      socket.join(data.room);
      tech.in(data.room).emit('message',`New User Joined ${data.room} root!`);
    });

    socket.on('message',(data)=>{
    tech.in(data.room).emit('message',data.msg);
    });

    io.on('disconnect',()=>{
        console.log('User Disconnected');
        tech.emit('message','User Disconnected');
    });

});

