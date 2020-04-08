function PhysicalObject () {
  // position is by convention to be the center
  this.position = createVector(0, 0)
  this.velocity = createVector(0, 0)
  this.acceleration = createVector(0, 0)

  this.frictionCoeff = -0.02
  this.gravity = createVector(0, 0.6)

  // should this bounce from the walls?
  this.bouncy = false

  // stop at canvas boundary
  this.hits_boundary = true

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
    this.velocity.add(p5.Vector.mult(this.acceleration, 0.04 * deltaTime))
    this.position.add(p5.Vector.mult(this.velocity, 0.04 * deltaTime))

    if (this.bouncy || this.hits_boundary) {
      if (this.position.x + this.size.x / 2 > width) {
        if (this.hits_boundary) this.position.x = width - this.size.x / 2

        if (this.bouncy) this.velocity.x = -Math.abs(this.velocity.x)
        else this.velocity.x = 0
      } else if (this.position.x - this.size.x / 2 < 0) {
        if (this.hits_boundary) this.position.x = this.size.x / 2
        if (this.bouncy) this.velocity.x = Math.abs(this.velocity.x)
        else this.velocity.x = 0
      }

      if (this.position.y + this.size.y / 2 > height) {
        if (this.hits_boundary) this.position.y = height - this.size.y / 2
        if (this.bouncy) this.velocity.y = -Math.abs(this.velocity.y)
        else this.velocity.y = 0
        this.touches_ground = true
      } else if (this.position.y - this.size.y / 2 < 0) {
        if (this.hits_boundary) this.position.y = this.size.y / 2
        if (this.bouncy) this.velocity.y = Math.abs(this.velocity.y)
        else this.velocity.y = 0
      }
    }

    this.acceleration = createVector(0, 0)

    // debug BB
    //rect(this.position.x - this.size.x/2, this.position.y - this.size.y/2,this.size.x, this.size.y)
  }
}
