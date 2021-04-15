
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0
var ground; 
var END = 0 
var gameState = PLAY;
var PLAY = 1
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
monkey = createSprite(100,340,100,100);
  monkey.addAnimation("monkey" , monkey_running);
  monkey.scale = 0.15
  

ground = createSprite(100,390,600,10) ;
  ground.velocityX = -3;
  
  obstacleGroup = createGroup()
FoodGroup = createGroup();

}


function draw() {
background(600,600)
 if (ground.x < 100){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space") && monkey.y>=100 ){
    monkey.velocityY = -6;
    
}
  monkey.velocityY = monkey.velocityY + 0.1
  
  if(monkey.isTouching(FoodGroup)){
    score = score+1
    FoodGroup.destroyEach()
  }
  
  
  if(monkey.isTouching(obstacleGroup)){
    monkey.destroy();
    
    
    obstacleGroup.destroyEach();  
    gameState = END;    
  }
  
  if(gameState === PLAY){
    ground.velocityX = -4
    banana.velocityX = -15;
    
     
 
  }
  
  if(gameState === END){
   obstacleGroup.setLifetimeEach(0);
      FoodGroup.setLifetimeEach(0);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0)
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    obstacleGroup.visible = false;
    FoodGroup.visible = false;
    textSize(30)
    text("GAME OVER" , 100,200)
    score = 0
  }
  textSize(30)
  text("SCORE :"+score,200,40)
  
  console.log(monkey.y )
  
  createobstacle();
  createBananas();   
  monkey.collide(ground)
 drawSprites(); 
}



function createBananas(){
if(World.frameCount%80 === 0){
  banana = createSprite(200,Math.round(random*(120,200)),10,10)
  banana.addImage(bananaImage)
  banana.scale = 0.1
  banana.lifetime = 55
  banana.y = Math.round(random(120,200))
  banana.x= Math.round(random(180,200))
  banana.velocityX = -4
  FoodGroup.add(banana)
  //banana.debug = true
  //banana.setCollider("rectangle",23,33)
}
}

function createobstacle(){
if(World.frameCount%80 === 0){
  

  obstacle = createSprite(200,380);      
  obstacle.addImage( obstaceImage )
  obstacle.scale = 0.1
  obstacle.velocityX = -4
  obstacle.lifetime = 55
  obstacleGroup.add(obstacle)
}
}




