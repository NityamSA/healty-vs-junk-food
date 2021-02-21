
var PLAY=1;
var END=0;
var gameState=1;

var sword,fruit ,junkFood,healtyfoodGroup,junkfoodGroup, score,r,randomFruit;
var swordImage , fruit1, fruit2 ,fruit3,fruit4, junkfoodImage, goImage;

var knifeSwooshSound, Gameover2;


function preload(){
  
  swordImage = loadImage("sword.png");
  junkfoodImage = loadAnimation("FRIES.png","BURGER.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  goImage = loadImage("gameover.jpg")
  knifeSwooshSound = loadSound("knife souns.mp3")
  Gameover2 = loadSound("gao.mp3")
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   sword=createSprite(40,200,20,20);
   sword.addImage(swordImage);
   sword.scale=0.2
  
  
  //set collider for sword
  sword.setCollider("rectangle",50,50,500,500);
  sword.debug = false
  // Score variables and Groups
  score=0;
  healtyfoodGroup=createGroup();
  junkfoodGroup=createGroup();
  
}

function draw(){
  background("lightgreen");
  
  if(gameState===PLAY){
    
    //Call fruits and Enemy function
    healtyfood();
    junkfood();
    
    // Move sword with mouse
    sword.y=World.mouseY;
    sword.x=World.mouseX;
  
    // Increase score if sword touching fruit
    if(healtyfoodGroup.isTouching(sword)){
      
      knifeSwooshSound.play();
      healtyfoodGroup.destroyEach();
     score=score+2;
    }
    else
    {
      // Go to end state if sword touching enemy
      if(junkfoodGroup.isTouching(sword)){
        gameState=END;
        
        Gameover2.play();
        healtyfoodGroup.destroyEach();
        junkfoodGroup.destroyEach();
        healtyfoodGroup.setVelocityXEach(0);
        junkfoodGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        sword.addImage(goImage);
        sword.x=200;
        sword.y=200;
        sword.scale=0.5
        
        
      }
    }
  }
  
  drawSprites();
  
  //Display score
  text("Score : "+ score,300,30);
}


function junkfood(){
  if(World.frameCount%200===0){
    junkFood = createSprite(400,200,20,20);
    junkFood.addAnimation("moving", junkfoodImage);
    junkFood.y=Math.round(random(100,300));
    junkFood.velocityX=-(8+(score/10));
    junkFood.setLifetime=50;
    junkFood.scale=0.3
    
    junkfoodGroup.add(junkFood);
  }
}

function healtyfood(){
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    //increase the velocity of friut after score 4 or 10
    fruit.velocityX= -(7+(score/4));
    fruit.setLifetime=100;
    
    healtyfoodGroup.add(fruit);
  }
}