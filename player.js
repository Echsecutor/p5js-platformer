function Player() {

  this.object = new PhysicalObject();

  this.object.position.x = width / 2;
  this.object.position.y = height / 2;
  this.object.size.x = 30;
  this.object.size.y = this.object.size.x;

  this.object.bouncy = true;
  

  this.draw = function() {
    this.control();
    this.object.update();
    //console.log(this.object);
    fill(0, 0, 255);
    ellipse(this.object.position.x,this.object.position.y,this.object.size.x);
  }


  this.control = function() {
    if(!this.object.touches_ground)
      return;
      
    var speed = 2;

    if (keyIsDown(LEFT_ARROW)) {
      this.object.acceleration.x += -speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.object.acceleration.x += speed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.object.acceleration.y += -10* speed;
    }
    
    if(touches.length>0){
      //console.log(touches[0])
      this.object.acceleration = p5.Vector.sub(createVector(touches[0].x,touches[0].y),this.object.position).normalize()
      this.object.acceleration.mult(speed)
    }

  }

}