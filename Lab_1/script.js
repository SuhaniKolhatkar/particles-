const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];

//to resize the window
window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


});
//js object which will store x,y coordinate of mouse
// global available for all the program below 
//keep value undefined to have blank canvas
const mouse = {
  x: undefined,
  y: undefined,
}
//details about mouse click are stored in the event by default 
canvas.addEventListener('click', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
})

//add an event listner on canvas for mousemovement 
canvas.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
})



// define class for creating multiple particles 
class Particle {
  constructor() {
    //position
    //this.x = mouse.x;
    //this.y = mouse.y;
    this.x = Math.random()* canvas.width;
    this.y = Math.random()* canvas.height;
    this.size = Math.random() * 5 + 1;
    //velocity
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }

  // function to update
  update(){
    this.x += this.speedX ;
    this.y += this.speedY ;
  }
  draw(){
    ctx.fillStyle = 'blue';
  ctx.beginPath();
  ctx.arc(this.x, this.y, 50, 0, Math.PI * 2);
  ctx.fill();
  }
}

function init(){
   for( let i = 0 ; i < 100 ; i++ ){
   particlesArray.push(new Particle()) 
   }
}

init();

function handleParticles(){
  for(let i = 0 ; i < particlesArray.length ; i++ ){
    particlesArray[i].update() ;
    particlesArray[i].draw() ;
  }
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // inbuilt function
  handleParticles(); 
   requestAnimationFrame(animate); //looping animate function, inbuilt function 
   
}
animate();
