function Star() {
  this.object = new PhysicalObject();

  this.object.size.x = 20;
  this.object.size.y = this.object.size.x;

  this.object.position.x = random(width);
  this.object.position.y = random(height);

  this.object.bouncy = true;
  this.object.velocity.x = random(2) - random(2);
  this.object.velocity.y = random(2) - random(2);

  this.draw = function() {
    this.object.update();
    fill(255, 255, 0);

    triangle(this.object.position.x, this.object.position.y - this.object.size.y/2,
      this.object.position.x - this.object.size.x/2, this.object.position.y + this.object.size.y / 4,
      this.object.position.x + this.object.size.x/2, this.object.position.y + this.object.size.y / 4);
    triangle(this.object.position.x, this.object.position.y + this.object.size.y/2,
      this.object.position.x - this.object.size.x/2, this.object.position.y - this.object.size.y / 4,
      this.object.position.x + this.object.size.x/2, this.object.position.y - this.object.size.y / 4);
  }

}