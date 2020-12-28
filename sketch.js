var backdrop, backImage, ground;
var player, player_running;
var foodGroup, bananaimage;
var obstacleGroup, obstacleimage;
var score;
var gameState, PLAY, END;

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
  
  backdrop = createSprite(300,300,600,200);
  backdrop.addImage(backImage);
  backdrop.scale = 1.5;
 // backdrop.x = backdrop.width /2;
  backdrop.velocityX = -6;
  
  player = createSprite(200,140,5,5);
  player.addAnimation("running",player_running);
  player.scale= 0.08;
  player.velocityX = 4;

  
  ground = createSprite(600,590,1200,20);
  ground.velocityX = -6;
  //ground.x = ground.width/2;
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
  
if(gameState===PLAY)
{
  //resetting the groundback to the center
 if (backdrop.x < camera.position.x)
  {
     backdrop.x = camera.position.x+400;
  }
  //console.log(ground.x)
 // if (ground.x < 0)
 // {
    //console.log(ground.width)
    ground.x = camera.position.x;
 // }
  
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

    case 200: player.scale = 0.3;
              break;        
    
            default: break;
  }
  
  player.collide(ground);
  
  spawnFood();
  spawnObstacles();
}
 
if(obstacleGroup.isTouching(player))
  { gameState===END;
    player.scale = 0.08;
  }

  if(gameState===END && gameState!== PLAY)
  {
      ground.velocityX=0;
      backdrop.velocityX=0;
      text("YOU LOSE!",camera.position.x,300);    
      text("Your Score = "+score,camera.position.x,320);
      text("Press R to replay",camera.position.x,340);
  }

  if(keyDown('r'))
  {
    gameState===PLAY;
  }


  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,camera.position.x+100,50);
}

function spawnFood()
{
  if(frameCount%80===0)
  {
     var banana=createSprite(600,200,10,10);
     banana.x = camera.position.x+400;
     banana.y=Math.round(random(500,560));

     banana.addImage(bananaimage);
     banana.scale=0.05;

     banana.velocityX=-5;
     banana.lifetime=150;

     foodGroup.add(banana);
  }
}

function spawnObstacles()
{
  if(frameCount%300===0)
  {
    var obstacle=createSprite(600,550,40,10);
    obstacle.x = camera.position.x+400;
    obstacle.addImage(obstacleimage);
    obstacle.scale=0.15;

    obstacle.velocityX=-8;
    obstacle.lifetime=200;

    obstacleGroup.add(obstacle);
  }
}