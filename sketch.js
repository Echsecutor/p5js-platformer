'use strict'

var player
var food = []
var platforms = []
var points = 0

var msg = 'Use the arrow keys to move!'

const num_food = 10
const num_platforms = 5

const GameModes = Object.freeze({ playing: 1, loose: 2 })

var game_mode = GameModes.playing

function reset () {
  points = 0
  player = new Player()
  food = []
  platforms = []
  game_mode = GameModes.playing
  msg = 'Use the arrow keys to move!'
}

function setup () {
  createCanvas(windowWidth, windowHeight)
  reset()
}

function windowResized () {
  resizeCanvas(windowWidth, windowHeight)
}

function reset_if_dead () {
  if (game_mode != GameModes.playing) {
    reset()
  }
}

var touchStarted = reset_if_dead

var keyPressed = reset_if_dead

function game_draw () {
  if (food.length < num_food) {
    food.push(new Food())
  }
  if (platforms.length < num_platforms) {
    platforms.push(new Platform())
  }

  for (var i = 0; i < food.length; i++) {
    if (player.object.collides_with(food[i].object)) {
      food.splice(i, 1)
      points++
      msg = 'Points: ' + points
      i--
    } else {
      if (food[i].object.position.y > height - food[i].object.size.y) {
        food[i].object.position.y = food[i].object.size.y + 1
        food[i].object.position.x = random(width)
      }
      food[i].draw()
    }
  }

  var landing = food.concat([player])

  for (var i = 0; i < platforms.length; i++) {
    platforms[i].draw()
    for (var j = 0; j < landing.length; j++) {
      if (
        landing[j].object.collides_with(platforms[i].object) &&
        platforms[i].object.position.y > landing[j].object.position.y
      ) {
        landing[j].object.touches_ground = true
        landing[j].object.velocity.y = Math.min(landing[j].object.velocity.y, 0)
        landing[j].object.position.y =
          platforms[i].object.position.y -
          platforms[i].object.size.y / 2 -
          landing[j].object.size.y / 2
      }
    }

    if (platforms[i].object.position.y > height - platforms[i].object.size.y) {
      //console.log('removing platform ' + i)
      platforms.splice(i, 1)
      i--
    }
  }

  if (player.object.position.y > height - player.object.size.y) {
    game_mode = GameModes.loose
  }
  player.draw()
}

function draw () {
  background(0)

  fill(255, 255, 50)
  textAlign(CENTER)
  textSize(16)
  text(msg, 10, 10, width - 10, height - 10)

  if (game_mode == GameModes.playing) {
    game_draw()
  } else if (game_mode == GameModes.loose) {
    fill(255, 0, 0)
    textAlign(CENTER)
    textSize(50)
    text('GAME OVER', 10, height / 2, width - 10, height / 2)
  }
}
