function Ship(ctx) {
  this.ctx = ctx;

  this.x = ctx.canvas.width / 2;
  this.y = ctx.canvas.height - 80;

  this.vx = 0;
  this.vy = 0;

  this.img = new Image();
  this.img.src = "https://i.stack.imgur.com/rsH6n.png";

  this.w = 65;
  this.h = 70;
  //this.r = 0;
  this.a = (3 * Math.PI) / 2;
  this.isThrusting = false;
  this.isTurning = false;

  this.setListeners();

  this.bullets = [];
}

Ship.prototype.draw = function() {
  this.bullets.forEach(function(bullet) {
    bullet.draw();
  });
 
 
  this.ctx.save();
  this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
  this.ctx.rotate(this.a - (3 * Math.PI) / 2);
  this.ctx.drawImage(this.img, -this.w / 2, -this.h / 2, this.w, this.h);
  this.ctx.restore();


};

Ship.prototype.move = function() {
  if (this.isThrusting) {
    this.vx += SHIP_THRUST;
    this.vy += SHIP_THRUST;

    this.vx -= (this.vx * FRICTION) / FPS;
    this.vy -= (this.vy * FRICTION) / FPS;

    this.x += (this.vx * Math.cos(this.a)) / FPS;
    this.y += (this.vy * Math.sin(this.a)) / FPS;
  }
  this.vx -= (this.vx * FRICTION) / FPS;
  this.vy -= (this.vy * FRICTION) / FPS;

  this.x += (this.vx * Math.cos(this.a)) / FPS;
  this.y += (this.vy * Math.sin(this.a)) / FPS;

  this.bullets.forEach(function(bullet) {
    bullet.move();
  }
  )};

Ship.prototype.addbullets = function() {

  var bullet = new Bullet(this.ctx, this.x + this.w / 2, this.y + (this.h  / 2) - 15, this.a);
  this.bullets.push(bullet);


// Filter bullets use bind 


};

Ship.prototype.setListeners = function() {
  document.onkeydown = this.onKeyDown.bind(this);
  document.onkeyup = this.onKeyUp.bind(this);
};

Ship.prototype.onKeyDown = function(e) {
  switch (e.keyCode) {
    case KEY_RIGHT:
      this.isTurning = true;
      this.a += Math.PI / 32;
      this.r = this.a;
      break;
    case KEY_LEFT:
      this.isTurning = true;
      this.a -= Math.PI / 32;
      this.r = this.a;
      break;

    case KEY_UP:
      this.isThrusting = true;

      break;

    case KEY_SPACE:
      this.addbullets();
      break;
  }
};
Ship.prototype.onKeyUp = function(e) {
  switch (e.keyCode) {
    case KEY_RIGHT:
      this.isTurning = false;
      break;
    case KEY_LEFT:
      this.isTurning = false;
    case KEY_UP:
      this.isThrusting = false;
    case KEY_SPACE:
  }
};


// flame https://www.spriters-resource.com/resources/sheet_icons/62/65509.png