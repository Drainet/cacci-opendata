var filelist = ["2012-1.csv", "2012-10.csv", "2012-11.csv", "2012-12.csv", "2012-2.csv", "2012-3.csv", "2012-4.csv", "2012-5.csv", "2012-6.csv", "2012-7.csv","2012-8.csv", "2012-9.csv", "2013-1.csv", "2013-10.csv", "2013-11.csv", "2013-12.csv", "2013-2.csv", "2013-3.csv", "2013-4.csv", "2013-5.csv", "2013-6.csv", "2013-7.csv", "2013-8.csv ", "2013-9.csv", "2014-1.csv", "2014-10.csv", "2014-11.csv", "2014-12.csv", "2014-2.csv", "2014-3.csv", "2014-4.csv", "2014-5.csv", "2014-6.csv", "2014-7.csv", "2014-8.csv", "2014-9.csv", "2015-1.csv", "2015-2.csv", "2015-3.csv", "2015-4.csv"];
var barChartData, BCArray = [];



var a, bc;
function fuck(){
	a = makeDataObject();
	bc = makeBarChart(a, 200, 100, "barChart");

}

function up(){
	updateDataObject(a);
	updateBarChart(bc, a);
}

function barChartObject(data, width, height, name){
	this.width = width;
	this.height = height;
	this.name = name;
	this.xdom = data.map(function(d){ return d.X });
	this.ydom = [0, d3.max(data, function(d){ return d.Y })];
	this.x = ordinal([0 ,width], this.xdom);
	this.y = linear([height, 0], this.ydom);
	this.xAxis = AxisMake(this.x, "bottom");
	this.yAxis = AxisMake(this.y, "left").ticks(3);
	this.barChart = selectPosition(name, width, height);
	this.update = barChartObject;

}

// category for test.js
function makeDataObject(){
	var obj = [];
	var x = (Math.random() * 11 + 1).toFixed();
	for( var i=1; i <= x ; i++ ){
		var y = (Math.random() * 100).toFixed();
		obj.push({"X": i, "Y": y });
	}

	return obj;
}

function updateDataObject(obj){
	for( var i=0; i < obj.length ; i++ ){
		obj[i].Y = (Math.random() * 100).toFixed();
	}
}

function changeBarChart(){
	var range = barChartData.index;

	for( var i = 0 ; i < range.length ; i++ ){
		var year = range[i];
		var data = getBoundPoints.call(barChartData, year);
		data.sort(function(a, b){ return a.X-b.X });
		updateBarChart(BCArray[i], data);
	}
}

//data -> x and y axis range;
//x: month 1-12
//y: events' sum of each month.
function makeBarChart(data, width, height, name){
	var margin = {top: 20, right: 20, bottom: 30, left: 40},
    	BCwidth = width - margin.left - margin.right,
    	BCheight = height - margin.top - margin.bottom;

	var BC = new barChartObject(data, width, height, name);
	var barChart = BC.barChart;

	barChart.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(BC.xAxis);

	barChart.append("g")
		.attr("class", "y axis")
		.call(BC.yAxis);

	barChart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return BC.x(d.X); })
      .attr("width", BC.x.rangeBand())
      .attr("y", function(d) { return BC.y(d.Y); })
      .attr("height", function(d) { return height - BC.y(d.Y); });

    return BC;
}

function updateBarChart(BC ,data){
	BC.update(data, BC.width, BC.height, BC.name);
	var barChart = BC.barChart;

	barChart.select(".x.axis")
		.transition()
		.duration(750)
		.call(BC.xAxis);

	barChart.select(".y.axis")
		.transition()
		.duration(750)
		.call(BC.yAxis);

	barChart.selectAll(".bar")
		.data(data)
		.transition()
		.attr("y", function(d) { return BC.y(d.Y); })
		.attr("height", function(d) { return BC.height - BC.y(d.Y); });
}

function ordinal(range, domain){
	return d3.scale.ordinal().rangeRoundBands( range, .1 ).domain( domain );
}

function linear(range, domain){
	return d3.scale.linear().range( range ).domain( domain );
}

function AxisMake(scale, position){
	return d3.svg.axis().scale( scale ).orient( position );
}

function singleYearData(year){
	var month = [];
	year = isNaN(year) ? year : 'y' + year;
	data[year].index.forEach.call(data[year], 
		function(m) {
			month = month.concat(this[m])
		});
	return month;
}

function selectPosition(name, width, height){
	var position = d3.select(".chart").select("." + name);
	if(position[0][0] == null){
		return d3.select("body").append("svg")
					.attr("class", name)
					.attr("width", width + "px")
					.attr("height", height + "px");
	}
	return position;
}

function type(data){
	data.X = +data.X;
	data.Y = +data.Y;
	return data;
}
