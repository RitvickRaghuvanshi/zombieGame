var player, playerImg, playerShootingImg;
var bgImg;
var zombie, zombieImg, zombieGroup;
var bullet, bulletGroup;
var score = 0;
var gameState = "play";
var life = 3;


function preload() {
  playerImg = loadAnimation("assets/shooter_1.png", "assets/shooter_2.png");
  bgImg = loadImage("assets/bg.jpeg");

  zombieImg = loadImage("assets/zombie.png");

  playerShootingImg = loadImage("assets/shooter_3.png");

  Heart_3 = loadAnimation("assets/heart_3.png");
  Heart_2 = loadAnimation("assets/heart_2.png");
  Heart_1 = loadAnimation("assets/heart_1.png");

}

function setup() {
  createCanvas(1300, 755);
  player = createSprite(200, 250, 20, 20);
  player.addAnimation("player", playerImg);
  player.addImage("shooter", playerShootingImg);
  player.scale = 0.4;

  zombieGroup = createGroup();
  bulletGroup = createGroup();

  hearts = createSprite(100, 40, 20, 20);
  
  //hearts.addAnimation("hearts", Heart_2);
  //hearts.addAnimation("hearts", Heart_1);
  hearts.addAnimation("hearts", Heart_3);

  hearts.scale = 0.3;
}

function draw() {
  background(bgImg);


  if (gameState == "play") {
    fill("red");
    textSize(35);
    text("Score: " + score, 1000, 50);
    console.log("play block");
    zombieHit();
    shooterMovement();
    spawnZombies();
    for (var i = 0; i < zombieGroup.length; i++) {

      if (zombieGroup.isTouching(player)) {
        zombieGroup.destroyEach();
        end();
      }
    }
    drawSprites();
  }
  else if (gameState == "end") {
    console.log("end block");
    fill("red");
    textSize(50);
    text("Game Over!", 500, 250);
  }

}

function shooterMovement() {

  if (keyIsDown(38)) {
    player.y = player.y - 5;
  }
  if (keyIsDown(40)) {
    player.y = player.y + 5;
  }
  if (keyIsDown(39)) {
    player.x = player.x + 5;
  }
  if (keyIsDown(37)) {
    player.x = player.x - 5;
  }
}

function spawnZombies() {
  if (frameCount % 100 === 0) {
    zombie = createSprite(1200, Math.round(random(0, 755)));
    //zombie.debug = true;
    zombie.setCollider("rectangle", 0, 0, 500, 1000)
    zombie.addImage("zombieImg", zombieImg);
    zombie.scale = 0.2;
    zombie.velocityX = -3;
    zombieGroup.add(zombie);
  }
}

function keyPressed() {
  if (keyIsDown(32)) {
    player.changeAnimation("shooter", playerShootingImg);
    bulletShot();
  }
}

function keyReleased() {
  player.changeAnimation("player", playerImg);
}

function bulletShot() {
  bullet = createSprite(player.x + 80, player.y - 33, 40, 5);
  //bullet.debug = true;
  bullet.shapeColor = "red";
  bullet.velocityX = 20;
  bulletGroup.add(bullet);
}

function zombieHit() {
  for (var i = 0; i < zombieGroup.length; i++) {
    //for (var j = 0; j < bulletGroup.length; j++) {
    if (zombieGroup.get(i).isTouching(bulletGroup)) {
      zombieGroup.get(i).remove();
      bulletGroup.destroyEach();
      score = score + 1;
    }
  }
  //}
}

function end() {
  console.log(life);
  if (life > 0) {
    life = life - 1;
   if(life == 2){
     hearts.changeAnimation("hearts", Heart_2);
   }
   else if(life == 1){
     hearts.changeAnimation ("hearts", Heart_1);
   }
  }
  else if(life == 0){
    gameState = "end";
  }
}
