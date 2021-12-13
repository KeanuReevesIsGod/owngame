const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con,fruit_con_2,fruit_con_3;

var bg_img;
var food;
var rabbit;

var button;
var bunny;

var rope1, rope2;

function preload()
{
  bg_img = loadImage('images/background.png');
  food = loadImage('images/melon.png');
  rabbit = loadImage('images/Rabbit-01.png');
  blink = loadAnimation('images/blink_1.png','images/blink_2.png','images/blink_3.png')
  eat = loadAnimation('images/eat_0.png','images/eat_1.png','images/eat_2.png','images/eat_3.png','images/eat_4.png')
  sad = loadAnimation('images/sad_1.png','images/sad_2.png','images/sad_3.png')
  blink.playing = true;
  eat.playing = true;
  eat.looping = false;
  sad.playing = true;
  sad.looping = false;
}

function setup() 
{
  var isMobile=/iPhone |iPad |iPod |Andriod /i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth + 80,displayHeight); 
  }else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth ,windowHeight); 
  }
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('images/cut_btn.png');
  button.position(200,30);
  button.size(50,50);
  button.mouseClicked(drop);


  button1 = createImg('images/cut_btn.png');
  button1.position(350,35);
  button1.size(50,50);
  button1.mouseClicked(drop2);

  button2 = createImg('images/cut_btn.png');
  button2.position(360,200);
  button2.size(50,50);
  button2.mouseClicked(drop3);
  
  rope = new Rope(8,{x:220,y:30});
  rope1 = new Rope(7,{x:370,y:40});
  rope2 = new Rope(7,{x:400,y:225});


  ground = new Ground(200,canH,600,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;
  sad.frameDelay = 20;
  bunny = createSprite(100,canH-80,100,100);
  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad)
  bunny.changeAnimation('blinking')
  bunny.scale = 0.2;

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope1,fruit);
  fruit_con_3 = new Link(rope2,fruit);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope.show();
  rope1.show();
  rope2.show();
  Engine.update(engine);
  ground.show();
  if(collide(fruit,bunny)==true){
    bunny.changeAnimation('eating')
  }
  if(collide(fruit,ground.body)==true){
    bunny.changeAnimation('crying')
  }
  drawSprites();
   
}

function collide(body,sprite){
  if(body != null ){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(d<=80){
      World.remove(engine.world,fruit);
      fruit = null;
      return true;
    }
    else{
      return false
    }
  }
}
function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop2()
{
  rope1.break();
  fruit_con_2.detach();
  fruit_con_2 = null; 
}

function drop3()
{
  rope2.break();
  fruit_con_3.detach();
  fruit_con_3 = null; 
}