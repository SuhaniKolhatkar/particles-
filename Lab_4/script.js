const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;
let r = 0;
let g = 0;
let b = 0;

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
  for (let i = 0; i < 10; i++) {
    particlesArray.push(new Particle())
  }
})

function color(){
  
  if( r >= 255){
    r = r -2 ;
  }
  else{
    r = r+1 ;
  }
  if( g >= 255){
    g = g -2 ;
  }
  else{
    g = g+1 ;
  }
  if( b >= 255){
    b = b -2 ;
  }
  else{
    b = b+1 ;
  }
}


// define class for creating multiple particles 
class Particle {
  constructor() {
    //position
    this.x = mouse.x;
    this.y = mouse.y;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 10 + 11;
    //velocity
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    //this.color = 'hsl('+ hue +' , 10% ,0.5 )';
    //this.color = 'rgba(hue , hue + Math.random() , hue + Math.random()+1 , 0.02)'
  }

  // function to update
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    //if(this.size > 0.2) this.size -= 0.1 ; 

  }
  draw() {
    ctx.fillStyle = this.color ;
  
    

  }

}
function init() {
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle())
  }
}

init();

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();

    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 70) {
        ctx.beginPath();
        ctx.strokeStyle = 'hsla(' + hue + ' , 100% , 50% , 10)';
        //ctx.strokeStyle = 'rgba('+r+', '+g+', '+b+', 0.02)';
        ctx.lineWidth = 0.5;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();


      }

    }

    if (particlesArray[i].size < 0.3) {
      particlesArray.splice(i, 1);
      i--;
    }

  }
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // inbuilt function
  handleParticles();
  requestAnimationFrame(animate); //looping animate function, inbuilt function 
  hue = hue + 2;
  //color();
  
}
animate();
