/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//1 -- BAR CHART CREATION USING GIVEN DATA SET
//      Use first code of index.html
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

var svgWidth = 500, svgHeight = 300, barPadding = 5; //ht and wt
var barWidth = (svgWidth / dataset.length); //each bar wt

var svg = d3.select('svg')     //give attr of wt and ht
.attr("width", svgWidth)
.attr("height", svgHeight);

var barChart = svg.selectAll("rect") //create bar chart with rect
    .data(dataset) //provide dataset
    .enter() //takes data from waiting state and performs operation
    .append("rect") 
    .attr("y", function(d) {
        return svgHeight - d
    })
    .attr("height", function(d) {
        return d;
    })
    .attr("width", barWidth - barPadding)
    .attr("class", "bar")
    .attr("transform", function (d, i) {
        var translate = [barWidth * i, 0];  //[x axis, y axis]
        return "translate("+ translate +")";   //translate one bar after another
    });
    //using text element for labels 
    var text = svg.selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function(d) {
        return d;
    })
    .attr("y", function(d, i) {
        return svgHeight - d - 2;  //subtract 2 pixels for text to be displayed slightly higher than the bar 
        })
    .attr("x", function(d, i) {
        return barWidth * i;
    })
    .attr("fill", "#A64C38");


*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//2 -- BAR CHART CREATION USING GIVEN DATA SET WITH THE OPTION OF SCALING WHEN THE VALUES OF DATA SET ARE TOO SMALL/BIG - FOR BETTER VISUALIZATION
//                  USE first code of index.html
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
//var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
var dataset = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

var svgWidth = 500, svgHeight = 300, barPadding = 5;
var barWidth = (svgWidth / dataset.length);


var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);
    
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset)]) //TAKES ARRAY AS ARGUMENT. First one is 0 and another one is the maximum number in our data set.
    .range([0, svgHeight]); //keeps the scale values inside the range of our SVG container. args - 0 and height of svg container
        
var barChart = svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y", function(d) {
         return svgHeight - yScale(d) 
    })
    .attr("height", function(d) { 
        return yScale(d); 
    })
    .attr("width", barWidth - barPadding)
    .attr("transform", function (d, i) {
        var translate = [barWidth * i, 0]; 
        return "translate("+ translate +")";
    });

*/
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//3 -- CREATING AXES
//    Use second code of index.html
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



var data= [80, 100, 56, 120, 180, 30, 40, 120, 160];

var svgWidth = 500, svgHeight = 300;

var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var xScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, svgWidth]);
          
var yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([svgHeight, 0]);
     
var x_axis = d3.axisBottom()
    .scale(xScale);

var y_axis = d3.axisLeft()
    .scale(yScale);
         
svg.append("g")
    .attr("transform", "translate(50, 10)")
    .call(y_axis);
         
var xAxisTranslate = svgHeight - 20;
         
svg.append("g")
    .attr("transform", "translate(50, " + xAxisTranslate  +")")
    .call(x_axis);


 