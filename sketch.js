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
var rope, fruit, ground;
var fruit_con;

var bg_img;
var food;
var rabbit;

var button;
var bunny;
var blink, eat;

function preload() {
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");

  blink.playing = true;
  eat.playing = true;
  eat.looping = false;
}

function setup() {
  createCanvas(500, 700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  button = createImg('cut_btn.png');
  button.position(200, 30);
  button.size(50, 50);
  button.mouseClicked(drop);

  rope = new Rope(8, {
    x: 220,
    y: 30
  });
  ground = new Ground(200, 690, 600, 20);

  bunny = createSprite(200, 620, 100, 100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny.addAnimation('blinking', blink);
  bunny.addAnimation('eating', eat);
  
  bunny.changeAnimation('blinking');

  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);

  fruit_con = new Link(rope, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  imageMode(CENTER);
}

function draw() {
  background(51);
  image(bg_img, width / 2, height / 2, width, height);

  image(food, fruit.position.x, fruit.position.y, 70, 70);

  rope.show();

  Engine.update(engine);
  ground.show();
  drawSprites();
}

function drop() {
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}