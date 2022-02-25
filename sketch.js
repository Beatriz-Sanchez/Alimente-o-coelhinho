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
var corda1, corda2, corda3, fruta, solo;
var fruta_con1, fruta_con2, fruta_con3;

var fundo;
var comida_img;
var coelho_img;

var botao1, botao2, botao3;
var coelho;
var piscar, comer, triste;
var botao_mudo;

var musica, som_cortar, som_triste, som_mastigar, som_ar;

function preload() {
  fundo = loadImage('background.png');
  comida_img = loadImage('melon.png');
  coelho_img = loadImage('Rabbit-01.png');

  musica = loadSound('sound1.mp3');
  som_triste = loadSound("sad.wav")
  som_cortar = loadSound('rope_cut.mp3');
  som_mastigar = loadSound('eating_sound.mp3');

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
  var Celular = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (Celular) {
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth + 80, displayHeight);
  } else {
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(windowWidth,windowHeight)
}

  frameRate(80);

  musica.play();
  musica.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;

  botao1 = createImg('cut_btn.png');
  botao1.position(20, 30);
  botao1.size(50, 50);
  botao1.mouseClicked(cair1);

  botao2 = createImg('cut_btn.png');
  botao2.position(330, 35);
  botao2.size(50, 50);
  botao2.mouseClicked(cair2);

  botao2 = createImg('cut_btn.png');
  botao2.position(360, 200);
  botao2.size(50, 50);
  botao2.mouseClicked(cair2);

  botao_mudo = createImg('mute.png');
  botao_mudo.position(440, 20);
  botao_mudo.size(50, 50);
  botao_mudo.mouseClicked(mutar);

  corda1 = new Corda(8, {
    x: 40,
    y: 30
  });
  corda2 = new Corda(8, {
    x: 370,
    y: 40
  });
  corda3 = new Corda(8, {
    x: 400,
    y: 225
  });
  solo = new Solo(200, canH, 600, 20);

  piscar.frameDelay = 20;
  comer.frameDelay = 20;

  coelho = createSprite(170, canH-80, 100, 100);
  coelho.scale = 0.2;

  coelho.addAnimation('piscando', piscar);
  coelho.addAnimation('comendo', comer);
  coelho.addAnimation('chorando', triste);
  coelho.changeAnimation('piscando');

  fruta = Bodies.circle(45, 200, 20);
  Matter.Composite.add(corda1.body, fruta);

  fruta_con1 = new Link(corda1, fruta);
  fruta_con2 = new Link(corda2, fruta);
  fruta_con3 = new Link(corda3, fruta);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
}

function draw() {
  background(51);
  image(fundo, 0, 0, displayWidth+80, displayHeight);

  push();
  imageMode(CENTER);
  if (fruta != null) {
    image(comida_img, fruta.position.x, fruta.position.y, 70, 70);
  }
  pop();

  corda1.mostrar();
  corda2.mostrar();
  corda3.mostrar();
  Engine.update(engine);
  solo.mostrar();

  drawSprites();

  if (colisao(fruta, coelho) == true) {
    coelho.changeAnimation('comendo');
    som_mastigar.play();
  }


  if (fruta != null && fruta.position.y >= 650) {
    coelho.changeAnimation('chorando');
    musica.stop();
    som_triste.play();
    fruta = null;
  }

}

function cair1() {
  som_cortar.play();
  corda1.cortar();
  fruta_con1.soltar();
  fruta_con1 = null;
}

function cair2() {
  som_cortar.play();
  corda2.cortar();
  fruta_con2.soltar();
  fruta_con2 = null;
}

function cair3() {
  som_cortar.play();
  corda3.cortar();
  fruta_con3.soltar();
  fruta_con3 = null;
}

function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    soprar();
  }
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

function mutar() {
  if (musica.isPlaying()) {
    musica.stop();
  } else {
    musica.play();
  }
}