function PhysicalObject () {
  // position is by convention to be the center
  this.position = createVector(0, 0)
  this.velocity = createVector(0, 0)
  this.acceleration = createVector(0, 0)

  this.frictionCoeff = -0.02
  this.gravity = createVector(0, 0.6)

  // should this bounce form the walls?
  this.bouncy = false

  // width/height for collision detection
  this.size = createVector(0, 0)

  this.touches_ground = false

  this.collides_with = function (physicalObject) {
    return (
      Math.abs(this.position.x - physicalObject.position.x) * 2 <
        this.size.x + physicalObject.size.x &&
      Math.abs(this.position.y - physicalObject.position.y) * 2 <
        this.size.y + physicalObject.size.y
    )
  }

  this.update = function () {
    this.touches_ground = false

    this.acceleration.add(this.gravity)

    this.acceleration.add(p5.Vector.mult(this.velocity, this.frictionCoeff))
    //see https://p5js.org/reference/#/p5.Vector/add
    this.velocity.add(this.acceleration)
    this.position.add(this.velocity)

    if (this.bouncy) {
      if (this.position.x + this.size.x > width) {
        this.position.x = width - this.size.x
        this.velocity.x = -Math.abs(this.velocity.x)
      } else if (this.position.x - this.size.x < 0) {
        this.position.x = this.size.x
        this.velocity.x = Math.abs(this.velocity.x)
      }

      if (this.position.y + this.size.y > height) {
        this.position.y = height - this.size.y
        this.velocity.y = -Math.abs(this.velocity.y)
        this.touches_ground = true
      } else if (this.position.y - this.size.y < 0) {
        this.position.y = this.size.y
        this.velocity.y = Math.abs(this.velocity.y)
      }
    }

    this.acceleration = createVector(0, 0)
  }
}
