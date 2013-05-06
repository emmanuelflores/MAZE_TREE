// Tree configuration
//version without sound
var branches = [];

var w = 1024;
var h = 800;

var centre = { x: (w/2.0), y: (h/2.0) }

var startAngle;
var seed;
var pointOnEdge;

var da = 0.; // Angle delta
var dl = 0.87; // Length delta (factor)
var ar = 2.; // Randomness
var maxDepth = 5;
var branchLength = 200;

var branchWidth = "1.5px";//1
var branchColor = "#ff8da1"

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


var dt = 165;//time interval 
var t = dt;//timer

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
function highlightParents(d) {
	var colour = d3.event.type === 'mouseover' ? 'green' : branchColor;
	var depth = d.d;
	for(var i = 0; i <= depth; i++) {
		d3.select('#id-'+parseInt(d.i)).style('stroke', colour);
		d = branches[d.parent];
	}	
}

function create() {
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
		.on('mouseout', highlightParents);


	d3.select('svg')
		.selectAll('circle')
		.data(branches)
		.enter()
		.append('circle')
		.attr('cx',x1)
		.attr('cy',y1)
		.attr("r", function(d) {
			var value = Math.random()*70;
  			return Math.sqrt(value);
			})
		.style("fill","black")
		.style('stroke',"#d3d3d3")
		.style('stroke-width',2)
		.style('fill-opacity',0.25)
		//.attr('id', function(d) {return 'id-'+d.i;});
}

// function update() {
// 	d3.select('svg')
// 		.selectAll('line')
// 		.data(branches)
// 		.transition()
// 		.attr('x1', x1)
// 		.attr('y1', y1)
// 		.attr('x2', x2)
// 		.attr('y2', y2);

// 	d3.select('svg')
// 		.selectAll('circle')
// 		.data(branches)
// 		.transition()
// 		.attr('cx',x1)
// 		.attr('cy',y1)
// 		.attr("r", function(d) {
// 			var value = Math.random()*70;
//   			return Math.sqrt(value);
// 			})
// 		.style("fill","black")
// 		.style('stroke',"#d3d3d3")
// 		.style('stroke-width',2)
// 		.style('fill-opacity',0.25)


// }


var timer = setInterval(function(){
   	t += dt;  
   	//console.log(t);
   	d3.select('svg')
		.selectAll('circle')
		.data(branches)
		.transition()
		.attr('cx',x1)
		.attr('cy',y1)
		.attr("r", function(d) {
			var value = Math.random()*50;
  			return Math.sqrt(value);
			})
		.style("fill","black")
		.style('stroke',"#d3d3d3")
		.style('stroke-width',2)
		.style('fill-opacity',0.25)
}, dt);

d3.selectAll('.regenerate')
	.on('click', regenerate);

regenerate(true);
