class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    athelete1 = createSprite(100,200);
    athelete1.addImage("Runner1",athelete1_img);
    athelete2 = createSprite(300,200);
    athelete2.addImage("Runner2",athelete2_img);
    athelete3 = createSprite(500,200);
    athelete3.addImage("Runner3",athelete3_img);
    athelete4 = createSprite(700,200);
    athelete4.addImage("Runner4",athelete4_img);
    atheletes = [athelete1,athelete2,athelete3,athelete4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    
    player.getFinishedPlayers();

    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 300 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 250;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        atheletes[index-1].x = x;
        atheletes[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          atheletes[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = atheletes[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 5000){
      gameState = 2;
      player.rank+=1;
      Player.updateFinishedPlayers(player.rank);
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
