var canvas,
    ctx,
    width,
    height,
    lines,
    tick;


function line() {
  this.path = [];                                //路径数组
  this.speed = rand( 10, 20 );                   //随机速度
  this.count = randInt( 10, 30 );                //随机计数
  this.x = width / 2 - 1;                        //默认x坐标
  this.y = height / 2 - 1;										 	// 默认y坐标
  this.target = { x: width / 2, y: height / 2 };  // 新起始点
  this.dist = 0;                                  // 实际位移
  this.angle = 0;                                //  移动方向
  this.hue = tick / 5;                           //  hsla.hue 色环
  this.updateAngle();                            //  角度更新函数
  this.updateDist();															// 位移更新
}

line.prototype.step = function(i) {
  this.x += Math.cos( this.angle ) * this.speed; //x坐标叠加
  this.y += Math.sin( this.angle ) * this.speed; //y坐标叠加

  this.updateDist();
  if( this.dist < this.speed ) {
    this.x = this.target.x;
    this.y = this.target.y;
    this.changeTarget();
  }
  this.path.push( { x: this.x, y: this.y } );
  if( this.path.length > this.count ) {
    this.path.shift();
  }
};


line.prototype.updateAngle = function() {
  var dx = this.target.x - this.x,
    dy = this.target.y - this.y;
  this.angle = Math.atan2( dy, dx );
}

line.prototype.draw = function(i) {
  ctx.beginPath();
  //var rando = rand( 0, 10 );

  var rando=0;
  for( var j = 0, length = this.path.length; j < length; j++ ) {
    var x= this.path[j].x+rand( -rando, rando ),
        y= this.path[j].y+rand( -rando, rando );
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

line.prototype.updateDist = function() {
  var dx = this.target.x - this.x,
    dy = this.target.y - this.y;
  this.dist = Math.sqrt( dx * dx + dy * dy );
}

line.prototype.changeTarget = function() {
  var randStart = randInt( 0, 3 );
  switch( randStart ) {
    case 0: // up
      this.target.y = this.y - size;
      break;
    case 1: // right
      this.target.x = this.x + size;
      break;
    case 2: // down
      this.target.y = this.y + size;
      break;
    case 3: // left
      this.target.x = this.x - size;
  }
  this.updateAngle();
};

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
/*
 初始化
 */
function init() {
  canvas = document.getElementById( 'canvas' );
  ctx = canvas.getContext( '2d' );
  width = Math.ceil( window.innerWidth / 2 ) * 2
  height = Math.ceil( window.innerHeight / 2 ) * 2;
  canvas.width = width;
  canvas.height = height;
  tick = 0;
  size = 40;
  lines = [];
  create();
  loop();
}

function clear (){
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'hsla(0, 0%, 0%, 0.1)';
  ctx.fillRect( 0, 0, width, height );
  ctx.globalCompositeOperation = 'lighter';
}

function draw() {
  ctx.save();
 /* ctx.translate( width / 2, height / 2 );
  ctx.rotate( tick * 0.001 );
  var scale = 0.8 + Math.cos( tick * 0.02 ) * 0.2;
  ctx.scale( scale, scale );
  ctx.translate( -width / 2, -height / 2 );*/
  var i = lines.length;
  while( i-- ) {
    lines[ i ].draw( i );
  }
  ctx.restore();
}

function step() {
  var i = lines.length;
  while( i-- ) {
    lines[ i ].step( i );
  }
}

function create() {
  if( tick%10 == 0 ){
    lines.push( new line());
  }
  //lines.push( new line());
}

function loop() {
  requestAnimationFrame( loop );
  create();
  step();
  clear();
  draw();
  tick++;
}

init();
