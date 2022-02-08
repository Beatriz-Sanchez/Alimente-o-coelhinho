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

function setup() {
  createCanvas(500, 700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  corda = new Corda(8, {
    x: 220,
    y: 30
  });
  solo = new Solo(200, 690, 600, 20);

  fruta = Bodies.circle(300, 300, 20);
  Matter.Composite.add(corda.body, fruta);

  fruta_con = new Link(corda, fruta);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
}

function draw() {
  background(51);

  ellipse(fruta.position.x, fruta.position.y, 20);

  corda.mostrar();

  Engine.update(engine);
  solo.mostrar();
}