var player;
var stars = [];
var points = 0;

var msg = "Use the arrow keys to move!";

function setup() {
  createCanvas(windowWidth, windowHeight);

  createCanvas(width, height);
  player = new Player();

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  player.draw();

  fill(255, 255, 50);
  text(msg, 10, 10, width - 10, height - 10);

  if (stars.length < 10) {
    stars.push(new Star());
  }

  for (var i = 0; i < stars.length; i++) {
    if (player.object.collides_with(stars[i].object)) {
      stars.splice(i, 1);
      points++;
      stars.push(new Star())
      msg = "Stars Eaten: " + points
      i--;
    } else {
      stars[i].draw();
    }
  }
}