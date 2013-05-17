var context, cwidth, cheight
var id, interval = 10
var x, y, dx = 2, dy = 3, radius = 10
var p_x, p_y, p_w = 100, p_h= 20, p_margin = 5
var moveL = false, moveR = false, mouseM = false
var paddle_shift = 10
var xpos,ypos
var block_layers = 3, blocks_per_layer = 10, block_width , block_height = 20, block_state, block_top_offset = 20, block_padding = 5

$(document).ready(function(){
	Init() //Initialises the event listeners
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


function Clear(){
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
		GameStart()
	})
}
function DrawBlocks(){
	block_width = cwidth/blocks_per_layer - 2*block_padding
	t_x = 0, t_y = block_top_offset
	for(i = 0; i< block_layers;i+=1){
		t_x = 0
		for(j=0;j<blocks_per_layer;j+=1){
			if(block_state[blocks_per_layer*i + j] == 1){
				context.fillRect(t_x+block_padding, block_top_offset+t_y, block_width, block_height)						
				t_x += block_padding*2 + block_width
			}
		}
		t_y += block_height + block_padding
	}
}
function InitBlocks(){
	block_state = new Array(blocks_per_layer * block_layers)
	for(i=0;i<block_layers;i+=1)
		for(j=0;j<blocks_per_layer;j+=1)
			block_state[blocks_per_layer*i + j] = 1
}
function GameStart(){
	InitPositions()
	InitBlocks()
	id = setInterval(draw, interval)
}
function DrawCircle(x,y,r){
	context.beginPath()
	context.arc(x,y,r,0,2 * Math.PI)
	context.closePath()
	context.fill()
}

function draw(){
	Clear()
	DrawCircle(x,y,radius)
	DrawBlocks()
	DrawPaddle()
	//check bounds
	UpdateXY()//this function should check if the ball hits any of the block
	UpdatePaddleXY()
}
function DrawPaddle(){
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
