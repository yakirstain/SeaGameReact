const app = require('express')();
const http = require('http').Server(app);
var io = require('socket.io')(http);
const port = 3001;


let players = {};
let updated_players = {};
const _EAT_DISTANCE = 50;
const _PLY_SIZE_X = 50; 
const _PLY_SIZE_Y = 50 ; 
const _SMOOTHING = 50;

io.on('connection', function(socket){


  socket.on('disconnect', function(){

     delete players[socket.id]; 
     delete updated_players[socket.id];
 
   });

  socket.on('p.pos', function(msg){ 
    
    let data = JSON.parse(msg);

    players[socket.id]={
      id: socket.id,
      Eating:data.Eating,
      x: data.x,
      y: data.y
    }

    let add = true;
    for(let key in updated_players){
      if(key == socket.id){
        add = false;
      }
    }
    if(add){
      updated_players[socket.id]={
        id: socket.id,
        x: data.x,
        y: data.y,
        name: data.userName,
        avatar: data.avatar,
      }
    
    }
    
  });

  socket.on('p.eat', function(msg){ 
    
    let data = JSON.parse(msg);
    if(updated_players[socket.id]){
      updated_players[socket.id].Eating = data.Eating;
    }
  });



  socket.on('p.leave', function(){ 

    delete players[socket.id]; 
    delete updated_players[socket.id];
  });


});

setInterval( ()=> {
  if (Object.keys(updated_players).length >= 2)
  {
    for(let i in updated_players){
      
      for(let j in updated_players){
        if(i == j)
          continue;
        
          Eat(i , j);
          
      }

    }
    
  }
  if(Object.keys(updated_players).length>0){ 

    io.emit('p.pos' , JSON.stringify( Object.values(updated_players) ));

    
  }
} , 45)

  
setInterval( ()=>{
  for(let i in players){
     
          //get distance by 2 points formula distance
          let distance = Math.sqrt( Math.pow( updated_players[i].x  - players[i].x , 2)  + Math.pow(updated_players[i].y - players[i].y , 2) ) / _SMOOTHING;
          //get angle between 2 points (mouse position and player position)
          let angle = Math.atan2(updated_players[i].y - players[i].y, updated_players[i].x - players[i].x);
          //set the new position to the position we heading at

          updated_players[i].x = updated_players[i].x -  Math.cos(angle) *distance;
          updated_players[i].y = updated_players[i].y -  Math.sin(angle) *distance;
          updated_players[i].angle = angle;
          
           
  }

 } , 32);


function Distance  (player1,player2){
  let distance = Math.sqrt( Math.pow( player1.x  - player2.x , 2)  + Math.pow(player1.y - player2.y , 2) )
  return distance
}

function Eat(Eater,Eaten) {
  let d=Distance(updated_players[Eater], updated_players[Eaten])
  
  
  if(players[Eater].Eating === true&& players[Eaten].Eating === false)
  {
    
    if (d < _EAT_DISTANCE)
    {
      io.emit('p.dead' , Eaten);
      io.to(Eater).emit('p.score' , Eaten);
      delete  updated_players[Eaten];
      delete players[Eaten];
    }
  }
}




http.listen(port, function(){
  //console.log('listening on *:'+port);
})