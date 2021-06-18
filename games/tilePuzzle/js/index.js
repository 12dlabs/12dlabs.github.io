/**
 * Created by Aaronphy on 16/9/7.
 */
// JavaScript Document
var fill;
var mark;
var moves = 0;
var gameArr = new Array(9);
var gameFinal = new Array(1,2,3,8,0,4,7,6,5);
var xhr = false;
var name = "saurabh";
function initAll() {
  var i;
  fill = 0;
  for (i = 0; i < 9; i++) {
    var pos = generateNum();
    while (!findNum(pos)) {
      pos = generateNum();
    }
    gameArr[fill] = pos;
    if (pos == 0)
      mark = fill;
    var src = "images/" + gameArr[fill] + ".png";
    fill++;
    document.getElementById(fill).src = src;
  }
}
function findNum(j) {
  for (var i = 0; i < fill; i++) {
    if (gameArr[i] == j) {
      return ( false) ;
    }
  }
  return ( true) ;
}
function generateNum() {
  return ( Math.floor((Math.random() * 9))) ;
}
function slide(num) {
  num--;
  if (num == mark + 1 || num == mark - 1 || num == mark + 3 || num == mark - 3) {
    if ((num == mark + 1) && ((mark == 2 && num == 3) || (mark == 5 && num == 6))) {
      alert("Not movable");
      return;
    }
    if ((num == mark - 1) && ((mark == 3 && num == 2) || (mark == 6 && num == 5))) {
      alert("Not movable");
      return;
    }
    var tmp = document.getElementById(num + 1).src;
    document.getElementById(num + 1).src = document.getElementById(mark + 1).src;
    document.getElementById(mark + 1).src = tmp;
    tmp = gameArr[num];
    gameArr[num] = gameArr[mark];
    gameArr[mark] = tmp;
    mark = num;
    moves++;
    document.getElementById(101).innerHTML = "<h3>已经移动:" + moves + "次</h3>";
    checkWin();
  }
}
function checkWin() {
  var flag = true;
  for (var i = 0; i < 9; i++) {
    if (gameArr[i] == gameFinal[i]) {
      document.getElementById(i + 1).className = "correct";
    } else {
      document.getElementById(i + 1).className = "normal";
    }
    if (flag == true && gameArr[i] != gameFinal[i]) {
      flag = false;
    }
  }
  if (flag) {
    alert("你赢啦!");
  }
}

function reload() {
   location.reload();
}

