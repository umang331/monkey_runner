
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
                                            
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  bananaimage = loadImage("banana.png")
  obs = loadImage("obstacle.png")
}



function setup() {
  createCanvas(400,400)
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkey running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  
  
}


function draw() {
  background(rgb(500,190,90))
  console.log(monkey.y)
  
  if(keyDown("space") && monkey.y >= 310) {
        monkey.velocityY = -16;
    
        
    }
   monkey.velocityY = monkey.velocityY + 0.8
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  monkey.collide(ground);
  
  if(foodGroup.isTouching(monkey)){
  
    foodGroup.destroyEach();
    score  += 1;
  }
  food();
  spawnObstacles();
  
 
  if(obstacleGroup.isTouching(monkey)){ 
    ground.velocityX = 0; 
    monkey.velocityY = 0; 
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1); 
    foodGroup.destroyEach(); 
  }
  
  
  
  stroke("white")
  textSize(20);
  fill("white");
  text("score: " + score,215,50);
  
  stroke("black");
  textSize(18);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("survival Time :" + survivalTime,11,50)
  
  drawSprites();
}

function food(){

  if(frameCount % 80 === 0){
    banana = createSprite(200,Math.round(random(120,200)),10,10);
    banana.addImage(bananaimage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 100;
    foodGroup.add(banana);
    
  }

}

function spawnObstacles(){

if (frameCount % 100 === 0){
   obstacle = createSprite(600,320,10,40);
   obstacle.addImage(obs)
   obstacle.velocityX = -4;
   obstacle.scale = 0.18;
   obstacle.lifetime = 300;
   obstacleGroup.add(obstacle);
}

}