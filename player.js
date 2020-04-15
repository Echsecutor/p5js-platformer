function Player () {
  this.object = new PhysicalObject()

  this.object.position.x = width / 2
  this.object.position.y = 50
  this.object.size.x = 30
  this.object.size.y = this.object.size.x

  this.draw = function () {
    this.control()
    this.object.update()
    //console.log(this.object);
    fill(0, 0, 255)
    ellipse(this.object.position.x, this.object.position.y, this.object.size.x)
  }

  this.control = function () {
    // more realistic but anoying
    // if (!this.object.touches_ground) return

    var speed = 2
    moveDir = createVector(0, 0)

    if (touches.length > 0) {
      //console.log(touches[0])
      moveDir = p5.Vector.sub(
        createVector(touches[0].x, touches[0].y),
        this.object.position
      )
    }

    if (keyIsDown(LEFT_ARROW) || moveDir.x < 0) {
      this.object.acceleration.x += -speed
    } else if (keyIsDown(RIGHT_ARROW) || moveDir.x > 0) {
      this.object.acceleration.x += speed
    }
    if ((keyIsDown(UP_ARROW) || moveDir.y < 0) && this.object.touches_ground) {
      this.object.acceleration.y += -15 * speed
    }
  }
}
