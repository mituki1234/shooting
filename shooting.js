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
let bx = [];
let by = [];
const canvas = document.getElementById("shooting");
const ctx = canvas.getContext("2d");
function frame(){
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
    // プレイヤーの操作判定,描画,球を描画する関数の呼び出し
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
// keydownを判定して操作
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
// keyupを判定して操作
function b_draw(){
  for(var i = 0;i <= bx.length;i++){
    by[i] -= b_move;
    ctx.beginPath;
    ctx.fillStyle = "#FFFFFF";
    ctx.rect(bx[i],by[i], 10, 10);
    ctx.fill();
    ctx.closePath();
    if(by[i] <= 10){
      by.splice(i,1)
      bx.splice(i,1)
    }
    // 球の描画部分だがなぜか全く違う場所に描画される。
  }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(() => {
  if(spacePressed){
    bx.push(px + 5);
    by.push(py);
    // 描画位置を指定する。
  }
},200)
setInterval(frame,1000/framelate);
