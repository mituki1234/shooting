let px = 42 / 2;
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
let bx = [];
let by = [];
const canvas = document.getElementById("shooting");
const ctx = canvas.getContext("2d");

let lastFired = Date.now();
let hit_enemy_time = Date.now();
let fpscount = Date.now();
function frame(){
    document.getElementById("hp").innerHTML = enemy_hp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    framelate = 1000 / (Date.now - fpscount);
    fpscount = Date.now();
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
    d_enemy();
    enemy_hit();
    enemy_move();
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

function b_draw(){
    var a = -1;
    do {
        ctx.beginPath();
        ctx.fillStyle = "#FFFFFF";
        ctx.rect(bx[a],by[a], 10, 10);
        ctx.fill();
        ctx.closePath();
        by[a] -= b_move;
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
  console.log("what");
  for(i=0;i <= by.length;i++){
    if(enemy_x <= bx[i] + 10 && bx[i] <= enemy_x + 30 && enemy_y <= by[i] + 10 && by[i] <= enemy_y + 30){
      if(Date.now() - hit_enemy_time >= 200){
        enemy_hp -= 1;
        hit_enemy_time = Date.now();
        delete bx[i];
        delete by[i];
      }
    } 
  }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(frame,1000/framelate);
setInterval(() => {
  if(spacePressed && Date.now() - lastFired > 200){
    bx.push(px + 5);
    by.push(py);
    lastFired = Date.now();
  }
},1000/framelate);
