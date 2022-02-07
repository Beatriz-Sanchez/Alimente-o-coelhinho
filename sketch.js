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
var solo;
var fruta, corda;
var con_fruta;

function setup() {
  createCanvas(500, 700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  solo = new Solo(200, 680, 600, 20);

  var fruta_options = {
    density: 0.001
  };

  corda = new Corda(7, {x: 245,y: 30});
  fruta = Bodies.circle(300, 300, 20, fruta_options);
  Matter.Composite.add(corda.body, fruta);

  con_fruta = new Link(corda, fruta);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)

}

function draw() {
  background(51);
  corda.mostrar();
  ellipse(fruta.position.x, fruta.position.y, 30, 30);
  Engine.update(engine);
  solo.mostrar();



}