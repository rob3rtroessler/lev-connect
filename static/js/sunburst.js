console.log('sunburst is running');

let sunburstDIV = $('#sunburstDIV'),
    width = sunburstDIV.width(),
    height = sunburstDIV.height(),
    radius = (Math.min(width, height) / 2) - 10;

let formatNumber = d3.format(",d");

let x = d3.scaleLinear()
    .range([0, 2 * Math.PI]);

let y = d3.scaleSqrt()
    .range([0, radius]);

// let color = d3.scaleOrdinal(d3.schemeCategory20);

let partition = d3.partition();

// define the path, i.e. the partition
let arc = d3.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y0)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y1)); });


let svg = d3.select("#sunburstDIV").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");

d3.json("data/data.json").then(function(root) {
    root = d3.hierarchy(root);

    console.log('root', root);

    root.sum(function(d) { return d.size; });

    console.log(partition(root).descendants()) ;

    // create
    svg.selectAll("path")
        .data(partition(root).descendants())
        .enter().append("path")
        .attr("d", arc)
        .attr("class", "arcTile" )
        .attr("stroke", "#494949")
        .style("fill", function(d) {
            console.log(d);
            return d.data.color
            // return color((d.children ? d : d.parent).data.name);
        })
        .on("click", function(d){
            console.log(d);
            if(d.data.final === true){
                console.log('true')
            }
            click(d)
        })
        .append("title")
        .text(function(d) { return d.data.name + "\n" + formatNumber(d.value); });
});

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
        .attrTween("d", function(d) { return function() { return arc(d); }; });
}

d3.select(self.frameElement).style("height", height + "px");