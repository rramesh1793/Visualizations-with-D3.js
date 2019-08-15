
// Defining the dimensions of the visualization. 
var margin  = {top: 10, right: 5, bottom: 10, left: 100},
    width   = 1400-margin.left-margin.right,
    height  = 900-margin.top-margin.bottom;   

// Creating an SVG container to hold the visualization. 
//Only need to specify the dimensions for this container.
var svg = d3.select("body").append("svg")
  .attr("width",width)
  .attr("height",height);

//create the tooltip that holds the country name
var tooltip = d3.select('body').append('div') .attr("class","tooltip")
      .style({
        'background' : 'orangered',
        'color':'white',
        'width':"90px",
        });

d3.json("https://api.myjson.com/bins/uuf1g",function(data){   // https://api.myjson.com/bins/uuf1g - json file containing country nodes and respective targets
  
// Extract the nodes and links from the data.
  var nodes = data["nodes"];
  var links = data["links"];
  // Creating a force layout object and defining its properties that include the dimensions 
  //of the visualization and the arrays of nodes and links.
  var force = d3.layout.force()
    .size([width,height])
    .nodes(d3.values(nodes))
    .links(links)
    .on("tick",tick)

// LinkDistance parameter defines the distance (normally in pixels) that we'd like to have between
// nodes that are connected. (Ideally the length we'd like our links to have.)
    .linkDistance(300)
    
    .start();
  
// Adding the nodes and links to the visualization.
// SVG relies on the order of the elements in the markup. 
// By adding the nodes _after_ the links we ensure that nodes appear on top of links.

// Links are just SVG lines 
  var link = svg.selectAll('.link')
    .data(links)
    .enter().append('line')
    .attr("class","link");
  
  // Each node is drawn as a flag.
  var node = d3.select('#flags').selectAll('img')
    .data(force.nodes())
    .enter().append('img')

  //Respective flag of each country from the image is returned
    .attr('class', function (d) { return 'flag flag-' + d.code; })
  // Some classes to handle the mouse handling
    .on('mouseover', mouseoverHandler)
    .on("mousemove",mouseMoving)
    .on("mouseout", mouseoutHandler);
  
  //Defining a function that we want the layout to call
  // once the calculations of force layout are done.
  function tick(e){
    
    // To reposition the node, appropriate SVG attributes 
    // are set to their new values. 
     node.style('left', function (d) { return d.x + 'px'; })
         .style('top', function (d) { return d.y + 'px'; })
         .call(force.drag);
    
    // Updating positions of the links.
    link.attr('x1', function(d){ return  d.source.x})
        .attr('y1',function(d){ return  d.source.y})
        .attr('x2', function(d){ return  d.target.x})
        .attr('y2',function(d){ return   d.target.y})
  }
  
  //hover over a flag
  //the tooltip with the name of the country is going to show up
  function mouseoverHandler (d) {
     tooltip.transition().style('opacity', .9)
     tooltip.html('<p>' + d["country"] + '</p>' );
  }
  //leaving a flag
  //the tooltip will disappear
  function mouseoutHandler (d) {
      tooltip.transition().style('opacity', 0);
  }

  function mouseMoving (d) {
      tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px").style("color","white");
  }
})