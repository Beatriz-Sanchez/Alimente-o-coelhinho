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
var comida_img;
var coelho_img;

var botao;
var coelho;
var piscar, comer, triste;

var musica, som_cortar, som_triste, som_mastigar, som_ar;

function preload() {
  fundo = loadImage('background.png');
  comida_img = loadImage('melon.png');
  coelho_img = loadImage('Rabbit-01.png');

  musica = loadSound('sound1.mp3');
  som_triste = loadSound("sad.wav")
  som_cortar = loadSound('rope_cut.mp3');
  som_mastigar = loadSound('eating_sound.mp3');
  som_ar = loadSound('air.wav');

  piscar = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  comer = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  triste = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");

  piscar.playing = true;
  comer.playing = true;
  triste.playing = true;
  triste.looping = false;
  comer.looping = false;
}

function setup() {
  createCanvas(500, 700);

  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  botao = createImg('cut_btn.png');
  botao.position(220, 30);
  botao.size(50, 50);
  botao.mouseClicked(cair);

  corda = new Corda(7, {x: 245,y: 30});
  solo = new Solo(200, 690, 600, 20);

  piscar.frameDelay = 20;
  comer.frameDelay = 20;

  coelho = createSprite(420, 620, 100, 100);
  coelho.scale = 0.2;

  coelho.addAnimation('piscando', piscar);
  coelho.addAnimation('comendo', comer);
  coelho.addAnimation('chorando', triste);
  coelho.changeAnimation('piscando');

  fruta = Bodies.circle(300, 300, 20);
  Matter.Composite.add(corda.body, fruta);

  fruta_con = new Link(corda, fruta);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
}

function draw() {
  background(51);
  image(fundo, 0, 0, width, height);

  push();
  imageMode(CENTER);
  if (fruta != null) {
    image(comida_img, fruta.position.x, fruta.position.y, 70, 70);
  }
  pop();

  corda.mostrar();
  Engine.update(engine);
  solo.mostrar();

  drawSprites();

  if (colisao(fruta, coelho) == true) {
    coelho.changeAnimation('comendo');
  }


  if (fruta != null && fruta.position.y >= 650) {
    coelho.changeAnimation('chorando');
  }

}

function cair() {
  som_cortar.play();
  corda.cortar();
  fruta_con.soltar();
  fruta_con = null;
}

function colisao(corpo, sprite) {
  if (corpo != null) {
    var d = dist(corpo.position.x, corpo.position.y, sprite.position.x, sprite.position.y);
    if (d <= 80) {
      World.remove(engine.world, fruta);
      fruta = null;
      return true;
    } else {
      return false;
    }
  }
}