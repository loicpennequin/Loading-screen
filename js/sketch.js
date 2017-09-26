let particles = [],
    myFont;

function preload() {
  myFont = loadFont('/Days.otf');
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('header')
  angleMode(DEGREES);
  colorMode(HSB, 255);
  for (let i = 0; i < 7 ; i++){
    particles.push(new Particle)
  }
  textAlign(CENTER);
  textSize(24);
  textFont(myFont);
  // background(255)
  // frameRate(1)
}

function draw(){
  clear();
  // background(255);
  translate(width/2, height/2);
  particles.forEach(function(p){
    p.update();
    p.display();
  })
  translate(10, 100)
  for (let i = 0 ; i <= 2; i++){
    translate(0,10)
    fill(130,30,100,map(i,0,2,255,100));
    text("LOADING . . .",0,0);
  }
}

function Particle(){
  this.x = 0;
  this.y = random(20,50);
  this.maxY = this.y;
  this.angle = random(360);
  this.color = color(random(40), 200, random(150,220), 255)
  this.history = [];
  this.speed = 3;
  this.maxSpeed = this.speed;
  this.size = random(3,8);

  this.update = function(){
    this.storeHistory();
    if(mouseIsPressed){
      if(this.speed > -this.maxSpeed){
        this.speed-=0.2;
      }
      // if(this.y >= -this.maxY){
      //   this.y-=5;
      // }
    }else{
      if(this.speed < this.maxSpeed){
        this.speed+=0.2;
      }
      // if (this.y < this.maxY){
      //   this.y+=5;
      // }
    }
    this.angle += this.speed;
    if (this.angle > 360){
      this.angle = 0
    }
  }

  this.storeHistory = function(){
    this.history.forEach(function(p){
      p.lifespan--;
    });

    this.history.push({
      x: this.x,
      y: this.y,
      angle: this.angle,
      color: this.color,
      size: this.size,
      lifespan : 30
    });

    if (this.history.length > 30){
      this.history.splice(0,1);
    }
    let newHue = hue(this.color)+1
    if (newHue > 255){
      newHue = 0
    }
    this.color = color(newHue, saturation(this.color), brightness(this.color))
  };

  this.display = function(){
    noStroke();
    // let newHue = hue(this.color) + map(mouseX, 0, windowWidth, 20, 100)
    // if ( newHue > 255){
    //   newHue -= 255;
    // }
    this.history.forEach(function(p, index){
      fill(hue(p.color), saturation(p.color), brightness(p.color), map(p.lifespan, 0,30,0,255));
      push();
      rotate(p.angle);
      ellipse(p.x, p.y, p.size);
      pop();
    });

    push();
    fill(this.color);
    rotate(this.angle);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
