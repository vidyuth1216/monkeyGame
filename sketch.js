var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var ground, invisibleGround;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(400, 200);


  monkey = createSprite(50, 160, 20, 50);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(200, 180, 900, 10);
  ground.x = ground.width / 2;

  invisibleGround = createSprite(200, 190, 400, 10);
  invisibleGround.visible = false;

  bananaGroup = createGroup();
  obstacleGroup = createGroup();

  var survivalTime = 0
}


function draw() {
  background("white");

  if (gameState === PLAY) {

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }


    if (keyDown("space") && monkey.y >= 100) {
      monkey.y = 50;
      monkey.velocityY = -4;
    }

    stroke("black");
    textSize(20);
    fill("black");
    survivalTime = Math.ceil(frameCount / frameRate());
    
    monkey.velocityY = monkey.velocityY + 0.8;


    if (bananaGroup.isTouching(monkey)) {
      bananaGroup[0].destroy();
    }

    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
    }
  }
 else if(gameState === END){
    
      ground.velocityX = 0;
      monkey.velocityY = 0
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
  }




  spawnBanana();
  spawnObstacle();

  monkey.collide(invisibleGround);

  drawSprites();
  
    stroke("white");
    textSize(20);
    fill("white");
    text("score :" + score + 500, 50);

    stroke("black");
    textSize(20);
    fill("black");
    text("survivalTime :" + survivalTime, 100, 50);

}



function spawnBanana() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(450, 120, 40, 10);
    banana.y = Math.round(random(80, 120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;

    banana.lifetime = 200;

    bananaGroup.add(banana);
  }
}

function spawnObstacle() {
  if (frameCount % 80 === 0) {
    var obstacle = createSprite(450, 165, 40, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.07;
    obstacle.velocityX = -3;

    obstacle.lifetime = 200;

    obstacleGroup.add(obstacle);
  }
}