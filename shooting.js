let px = 420 / 2;
let py = 480;
let framelate = 60;
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let spacePressed = false;
let b_move = 5;
let p_move = 3;
let enemy_hp = 100;
let enemy_x = 420 / 2 - 30;
let enemy_y = 10;
let enemy
let bx = [];
let by = [];
let enemy_b_x = [];
let enemy_b_y = [];
let bullet_angle = [];
let random_enemy = 0;
let enemy_b_angle = [];
const canvas = document.getElementById("shooting");
const ctx = canvas.getContext("2d");

let lastFired = Date.now();
let hit_enemy_time = Date.now();
let fpscount = Date.now();
function frame(){
    framelate = 1000 / (Date.now() - fpscount);
    fpscount = Date.now();
    document.getElementById("hp").innerHTML = enemy_hp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(rightPressed){
        px += p_move / (framelate / 60);
    } 
    if(leftPressed){
        px -= p_move / (framelate / 60);
    } 
    if (upPressed){
        py -= p_move / (framelate / 60);
    } 
    if (downPressed){
        py += p_move / (framelate / 60); 
    }
    ctx.beginPath();
    ctx.fillStyle = 'rgb(0,0,0)';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "#FFFFFF";
    ctx.rect(px,py, 20, 20);
    ctx.fill();
    ctx.closePath();
    b_draw();
    enemy_move();
    d_enemy();
    enemy_hit();
    d_enemy_bullet();
}

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = true;
    } 
    if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = true;
    }
    if (e.key === "Up" || e.key === "ArrowUp"){
      upPressed = true;  
    } 
    if (e.key === "Down" || e.key === "ArrowDown"){
      downPressed = true;
    }
    if(e.code === 'Space'){
       spacePressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
      rightPressed = false;
    } 
    if (e.key === "Left" || e.key === "ArrowLeft") {
      leftPressed = false;
    } 
    if (e.key === "Up" || e.key === "ArrowUp"){
      upPressed = false;  
    } 
    if (e.key === "Down" || e.key === "ArrowDown"){
      downPressed = false;
    } 
    if (e.code === 'Space'){
        spacePressed = false;
    }
}
function enemy_bullet(angle){
  enemy_b_x.push(enemy_x);
  enemy_b_y.push(enemy_y);
  enemy_b_angle.push(Math.random() * 360);
}
function b_draw(){
    var a = -1;
    do {
        ctx.beginPath();
        ctx.fillStyle = "#FFFFFF";
        ctx.rect(bx[a],by[a], 10, 10);
        ctx.fill();
        ctx.closePath();
        by[a] -= b_move / (framelate / 60);
        if(by[a] <= -10){
            by.splice(a,1)
            bx.splice(a,1)
        }
        ++a;
    } while(a < bx.length);
}
function d_enemy(){
  ctx.beginPath();
  ctx.fillstyle = "#FFFFFF";
  ctx.rect(enemy_x,enemy_y,30,30)
  ctx.fill();
  ctx.closePath();
}
function enemy_hit(){
  for(i=0;i <= by.length;i++){
    if(enemy_x <= bx[i] + 10 && bx[i] <= enemy_x + 30 && enemy_y <= by[i] + 10 && by[i] <= enemy_y + 30){
      if(Date.now() - hit_enemy_time >= 100){
        enemy_hp -= 1;
        hit_enemy_time = Date.now();
        bx.splice(i,1);
        by.splice(i,1);
      }
    } 
  }
}
function enemy_move(){
  if(random_enemy === 1){
    enemy_x += (50 - enemy_x) / 20 / (framelate / 60);
    enemy_bullet(45);
  } else if(random_enemy === 2){
    enemy_x += (350 - enemy_x) / 20 / (framelate / 60);
  }
}
function d_enemy_bullet(){
    var i = -1
    do{
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.rect(enemy_b_x[i],enemy_b_y[i], 10, 10);
    ctx.fill();
    ctx.closePath();
    move(enemy_b_angle[i],5,i);
    if(enemy_b_y[i] >= 510 ){
        enemy_b_x.splice(i,1);
        enemy_b_y.splice(i,1);
        enemy_b_angle.splice(i,1);
    }
    i++;
  }while(i < enemy_b_x.length);
} 
function move(angle,step,number){
  console.log(number);
 enemy_b_x[number] += Math.sin(angle*(Math.PI/180)) * step;
 enemy_b_y[number] += Math.cos(angle*(Math.PI/180)) * step;
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(frame,1000/framelate);
setInterval(() => {
  random_enemy = Math.floor(Math.random() * 2) + 1;
  console.log(random_enemy);
},5000);
setInterval(() => {
  if(spacePressed && Date.now() - lastFired > 200){
    bx.push(px + 5);
    by.push(py);
    
    lastFired = Date.now();
  }
},1000/framelate);
