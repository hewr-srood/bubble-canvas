var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");

var colorArray = [
  "#ff1616",
  "#1c3144",
  "#ffba08",
  "#a2aebb",
  "#3f88c5",
  "#6ebc00",
  "#ae0000",
  "#fa8334",
  "#07a0c3",
  "#ffba08"
];

function Circle(x, y, radius, maxRadius, dx, dy) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.minRadius = radius;
  this.maxRadius = maxRadius;
  this.dx = dx;
  this.dy = dy;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
}

Circle.prototype.draw = function() {
  c.beginPath();
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

  c.fill();
  c.fillStyle = this.color;
};
Circle.prototype.update = function() {
  if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
    this.dx = -this.dx;
  }

  if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
    this.dy = -this.dy;
  }
  this.y += this.dy;
  this.x += this.dx;

  if (
    mouse.x - this.x < 80 &&
    mouse.x - this.x > -80 &&
    mouse.y - this.y < 80 &&
    mouse.y - this.y > -80 &&
    this.radius < this.maxRadius
  ) {
    this.radius += 1;
  } else if (this.radius > this.minRadius) {
    this.radius -= 1;
  }

  this.draw;
};

//eventListeners
var mouse = {
  x: undefined,
  y: undefined
};
window.addEventListener("pointermove", function(event) {
  console.log(event);
  mouse.x = event.x;
  mouse.y = event.y;
});
window.addEventListener("pointerleave", function(event) {
  console.log(event);
  mouse.x = event.x;
  mouse.y = event.y;
});
window.addEventListener("pointerleave", function(event) {
  mouse.x = undefined;
  mouse.x = undefined;
});

window.addEventListener("resize", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initCircles(500);
});

var circleArray = [];
function initCircles(numberOfCircles) {
  circleArray = [];
  for (let i = 0; i < numberOfCircles; i++) {
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 4;
    var radius = Math.random() * 3 + 1;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dy = (Math.random() - 0.5) * 4;
    circleArray.push(new Circle(x, y, radius, 40, dx, dy));
  }
}
function animate() {
  c.clearRect(0, 0, innerWidth, innerHeight);
  requestAnimationFrame(animate);
  for (let circle of circleArray) {
    circle.draw();
    circle.update();
  }
}

initCircles(500);
animate();
