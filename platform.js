function Platform () {
  this.object = new PhysicalObject()

  this.object.size.x = random(width / 2) + 10
  this.object.size.y = 10

  this.object.position.x = random(width)
  this.object.position.y = random(height)

  this.object.velocity.x = random(2) - random(2)
  this.object.velocity.y = 1
  this.object.frictionCoeff = 0

  this.object.hits_boundary = true
  this.object.bouncy = true
  this.object.gravity = createVector(0, 0)

  this.draw = function () {
    this.object.update()
    fill(50, 50, 200)
    rect(
      this.object.position.x - this.object.size.x / 2,
      this.object.position.y - this.object.size.y / 2,
      this.object.size.x,
      this.object.size.y
    )
  }
}
