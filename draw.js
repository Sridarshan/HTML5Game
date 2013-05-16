var context, cwidth, cheight
var id, interval = 10
var x, y, dx = 2, dy = 3, radius = 10
var p_x, p_y, p_w = 100, p_h= 20, p_margin = 5
var moveL = false, moveR = false, mouseM = false
var paddle_shift = 10
var xpos,ypos

$(document).ready(function(){
  Init() //Initialized the event listeners
	InitPositions()
	console.log(x + ":" + y)
	GameStart()
});	


function InitPositions(){
	context = $("canvas").get(0).getContext("2d")
	cwidth = $("canvas").width()
	cheight = $("canvas").height()
	x = radius + Math.random()*(cwidth-radius)
	y = radius
	p_x = (cwidth-p_w)/2
	p_y = cheight-p_h-p_margin
}


function clear(){
	context.clearRect(0,0,cwidth,cheight)
}
function Init(){
	$(document).keydown(function(event){
		if(event.keyCode == 37){
			moveL = true//update p_x
		}
		if(event.keyCode == 39){
			moveR = true
		}
	});
	
	$(document).keyup(function(event){
		if(event.keyCode == 37){
			moveL = false//update p_x
		}
		if(event.keyCode == 39){
			moveR = false
		}
	})
	
	$("canvas").mousemove(function(event){
		mouseM = true
		xpos = event.pageX - event.currentTarget.offsetLeft
		ypos = event.pageY - event.currentTarget.offsetTop
	})

	$("#reStart").click(function(){
		clearInterval(id)
		InitPositions()
		GameStart()
	})
}

function GameStart(){
	id = setInterval(draw, interval)
}
function drawCircle(x,y,r){
	context.beginPath()
	context.arc(x,y,r,0,2 * Math.PI)
	context.closePath()
	context.fill()
}

function draw(){
	clear()
	drawCircle(x,y,radius)
	drawPaddle()
	//check bounds
	
	UpdateXY()
	UpdatePaddleXY()
}
function drawPaddle(){
	UpdatePaddleXY()
	context.fillRect(p_x, p_y, p_w, p_h)
}
function UpdatePaddleXY(){
	if(moveL){
		moveL = false
		if(p_x > 0)
				if(p_x < paddle_shift) p_x = 0
				else p_x -= paddle_shift
	}
	if(moveR){
		moveR = false
		if(p_x <(cwidth-p_w))
			if((cwidth-p_w-p_x) < paddle_shift)
				p_x = cwidth - p_w
			else
				p_x += paddle_shift
	}
	if(mouseM){
		mouseM = false
		if(xpos >= (p_w/2) && xpos <= (cwidth-(p_w/2)))
			p_x = xpos - p_w/2
		else if (xpos < p_w/2)
			p_x = 0
		else if(xpos > cwidth - p_w/2)
			p_x = cwidth - p_w
	}
}
function UpdateXY(){
	if(x + dx > (cwidth-radius) || x <radius)
		dx *= -1
	if(y < radius)
		dy *= -1
	if(y + dy > (cheight-radius-p_h))
		if(x>p_x && x<(p_x+p_w)){
			dy *= -1
			
		}
	else
		if(y + dy > (cheight-radius)){
			console.log(id)
			id = clearInterval(id)	
			console.log(id)
		}
	x += dx
	y += dy
}
