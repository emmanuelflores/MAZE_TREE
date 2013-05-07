
// //Width and height
// var w = 500;
// var h = 50;

// //Data
// var dataset = [ 5, 10, 15, 20, 25 ];

// 			//Create SVG element
// 			var svg = d3.select("body")
// 			.append("svg")
// 			.attr("width", w)
// 			.attr("height", h);

// 			var circles = svg.selectAll("circle")
// 			.data(dataset)
// 			.enter()
// 			.append("circle");

// 			circles.attr("cx", function(d, i) {
// 				return (i * 50) + 25;
// 			})
// 			.attr("cy", h/2)
// 			.attr("r", function(d) {
// 				return d;
// 			});



var w = 500;
var h = 700;
var barPadding = 1;

var dataset = [5,10,15,20,25];
var datasetChar = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

var datasetPlot = [
[ 5,     20 ],
[ 480,   90 ],
[ 250,   50 ],
[ 100,   33 ],
[ 330,   95 ],
[ 410,   12 ],
[ 475,   44 ],
[ 25,    67 ],
[ 85,    21 ],
[ 220,   88 ]
];


//understanding the methods
pdata = [10,12,6,8,15];

selectDiv = d3.select("#example1");
selectDiv.selectAll("p")
.data(pdata)
.enter()
.append("p")
.text(function(d){
	return d;
})

selectDiv2 = d3.select("#example2");
selectDiv2.selectAll("p")
.data(pdata)
.enter()
.append("p")
.text(function(d){
	return d;
})

//circles

var svg = d3.select("body")
.append("svg")
.attr("width",w)
.attr("height",h);

var circles = svg.selectAll("circle")
.data(dataset)
.enter()
.append("circle");

circles.attr("cx", function(d,i){
	return (i*50)+25;
})
.attr("cy",h/2)
.attr("r",function(d){
	return d;
})
.attr("fill","yellow")
.attr("stroke","orange")
.attr("stroke-width",function(d){
	return d/2;
});

svg.selectAll("rect")
.data(datasetChar)
.enter()
.append("rect")
.attr("x", function(d,i){
	return i * (w / datasetChar.length);
})
.attr("y", 0)
.attr("width", w / datasetChar.length - barPadding)
.attr("height", function(d){
	return d;
})
.attr("fill", "teal");

d3.select("body").selectAll("div")
.data(dataset)
.enter()
.append("div")
.attr("class", "bar")
.style("height", function(d) {
	var barHeight = d * 5;
	return barHeight + "px";
});


//PLOTING

var dataset = [
[5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
[410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
];

			//Create SVG element
			var svg = d3.select("body")
			.append("svg")
			.attr("width", w)
			.attr("height", h);

			svg.selectAll("circle")
			.data(datasetPlot)
			.enter()
			.append("circle")
			.attr("cx", function(d) {
				return d[0];
			})
			.attr("cy", function(d) {
				return d[1];
			})
			.attr("r", function(d) {
				return Math.sqrt(h - d[1]);
			});

			svg.selectAll("text")
			.data(dataset)
			.enter()
			.append("text")
			.text(function(d) {
				return d[0] + "," + d[1];
			})
			.attr("x", function(d) {
				return d[0];
			})
			.attr("y", function(d) {
				return d[1];
			})
			.attr("font-family", "sans-serif")
			.attr("font-size", "11px")
			.attr("fill", "red");
			
