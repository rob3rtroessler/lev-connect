
/* * * * * * * * * * * * * * * * * *
*                                  *
*         SUNBURST VIEW            *
*                                  *
* * * * * * * * * * * * * * * * *  */


// define dimensions
let sunburstDIV = $('#sunburstDIV'),
    width = sunburstDIV.width(),
    height = sunburstDIV.height(),
    radius = (Math.min(width, height) / 2 - 60);

let formatNumber = d3.format(",d");

let x = d3.scaleLinear()
    .range([0, 2 * Math.PI]);

let y = d3.scaleSqrt()
    .range([0, radius]);

// let color = d3.scaleOrdinal(d3.schemeCategory20);

// prepare sunburst by using d3.partition layout
let partition = d3.partition();

// define the path, i.e. the partition
let arc = d3.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y1)); });


// append svg drawing area with origin in the center
let svg = d3.select("#sunburstDIV").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");




function drawSunburst(data) {

    // TODO: reset sunburst whenever it gets drawn


    console.log(data);
    let root = d3.hierarchy(data);

    root.sum(function(d) { return d.size; });

    // create
    svg.selectAll("path")
        .data(partition(root).descendants())
        .enter().append("path")
        .attr("d", arc)
        .attr('id', function(d){console.log('test', d); return d.data.color})
        .attr("class", "arcTile" )
        .attr("stroke", "#494949")
        .style("fill", function(d) { return colorFilter(d.data.color) })

        // on click, fire click function!
        .on("click", function(d){

            // if on final 'selection' level
            if (d.data.status === 'final'){ profileView(d.data.tutorIDs); }

            // get depth
            if (d.depth !== 0){

                //console.log('name:', d.data.name, "parent's name:", d.parent.data.name);

                // create classifier
                classifier = d.data.name + '.' + d.parent.data.name
            }

            // click - update sunburst data;
            click(d)
        })
        .on('mouseover', function(d){
            // gather data and build array;
            buildAncestors(d)
                .then(updateBreadcrumbs(ancestorObj));
        })
        .on('mouseout', function(d){
            let empty ={};
            updateBreadcrumbs(empty)
        })
        .append("title")
        .text(function(d) { return d.data.name + "\n" + formatNumber(d.value); });
}


function click(d) {
    svg.transition()
        .duration(750)
        .tween("scale", function() {
            let xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                yd = d3.interpolate(y.domain(), [d.y0, 1]),
                yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
            return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
        })
        .selectAll("path")
        .attrTween("d", function(d) { return function() { return arc(d); }; })
        .style('fill', function(d){
            return colorFilter(d.data.color)
        });
}

d3.select(self.frameElement).style("height", height + "px");



function profileView(data){
    console.log('in profileView()', data);
    createStudentList(data);
    toProfile();
}