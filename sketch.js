var backgroundimage; 
var marioback ; 
var mario , marioimage, mariojump; 
var invground , mrjm ; 
var ob , obb ; 
var gameState="play" ; 
var obGroup ; 
var lives= 3; 
var score= 0; 
var  mariofall ; 
var endob ; 

function preload() {
    marioback = loadImage("b2.png");
    marioimage = loadAnimation("mario1.png","mario2.png","mario3.png") ; 
    mrjm = loadAnimation("mariojump.png"); 
    ob = loadAnimation("ob1.png","ob2.png","ob3.png") ; 
    mariofall = loadAnimation("endstate.png"); 
     endob = loadAnimation("ob1.png"); 



}

function setup(){
createCanvas(1200,600);
backgroundimage = createSprite(0,0,600);
backgroundimage.addImage(marioback); 

backgroundimage.velocityX = -2 ; 
backgroundimage.x = backgroundimage.width/2 ; 
mario = createSprite(50,530,50,50);
mario.addAnimation("mario",marioimage);
mario.addAnimation("fall",mariofall);
mario.addAnimation("jump",mrjm);




mario.scale = 1
 ;
invground = createSprite(300,560,600,20);
invground.visible = false ; 
//mario.debug = true ; 

obGroup = new Group();

}

function draw(){
       background("black");
       if(gameState==="play"){
        score = score+Math.round(frameRate()/10) ; 
        if(backgroundimage.x<481){
            backgroundimage.x = backgroundimage.width/2 ; 
          }
          if(keyWentDown("SPACE")&&mario.y>500){
            mario.velocityY = -16  ;
            mario.changeAnimation("jump",mrjm);
             
         }
         else if(keyWentUp("SPACE")){
  
         mario.changeAnimation("mario",marioimage); 
          
         }
         mario.velocityY = mario.velocityY+0.8 ; 
       mario.collide(invground); 
       spawnOb();
       

if(obGroup.isTouching(mario)){

    lives= lives-1 ;
    gameState= "end";
   
}


       }
       else if(gameState==="end") {
       mario.velocityY= 0;
       obGroup.setVelocityXEach(0) ;
       mario.changeAnimation("fall",mariofall); 
       backgroundimage.velocityX = 0 ; 
       mario.y = 535 ;
       obGroup.setLifetimeEach(-1) ; 
       
      
    
    }
       console.log(mario.y);
       
       
       

       

       
       
       drawSprites(); 
       textSize(26); 
       fill("black")
       text("Lives =  "+lives,20,50) ;

       textSize(26); 
       fill("black")
       text("score =  "+score,1000,50) ;
}
function spawnOb(){
    if(frameCount%100===0){
     obb = createSprite(Math.round(random(300,1200)),530,50,50);
      
     obb.scale = 1.5 ; 
     obb.velocityX = - 6 
     obb.lifetime = 200;
     obGroup.add(obb) ; 
     obb.addAnimation("OBSTACLE",ob); 
    }


}



