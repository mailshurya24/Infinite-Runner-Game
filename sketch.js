var backdrop, backImage, ground;
var player, player_running;
var foodGroup, bananaimage;
var obstacleGroup, obstacleimage;
var score;

function preload()
{
  backImage = loadImage("jungle.jpg");   
  
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaimage = loadImage("banana.png");
  obstacleimage = loadImage("stone.png");
}

function setup() 
{
  createCanvas(600,600);
  
  backdrop = createSprite(0,0,600,200);
  backdrop.addImage(backImage);
  backdrop.scale = 1.5;
  backdrop.x = backdrop.width /2;
  backdrop.velocityX = -6;
  
  player = createSprite(300,140,5,5);
  player.addAnimation("running",player_running);
  player.scale= 0.08;
  player.velocityX = 4;

  
  ground = createSprite(600,590,600,20);
  ground.x = ground.width/2;
  ground.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
}

function draw() 
{
  background(220);

  camera.position.x = player.x
  camera.position.y = 300;
  
  //resetting the groundback to the center
  if (backdrop.x < 0)
  {
     backdrop.x = backdrop.width/2;
  }

  if (ground.x < 0)
  {
    ground.x = ground.width/2;
  }
  
  //make the monkey jump
  if(keyDown("space"))
  {
   player.velocityY = -12; 
  }
  
  //gravity
  player.velocityY = player.velocityY + 0.8;
 
  if(foodGroup.isTouching(player))
  {
    foodGroup.destroyEach();
    score = score + 2;
  }
  
  switch (score)
  {
    case 10: player.scale = 0.12;
            break;
            
    case 20: player.scale = 0.14;
            break;
            
    case 30: player.scale = 0.16;
            break;
            
    case 40: player.scale = 0.18;
            break;  
    
            default: break;
  }
  
  if(obstacleGroup.isTouching(player))
  {
    player.scale = 0.08;
  }
  
  player.collide(ground);
  
  spawnFood();
  spawnObstacles();
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,500,50);
}

function spawnFood()
{
  if(frameCount%80===0)
  {
     var banana=createSprite(600,200,10,10);
     banana.y=Math.round(random(80,120));

     banana.addImage(bananaimage);
     banana.scale=0.05;

  //   banana.velocityX=-5;
     banana.lifetime=80;

     foodGroup.add(banana);
  }
}

function spawnObstacles()
{
  if(frameCount%300===0)
  {
    var obstacle=createSprite(600,135,40,10);
    obstacle.addImage(obstacleimage);
    obstacle.scale=0.15;

  //  obstacle.velocityX=-8;
    obstacle.lifetime=200;

    obstacleGroup.add(obstacle);
  }
}