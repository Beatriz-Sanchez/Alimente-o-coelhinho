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
var corda, fruta, solo;
var fruta_con;

var fundo;
var frutaImg;
var coelhoImg;

var botao;
var coelho;

function preload() {
  fundo = loadImage('background.png');
  frutaImg = loadImage('melon.png');
  coelhoImg = loadImage('Rabbit-01.png');
}

function setup() {
  createCanvas(500, 700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  //btn 1
  botao = createImg('cut_btn.png');
  botao.position(200, 30);
  botao.size(50, 50);
  botao.mouseClicked(cair);


  corda = new Corda(8, {
    x: 220,
    y: 30
  });
  solo = new Solo(200, 690, 600, 20);
  coelho = createSprite(200, 620, 100, 100);
  coelho.addImage(coelhoImg);
  coelho.scale = 0.2;

  fruta = Bodies.circle(300, 300, 20);
  Matter.Composite.add(corda.body, fruta);

  fruta_con = new Link(corda, fruta);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  imageMode(CENTER);
}

function draw() {
  background(51);
  image(fundo, width / 2, height / 2, width, height);

  image(frutaImg, fruta.position.x, fruta.position.y, 70, 70);

  corda.mostrar();

  Engine.update(engine);
  solo.mostrar();
  drawSprites();

}

function cair() {
  corda.cortar();
  fruta_con.soltar();
  fruta_con = null;
}