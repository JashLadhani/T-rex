var jumpsound , up1 , gos
var res , ri
var go , gi
var trexcollided
var play = 1 
var end = 0
var gamestate = play
var score
var cloudgroup , obstaclegroup
var o , o1 , o2 , o3 , o4 , o5 , o6
var cloud , cloudimage
var trex , trex_running;
var ground, groundimage;
var invisibleground 
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundimage = loadImage("ground2.png")
  cloudimage = loadImage("cloud.png")
  o1 = loadImage("obstacle1.png")
  o2 = loadImage("obstacle2.png")
  o3 = loadImage("obstacle3.png")
  o4 = loadImage("obstacle4.png")
  o5 = loadImage("obstacle5.png")
  o6 = loadImage("obstacle6.png")
  trexcollided = loadImage("trex_collided.png")
  go = loadImage("gameOver.png")
  ri = loadImage("restart button.png")
  jumpsound = loadSound("salamisound-6941726-sfx-jump-9-game-computer.mp3")
  gos = loadSound("mixkit-arcade-retro-game-over-213.wav")
  up1 = loadSound("smb_1-up.wav")
  
}

function setup(){
  createCanvas(600,200)
  
  res = createSprite(250 , 100 , 20 , 50)
  res.addImage(ri)
  res.scale = 0.1
  res.visible = false
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  ground = createSprite(200,180,400,10);
  ground.addImage(groundimage)
  trex.scale = 0.5
  invisibleground = createSprite(200,190,400,5)
  invisibleground.visible=false
  cloudgroup = createGroup()
  obstaclegroup = createGroup()
score = 0 
trex.setCollider("circle" , 0 , 0 , 40)
  trex.debug = false
  trex.addAnimation("collide",trexcollided)
  gi = createSprite(250 , 50 , 20 , 50)
  gi.scale = 0.5
  gi.addImage(go)
  gi.visible = false
}

function draw(){
  background("yellow")
  if (gamestate ==play){
    trex.velocityY = trex.velocityY+1
  if(keyDown("space") && trex.y > 120){
    trex.velocityY = -10
    jumpsound.play()
    
  }
    if(score>0 && score%100===0){
      up1.play()
      
    }
    ground.velocityX = -(4+3*score/100)
  if(ground.x < 0){
    ground.x = ground.width/2
    
  }
    clouds()
  obstacle()
     score = score+Math.round(getFrameRate()/60) 
    if(obstaclegroup.isTouching(trex)){
      
      gamestate = end
      gos.play()
    }
  }
  else if (gamestate==end){
    ground.velocityX = 0
    obstaclegroup.setVelocityXEach(0)
    cloudgroup.setVelocityXEach(0)
    obstaclegroup.setLifetimeEach(-1)
    cloudgroup.setLifetimeEach(-1)
    trex.changeAnimation("collide",trexcollided)
    gi.visible = true
    res.visible = true
  }
  console.log(trex.y)
  drawSprites();
  
  if (mousePressedOver(res)){
  reset()
}
  trex.collide(invisibleground)
  
  

  text ("your score : " + score , 450 ,  30)

}
function clouds(){
  if (frameCount%60===0){
  cloud = createSprite(600,50,20,20)
  cloud.velocityX = -(4+score/100)
    cloud.addImage(cloudimage)
  cloud.scale = random(0.5,1.2)
    cloud.y = Math.round(random(40,100))
    cloud.depth = trex.depth
    trex.depth = trex.depth+1
   cloud.lifetime = 200 
 cloudgroup.add(cloud)
  
  }
  
}
function obstacle (){
  if (frameCount%90===0){
   o = createSprite (600 ,170 ,20 ,20) 
    o.velocityX = -(5+score/100)
    var r = Math.round(random(1,6))
    switch (r){
      case 1 : o.addImage(o1);
        break;
      case 2 : o.addImage(o2);
        break;
      case 3 : o.addImage(o3);
        break;  
      case 4 : o.addImage(o4);
        break;   
      case 5 : o.addImage(o5);
        break;
      case 6 : o.addImage(o6);
        break;
        default:break;
    
    
    }
    trex.depth=o.depth
    trex.depth=trex.depth+1
    o.scale = 0.5
    o.lifetime = 160
  obstaclegroup.add(o)
  
  }

}
function reset(){
  gamestate=play
  gi.visible = false
  res.visible = false
  obstaclegroup.destroyEach()
  cloudgroup.destroyEach()
  score = 0
  trex.changeAnimation("running",trex_running)
}