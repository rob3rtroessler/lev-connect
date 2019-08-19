/* * * * * * * * * * * * * * * * * *
*                                  *
*         SUNBURST VIEW            *
*                                  *
* * * * * * * * * * * * * * * * *  */

let breadcrumb = $('#breadcrumbs'),
    breadcrumbWidth = breadcrumb.width(),
    breacrumHeight = breadcrumb.height();

let breadcrumbDIV = d3.select('#breadcrumbs').append('svg')
    .attr("width", breadcrumbWidth)
    .attr("height", breacrumHeight);


let ancestorArray = [];

function buildAncestors (data) {

    // first, reset ancestorArray;
    ancestorArray = [];

    // then check whether we need to build ancestor array at all
    if (data.depth >= 1) {
        getAncestor(data);
    }
}

function getAncestor(data) {

    // first push data into array
    let tmpObj = {name : data.data.name, depth: data.depth, color: data.data.color};
    ancestorArray.push(tmpObj);

    // check
    if (data.depth > 1){
        // get parent
        getAncestor(data.parent);
    }
    console.log(ancestorArray);
}



function drawBreadcrumbs() {

    console.log('fired', ancestorArray);

    let data = ancestorArray;


    breadcrumbDIV.selectAll('.path')
        .data(data)
        .enter()
        .append('path')
        .attr('class', 'breadcrumb')
        .attr('x', 20)
        .attr('y', function(d){return (d.depth) * 50})
        .attr('height', 30)
        .attr('width', 100)
        .attr('fill', function(d){return d.color})
        .text('text', function(d){return d.name})
        .transition()
}


function initializeBreadcrumbTrail() {
    // Add the svg area.
    var trail = d3.select("#sequence").append("svg:svg")
        .attr("width", width)
        .attr("height", 50)
        .attr("id", "trail");
    // Add the label at the end, for the percentage.
    trail.append("svg:text")
        .attr("id", "endlabel")
        .style("fill", "#000");
}

// Generate a string that describes the points of a breadcrumb polygon.
function breadcrumbPoints(d, i) {
    var points = [];
    points.push("0,0");
    points.push(b.w + ",0");
    points.push(b.w + b.t + "," + (b.h / 2));
    points.push(b.w + "," + b.h);
    points.push("0," + b.h);
    if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
        points.push(b.t + "," + (b.h / 2));
    }
    return points.join(" ");
}

// Update the breadcrumb trail to show the current sequence and percentage.
function updateBreadcrumbs(nodeArray, percentageString) {

    // Data join; key function combines name and depth (= position in sequence).
    var g = d3.select("#trail")
        .selectAll("g")
        .data(nodeArray, function(d) { return d.name + d.depth; });

    // Add breadcrumb and label for entering nodes.
    var entering = g.enter().append("svg:g");

    entering.append("svg:polygon")
        .attr("points", breadcrumbPoints)
        .style("fill", function(d) { return colors(d.name); });

    entering.append("svg:text")
        .attr("x", (b.w + b.t) / 2)
        .attr("y", b.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(function(d) { return d.name; });

    // Set position for entering and updating nodes.
    g.attr("transform", function(d, i) {
        return "translate(" + i * (b.w + b.s) + ", 0)";
    });

    // Remove exiting nodes.
    g.exit().remove();

    // Now move and update the percentage at the end.
    d3.select("#trail").select("#endlabel")
        .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
        .attr("y", b.h / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text(percentageString);

    // Make the breadcrumb trail visible, if it's hidden.
    d3.select("#trail")
        .style("visibility", "");

}