const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

//get mouse position 
let mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 400) * (canvas.width / 400)
}

window.addEventListener('mousemove',
  function (event) {
    mouse.x = event.x;
    mouse.y = event.y;

  });

//create particles
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  //method to drwaw individual particles 
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = 'rgba(129, 9, 85,0.5)';
    ctx.fill();

  }
  //check particles position , check mouse position , move the particle , draw the particle 
  update() {
    //check colision of separate ball 
    
   

    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}
//create a particle array 
function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 20000;
  for (let a = 0; a < numberOfParticles; a++) {

    let size = (Math.random() * 70) + 10;
    let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
    let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
    let directionX = (Math.random() * 5) - 2.5;
    let directionY = (Math.random() * 5) - 2.5;
    let color = 'rgba(129, 9, 85 , 0.5)';

    
    for (let i = 0; i < numberOfParticles; i++) {
      for (let j = i; j < numberOfParticles; j++) {
        let dx = particlesArray[i].x - particlesArray[j].x
        let dy = particlesArray[i].y - particlesArray[j].y
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < particlesArray[i].size + particlesArray[j].size) {
          if (particlesArray[i].x < particlesArray[j].x && particlesArray[i].x < canvas.width - particlesArray[i].size * 10) {
            particlesArray[i].x += 10;
          }
          if (particlesArray[i].x > particlesArray[j].x && particlesArray[i].x > canvas.width - particlesArray[i].size * 10) {
            particlesArray[i].x -= 10;
          }
          if (particlesArray[i].y < particlesArray[j].y && particlesArray[i].y < canvas.width - particlesArray[i].size * 10) {
            particlesArray[i].y += 10;
          }
          if (particlesArray[i].y > particlesArray[j].y && particlesArray[i].y > canvas.width - particlesArray[i].size * 10) {
            particlesArray[i].y -= 10;
          }
        }

      }
    }

    particlesArray.push(new Particle(x, y, directionX, directionY, size, color))
  }
}








//animation loop 
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();

  }

}
//to connect the particles which are close enough to draw a line between them 

init();
animate();





