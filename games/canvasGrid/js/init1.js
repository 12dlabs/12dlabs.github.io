/**
 * Created by Aaronphy on 16/8/11.
 */
var canvas,
  ctx,
  width,
  height,
  size,
  lines,
  tick;

function init() {
  canvas = document.getElementById( 'canvas' );
  ctx = canvas.getContext( '2d' );
  width = Math.ceil( window.innerWidth / 2 ) * 2
  height = Math.ceil( window.innerHeight / 2 ) * 2;
  canvas.width = width;
  canvas.height = height;
  tick=230;
  size = 40;
  lines = [];
  create();
  loop();
}



function line() {
  this.path = [];                                //规划路径
  this.speed = rand( 10, 20 );                   //随机速度
  this.count = randInt( 10, 30 );                //随机计数
  this.x = width / 2 + 1;                        //初始x坐标
  this.y = height / 2 + 1;										 	// 初始y坐标
  this.target = { x: width / 2, y: height / 2 };  // 目标坐标
  this.dist = 0;                                  // 移动的距离
  this.angle = 0;                                //  移动的角度
  this.hue = tick / 5;                           //  饱和度
  this.updateAngle();                            //  角度更新函数
}

line.prototype.step = function( i ) {

  this.x += Math.cos( this.angle ) * this.speed; //x坐标叠加
  this.y += Math.sin( this.angle ) * this.speed; //y欧标得加

  this.path.push( { x: this.x, y: this.y } );
  if( this.path.length > this.count ) {
    this.path.shift();
  }
};

line.prototype.draw = function( i ) {
  ctx.beginPath();
  var rando = rand( 0, 10 );
  for( var j = 0, length = this.path.length; j < length; j++ ) {
    var x= this.path[j].x,
        y= this.path[j].y;
    ctx[ ( j === 0 ) ? 'moveTo' : 'lineTo' ]( x,y );
  }
  ctx.strokeStyle = 'hsla(' + rand( this.hue, this.hue + 30 ) + ', 80%, 55%, ' + 0.3 + ')';
  ctx.lineWidth = rand( 0.1, 2 );
  ctx.stroke();
};

line.prototype.updateAngle = function() {
  var dx = this.target.x - this.x,
    dy = this.target.y - this.y;
  this.angle = Math.atan2( dy, dx );
}


/*
 取随机数
 */
function rand( min, max ) {
  return Math.random() * ( max - min ) + min;
}
/*
 取随机数取整
 */
function randInt( min, max ) {
  return Math.floor( min + Math.random() * ( max - min + 1 ) );
};

function create() {
  lines.push(new line())
}

function step() {
  var i = lines.length;
  while( i-- ) {
    lines[ i ].step( i );
  }
}

function draw() {
  ctx.save();
  var i = lines.length;
  while( i-- ) {
    lines[ i ].draw( i );
  }
  ctx.restore();
}
function loop() {
  requestAnimationFrame( loop );
  step();
  draw();
}

init()