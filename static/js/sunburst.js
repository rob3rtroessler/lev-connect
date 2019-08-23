
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

    // one possibility is to empty svg at the beginning
    //$("#sunburstDIV").empty();
    svg.selectAll("*").remove();

    console.log(data);
    let root = d3.hierarchy(data);

    //console.log('root', root);

    root.sum(function(d) { return d.size; });

    //console.log(partition(root).descendants()) ;

    //d.depth shows level!
    // this.data.name shows name.
    // this.parent shows parent item

    // create
    svg.selectAll("path")
        .data(partition(root).descendants())
        .enter().append("path")
        .attr("d", arc)
        .attr("class", "arcTile" )
        .attr("stroke", "#494949")
        .style("fill", function(d) {
            //console.log(d);
            return d.data.color
            // return color((d.children ? d : d.parent).data.name);
        })

        // on click, fire click function!
        .on("click", function(d){

            // if on final 'selection' level
            if (d.data.status === 'final'){
                console.log('create student list with the following students:',d.data.id);
                createStudentList (d.data.id);
                currentlySelectedProfileId = selectedStudents[0];
                console.log(selectedStudents[0]);
                // clickStudentListItem();
                toProfile();
            }
            // get depth
            // then
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
            buildAncestors(d);
            drawBreadcrumbs();
        })
        .append("title")
        .text(function(d) { return d.data.name + "\n" + formatNumber(d.value); });

}


function click(d) {
    console.log(d);
    svg.transition()
        .duration(750)
        .tween("scale", function() {
            let xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                yd = d3.interpolate(y.domain(), [d.y0, 1]),
                yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
            return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
        })
        .selectAll("path")
        .attrTween("d", function(d) { return function() { return arc(d); }; });
}

d3.select(self.frameElement).style("height", height + "px");