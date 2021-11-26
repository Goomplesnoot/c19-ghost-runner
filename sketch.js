var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup=new Group()
  climbersGroup= createGroup()
  invisibleBlockGroup = new Group()
  ghost=createSprite(200,200,50,50)
  ghost.addImage(ghostImg)
  ghost.scale=0.3
}

function draw() {
  background(200);
  if(gameState==="play"){
    if(tower.y > 400){
      tower.y = 300
    }
    if(keyDown("space")){
      ghost.velocityY=-5
    }
    ghost.velocityY=ghost.velocityY + 0.5
    if(keyDown("RIGHT_ARROW")){
      ghost.x += 3
    }
    if(keyDown("LEFT_ARROW")){
      ghost.x -= 3
    }
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy()
      gameState="end"
    }
    spawnDoors()
  }

  drawSprites()
  if(gameState ==="end"){
    background(0,0,0)
    stroke("yellow")
    fill("yellow")
    textSize(30)
    text("GAME OVER",230,250)
    
  }
}
function spawnDoors(){
  if(frameCount % 240 === 0){
    door=createSprite(200,-50)
    door.addImage(doorImg)
    climber=createSprite(200,10)
    climber.addImage(climberImg)
    door.x=Math.round(random(120,400))
    climber.x=door.x
    climber.velocityY=1.5
    climber.lifetime=600
    door.velocityY=1.5
    door.lifetime=600
    ghost.depth=door.depth
    ghost.depth += 1
    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlock=createSprite(200,15)
    invisibleBlock.width=climber.width
    invisibleBlock.height=2
    invisibleBlock.x=door.x
    invisibleBlock.velocityY=1.5
    invisibleBlock.lifetime=600
    invisibleBlock.visible=false
    invisibleBlockGroup.add(invisibleBlock)
  }
}

