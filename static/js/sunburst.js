
/* * * * * * * * * * * * * * * * * *
*                                  *
*         SUNBURST VIEW            *
*                                  *
* * * * * * * * * * * * * * * * *  */

let allArcs;

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
    .attr("height", height);

// implement a background that hides accordion-tabs that were not selected/locked
let background = svg.append('g')
    .attr('class', 'testClass')
    .append('rect')
    .attr("width", width)
    .attr("height", height)
    .attr("fill", 'white')
    .on('mouseover', function(){
        setTimeout(function(){
            hideAccordionTabs();
        }, 200);
    });

let sunburst = svg.append("g")
    .attr("transform", "translate(" + width / 2 + "," + (height / 2) + ")");


function drawSunburst(data) {

    let root = d3.hierarchy(data);
    root.sum(function(d) { return d.size; });

    // create arcTiles
    allArcs = sunburst.selectAll("path")
        .data(partition(root).descendants())
        .enter().append("path")
        .attr("d", arc)
        .attr('id', function(d){
            if(d.data.color === 'white'){
                return 'select'
            } else {
                return getSunburstIdByHierarchy(d.data.color);
            }
        })
        .attr("class", "arcTile")
        .attr("stroke", "#494949")
        .style("fill", function(d) { return colorFilter(d.data.color) })

        // on click, fire click function!
        .on("click", function(d){

            console.log('in clicked');

            // first, update accordionTracker
            if (d.data.color === 'white'){
                console.log('resetting accordionTracker');
                accordionTracker = '';
            } else {
                accordionTracker = 'sb__' + d.data.color;
            }

            buildAncestors(d)
                .then(updateBreadcrumbs(ancestorObj)); // ancestorObj is a global variable/object

            // then update lastClickedObject based on the tile that we hovered last and that we store in ancestorObj
            lastClickedObject = ancestorObj;

            // if click event is fired for an arc tile on the highest level
            if (d.data.status === 'final'){
                // switch to the profile view and show the correct students
                profileView(d.data.tutorIDs);
            }

            // click - update sunburst data;
            click(d)
        })
        .on('mouseover', function(d){

            // first, update breadcrumbs, i.e. 1) gather data, 2) build array, and 3) update breadcrumbs;
            buildAncestors(d)
                .then(updateBreadcrumbs(ancestorObj)); // ancestorObj is a global variable/object

            // then, update accordion, i.e. 1) trigger, 2) grab inner drop downs
            triggerAccordion(d.data.color);
            $(getAccordionIdByHierarchy(d.data.color) + ' .text').css('color', colorFilter(d.data.color)); // just first two levels!!
            triggerAccordionInner(getAccordionIdByHierarchy(d.data.color), d.data.name, colorFilter(d.data.color));
        })
        .on('mouseout', function(d){

            // reset breadcrumbs on mouseout according to selection
            updateBreadcrumbs(lastClickedObject);

            //restore default text, text color, and border-color
            $(getAccordionIdByHierarchy(d.data.color)).dropdown('restore default text');
            $(getAccordionIdByHierarchy(d.data.color) + ' .text').css('color', 'rgba(191, 191, 191, 0.87)');
            $(getAccordionIdByHierarchy(d.data.color)).css('border-color', 'rgba(0, 0, 0, 0.1)');

        })
        .append("title")
        .text(function(d) { return d.data.name + "\n" + formatNumber(d.value); });

}


function click(d) {
    sunburst.transition()
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
    createStudentList(data);
    toProfile();
}

function getSunburstIdByHierarchy (hierarchy) {
    return 'sb__' + hierarchy;
}