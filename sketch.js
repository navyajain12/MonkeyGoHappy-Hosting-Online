var play = 1;
var end = 0;
var gameState = play;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
monkey_running=loadAnimation("sprite_0.png",
"sprite_1.png","sprite_2.png","sprite_3.png",
"sprite_4.png","sprite_5.png","sprite_6.png", "sprite_7.png", "sprite_8.png")
                             
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(400,400);

  monkey = createSprite(50,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x = ground.width /2;
  
 ground.setCollider("rectangle",0,0,ground.width,ground.height);
  
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
 
}


function draw() {
   background("lightblue");
  if(gameState === "play"){ }
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space")&& monkey.y >= 270) {
        monkey.velocityY = -12;
    }
   
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground); 
  spawnFood();
  spawnObstacle()
 
  drawSprites();
  
   if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1); 
    }
  
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(150,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each banana to the group
   FoodGroup.add(banana);
  }
}

 function spawnObstacle() {
 if (frameCount % 300 === 0) {
    var obstacle = createSprite(600,327,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
   
    obstacleGroup.add(obstacle);
 }
   }