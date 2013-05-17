 $(document).ready(function() {

 	//canvas context
 	var canvas = document.getElementById( 'myCanvas' );
 	var ctx = canvas.getContext( '2d' );

//mousemove function
$(document).mousemove(function(event) {
	currentMousePos.x = event.pageX;
	currentMousePos.y = event.pageY;
});


//radar
var currentMousePos = { x: -1, y: -1 };
var FRAMES_PER_CYCLE=20; // number of frames per radar cycle
var FRAMERATE=20; // frames per second
var RINGS = 3;  // number of radar rings rendered
var canvassize = (canvas.width<canvas.height)?canvas.width:canvas.height;
var centerReciprocal;
var ringsize = canvassize/(2*RINGS+1)/centerReciprocal;
var radiusmax = ringsize/2 + ringsize + (RINGS-1)*ringsize;
var animationframe=0;

//circles
var w = canvas.width;
var h = canvas.height;
var z = d3.scale.category20c();
var i = 0;


if(w>=1200){
	centerReciprocal = 8;
}
else if(w>= 800 || canvas.width<1200){
	centerReciprocal = 6;
}
else if(w>= 600 || canvas.width<800){
	centerReciprocal = 4;
}
else if(w>= 200 || canvas.width<600){
	centerReciprocal = 2;
}
else {
	centerReciprocal = 1;
}


function animateRadarFrame()
{
	ctx.clearRect(0,0,canvas.width,canvas.height);

	var radius;
	var alpha;
	var scale = 0.3;
	var offsetX = 8;
	var offsetY = 8;

	for (var ringno=0;ringno<RINGS;ringno++)
	{
		radius = ringsize/2 + (animationframe/FRAMES_PER_CYCLE)*ringsize + ringno*ringsize;
		alpha = (radiusmax-radius)/radiusmax;
		ctx.beginPath();
		ctx.fillStyle = "rgba(0,0,0,"+alpha+")";
          //ctx.arc($this.width()/2,$this.height()/2,radius*scale,0,2*Math.PI,false);
          ctx.arc(currentMousePos.x-offsetX,currentMousePos.y-offsetY,radius*scale,0,2*Math.PI,false);
          ctx.fill();
      }

      ctx.beginPath();
      ctx.fillStyle = "rgba(120,220,220,40)";
        //ctx.arc($this.width()/2,$this.height()/2,ringsize/2,0,2*Math.PI,false);
        ctx.arc(currentMousePos.x-offsetX,currentMousePos.y-offsetY,ringsize/2,0,2*Math.PI,false);
        ctx.fill();
        
        if (animationframe>=(FRAMES_PER_CYCLE-1))
        	animationframe=0;
        else
        	animationframe=animationframe+1;
    }

    function animateRadarFrameD3(){
    	var radius;
    	var alpha;
    	var scale = 0.3;
    	var offsetX = 8;
    	var offsetY = 8;

    	//testing funcionality
    	d3.select('svg').append('ellipse').attr("cx", currentMousePos.x)
    	.attr("cy", currentMousePos.y).attr("rx", 10).attr("ry", 10);

    	//console.log(currentMousePos.x + " "+ currentMousePos.y);

    	for (var ringno=0;ringno<RINGS;ringno++){
    		radius = ringsize/2 + (animationframe/FRAMES_PER_CYCLE)*ringsize + 
    		ringno*ringsize;
    		alpha = (radiusmax-radius)/radiusmax;

    	}
    }

    function testAnimation(){

    	var arc = d3.svg.arc()
    	.innerRadius(50)
    	.outerRadius(70)
    	.startAngle(45 * (pi/180)) //converting from degs to radians
    	.endAngle(3) //just radians

    	vis.append("path")
    	.attr("d", arc)
    	.attr("transform", "translate(200,200)")
    }



// Tree configuration
var branches = [];
// var w = canvas.width;
// var h = canvas.height;
var centre = { x: (w/2.0), y: (h/2.0) }
var startAngle;
var seed;
var pointOnEdge;

var da = 0.; // Angle delta: 0.
var dl = 0.87; // Length delta (factor)
var ar = 2.; // Randomness: 2.
var maxDepth = 4;
var branchLength = 170;//200

var branchWidth = 1.5//"1.5px";//1 or 2 is super nice
var branchColor = "#ff8da1"//#ff8da1 ff8daf ff8d90 

var outerRadius = Math.min(w, h) / 2 - 10;
var innerRadius = outerRadius - 24;

var arc = d3.svg.arc()
.innerRadius(innerRadius)
.outerRadius(outerRadius);

var layout = d3.layout.chord()
.padding(.04)
.sortSubgroups(d3.descending)
.sortChords(d3.ascending);

var path = d3.svg.chord()
.radius(innerRadius);


var dt = 250;//time interval: 165 200
var t = dt;//timer

//circles radius mult
var rMult = 50;//70,100,400,50

//popup window
// window.onload = function() {
//                 register_popup("show", "hide", "popup", "obscuring-layer");
//             }


resetSeed();

function calculateAngle(x1,y1,x2,y2) { // calculate angle between two points
	var deltaX = x2 - x1;
	var deltaY = y2 - y1;
	return Math.atan2(deltaX,deltaY);
}

function resetSeed() { // reset seed
	pointOnEdge = randomPointOnEdge();
	startAngle = calculateAngle(pointOnEdge.x,pointOnEdge.y,centre.x,centre.y);
	seed = {i: 0, x: pointOnEdge.x, y: h - pointOnEdge.y, a: startAngle, l: branchLength, d:0};
}

function randomPointOnEdge() { // only generates points on the  rectangular edge of the canvas
	var p = Math.random();
	var edgeOffset = 0; // this decides how far the root is of the edge.

	var x = 0;
	var y = 0;

	if (p < 0.25) {
		x = Math.random() * (h-edgeOffset);
		y = edgeOffset;
	} else if (p < 0.5) {
		x = Math.random() * (w-edgeOffset);
		y = h;
	} else if (p < 0.75) {
		x = edgeOffset;
		y = Math.random() * (h-edgeOffset);
	} else {
		x = w-edgeOffset;
		y = Math.random() * (h-edgeOffset);
	}
	return { x: x , y: y };
}

// Tree creation functions
function branch(b) {
	var end = endPt(b), daR, newB;

	branches.push(b);

	if (b.d === maxDepth)
		return;

	// Left branch
	daR = ar * Math.random() - ar * 0.5;
	newB = {
		i: branches.length,
		x: end.x,
		y: end.y,
		a: b.a - da + daR,
		l: b.l * dl ,
		d: b.d + 1,
		parent: b.i
	};
	branch(newB);

	// Right branch
	daR = ar * Math.random() - ar * 0.5;
	newB = {
		i: branches.length,
		x: end.x, 
		y: end.y, 
		a: b.a + da + daR, 
		l: b.l * dl, 
		d: b.d + 1,
		parent: b.i
	};
	branch(newB);
}

function regenerate(initialise) {
	branches = [];
	resetSeed();
	branch(seed);
	initialise ? create() : update();
}

function endPt(b) {
	// Return endpoint of branch
	var x = b.x + b.l * Math.sin( b.a );
	var y = b.y - b.l * Math.cos( b.a );
	return {x: x, y: y};
}


// D3 functions
function x1(d) {return d.x;}
function y1(d) {return d.y;}
function x2(d) {return endPt(d).x;}
function y2(d) {return endPt(d).y;}

/////////highlight branches
function highlightParents(d) {
	var colour = d3.event.type === 'mouseover' ? 'green' : branchColor;
	var depth = d.d;
	for(var i = 0; i <= depth; i++) {
		d3.select('#id-'+parseInt(d.i)).style('stroke', colour);
		d = branches[d.parent];
	}

	d3.select(this).style('stroke-width',10);
}

function highlightParentsSmallStroke(d) {
	var colour = d3.event.type === 'mouseover' ? 'green' : branchColor;
	var depth = d.d;
	for(var i = 0; i <= depth; i++) {
		d3.select('#id-'+parseInt(d.i)).style('stroke', colour);
		d = branches[d.parent];
	}

	d3.select(this).style('stroke-width',branchWidth);
}

/////////highlight circles
function highlightCircles(d) {
	d3.select(this).style('stroke-width',function(d) {
		var value = Math.random()*1000;
		return Math.sqrt(value);
	})
	.style("fill","cyan")
	.style('stroke',"#1690b5")
	.style('stroke-width',5)
	.style('fill-opacity',0.7)/*0.5 0.75 1.0*/

	rMult = 400;
}

function unhighlightCircles(d){
	d3.select(this).style('stroke-width',function(d) {
		var value = Math.random()*10;
		return Math.sqrt(value);
	})
	.style("fill","black")
	.style('stroke',"#d3d3d3")
	.style('stroke-width',2)
	.style('fill-opacity',0.25)

	rMult = 100;
}



//INIT
//changed the position of the spheres x1 = x2 y1 = y2
function create() {
	//testing the canvas
	// d3.select('svg').append('ellipse').attr("cx",100)
	// .attr("cy", 100).attr("rx", 10).attr("ry", 10);


	d3.select('svg')
	.selectAll('line')
	.data(branches)
	.enter()
	.append('line')
	.attr('x1', x1)
	.attr('y1', y1)
	.attr('x2', x2)
	.attr('y2', y2)
	.style('stroke-width', branchWidth)
	.style('stroke', branchColor)
	.style('stroke-opacity',.6)
	.attr('id', function(d) {return 'id-'+d.i;})
	.on('mouseover', highlightParents)
	.on('mouseout', highlightParentsSmallStroke);


	d3.select('svg')
	.selectAll('circle')
	.data(branches)
	.enter()
	.append('circle')
	.attr('cx',x2)
	.attr('cy',y2)
	.attr("r", function(d) {
		var value = Math.random()*rMult;
		return Math.sqrt(value);
	})
	.style("fill","black")
	.style('stroke',"#d3d3d3")
	.style('stroke-width',2)
	.style('fill-opacity',0.25)
	// .on("mouseover", function(){d3.select(this).attr("r",100).
	// 		style("fill", "cyan")});
 //.on("mouseover",function(){rMult = 100})
 	.on("mouseover",highlightCircles)
 	.on("mouseout", unhighlightCircles);
	// .on("mouseout", function(){d3.select(this).attr("r",function(d) {
	// 	var value = Math.random()*rMult;
	// 	return Math.sqrt(value);
	// })})
		//.attr('id', function(d) {return 'id-'+d.i;});


	//radial
	var svg = d3.select("body").append("svg:svg")
	.attr("width", w)
	.attr("height", h)
	.style("pointer-events", "all")
	.on("mousemove", particle);

}


	//UPDATE
	function update() {
		d3.select('svg')
		.selectAll('line')
		.data(branches)
		.transition()
		.attr('x1', x1)
		.attr('y1', y1)
		.attr('x2', x2)
		.attr('y2', y2);

		d3.select('svg')
		.selectAll('circle')
		.data(branches)
		.transition()
		.attr('cx',x2)
		.attr('cy',y2)
		.attr("r", function(d) {
			var value = Math.random()*rMult;
			return Math.sqrt(value);
		})
		.style("fill","black")
		.style('stroke',"#d3d3d3")
		.style('stroke-width',2)
		.style('fill-opacity',0.25)
		//.on("mouseover", function(){d3.select(this).style("fill", "blue");});
		// .on("mouseover", function(){d3.select(this).attr("r",100).
		// 	style("fill", "cyan")});
 		// .on("mouseover",function(){rMult = 1000})
		// .on("mouseout", function(){d3.select(this).attr("r",function(d) {
		// 	var value = Math.random()*rMult;
		// 	return Math.sqrt(value);
		// })})
 		// .on("mouseover",highlightCircles)
 		// .on("mouseout", unhighlightCircles);


 // var svg = d3.select("body").append("svg:svg")
 // .attr("width", w)
 // .attr("height", h)
 // .style("pointer-events", "all")
 // .on("mousemove", particle);


}

//var radarAnimationID = setInterval(animateRadarFrame,1000/FRAMERATE);
var timer = setInterval(function(){
	//radar position 
	//animateRadarFrameD3();

	// var svg = d3.select("body").append("svg:svg")
 //    .attr("width", w)
 //    .attr("height", h)
 //    .style("pointer-events", "all")
 //    .on("mousemove", particle);

 t += dt;  
 //console.log(t);
 //console.log(currentMousePos.x+" "+currentMousePos.y);
 d3.select('svg')
 .selectAll('circle')
 .data(branches)
 .transition()
 //added time on the transition
 .duration(dt)
 .attr('cx',x2)
 .attr('cy',y2)
 .attr("r", function(d) {
 	var value = Math.random()*rMult;
 	return Math.sqrt(value);
 })
 .style("fill","black")
 .style('stroke',"#d3d3d3")
 .style('stroke-width',2)
 .style('fill-opacity',0.25)
	// 	.on("mouseover", function(){d3.select(this).attr("r",100)})
	// .on("mouseout", function(){d3.select(this).attr("r",function(d) {
	// 	var value = Math.random()*rMult;
	// 	return Math.sqrt(value);
	// })})

}, dt);

function particle() {
	var m = d3.svg.mouse(this);

	svg.append("svg:ellipse")
	.attr("cx", m[0])
	.attr("cy", m[1])
	.attr("rx", 1e-6)
	.attr("ry", 1e-6)
	.style("stroke", z(++i))
	.style("stroke-opacity", 1)
	.transition()
	.duration(20000)
	.ease(Math.sqrt)
	.attr("rx", 100)
	.attr("ry", 100)
	.style("stroke-opacity", 1e-6)
	.remove();
}

d3.selectAll('.regenerate')
.on('click', regenerate);

regenerate(true);
});
