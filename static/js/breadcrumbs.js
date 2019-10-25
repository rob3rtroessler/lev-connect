

/* * * * * * * * * * * * * * * * * *
*                                  *
*           BREADCRUMBS            *
*                                  *
* * * * * * * * * * * * * * * * *  */


/* * * * * * * * * * * * * * * * * *
*         ANCESTORS/DATA           *
* * * * * * * * * * * * * * * * *  */

let ancestorArray = [];
let ancestorObj = {};
let lastClickedObject = {};

async function buildAncestors (data) {

    // first, reset ancestorArray;
    ancestorArray = [];
    ancestorObj = {};

    // then check whether we need to build ancestor array at all
    if (data.depth >= 1) {
        getAncestor(data);
    }
}


function getAncestor(data) {

    // first push data into array
    let key = data.depth;
    let tmpObj = {
        name : data.data.name,
        depth: data.depth,
        color: data.data.color
    };

    ancestorArray.push(tmpObj);
    ancestorObj[key] = tmpObj;

    // check
    if (data.depth > 1){
        // get parent
        getAncestor(data.parent);
    }
}


/* * * * * * * * * * * * * * * * * *
*           BREADCRUMBS            *
* * * * * * * * * * * * * * * * *  */

let breadcrumb = $('#breadcrumbs'),
    breadcrumbWidth = breadcrumb.width(),
    breacrumHeight = breadcrumb.height();

let breadcrumbDIV = d3.select('#breadcrumbs').append('svg')
    .attr("width", breadcrumbWidth)
    .attr("height", breacrumHeight);

/* initiate the four breadcrumbs */
function initiateBreadcrumbs (){

    // variables
    let width = $('#breadcrumbs').width(),
        height = $('#breadcrumbs').height();

    // dimensions
    let partitionHeight = height/6,
        partitionWidth = width,
        border = 3;

    /* initialize 'start' breadcrumb */
    breadcrumbDIV.append('polygon')
        .attr('id', 'polygonOne')
        .attr('points', createPointsOne(0, partitionWidth, partitionHeight))
        .attr('stroke', 'black')
        .attr('stroke-width', '0.7px')
        .attr('fill', 'white')
        .attr('opacity', 1)
        .on('mouseover', function(d){d3.select(this).attr('stroke-width', '1.2px').attr('fill','#d8d8d8')})
        .on('mouseout', function(d){d3.select(this).attr('stroke-width', '0.7px').attr('fill','white')})
        .on('click', function(d){d3.select('#select').dispatch('click')});

    breadcrumbDIV.append('text')
        .attr('id', 'polygonOneText')
        .attr('class', 'polygonText')
        .attr("x", partitionWidth/2)
        .attr("y", partitionHeight/2)
        .attr("fill", "#000000")
        .attr("text-anchor", "middle")
        .text('start selecting');

    /* initialize other breadcrumbs */
    createBreadcrumbElement('polygonTwo', partitionHeight+border);
    createBreadcrumbElement('polygonThree', 2*(partitionHeight+border));
    createBreadcrumbElement('polygonFour', 3*(partitionHeight+border));
    createBreadcrumbElement('polygonFive', 4*(partitionHeight+border));

    function createBreadcrumbElement(id, start){

        breadcrumbDIV.append('polygon')
            .attr('id', id)
            .attr('points', createPointsTwo(start, partitionWidth, partitionHeight))
            .attr('stroke', 'black')
            .attr('stroke-width', '0.7px')
            .attr('fill', '#ffffff')
            .attr('opacity', 0);

        breadcrumbDIV.append('text')
            .attr('id', id + 'Text')
            .attr('class', 'polygonText')
            .attr("x", partitionWidth/2)
            .attr("y", partitionHeight/2 + start - border)
            .attr("fill", "#000000")
            .attr("text-anchor", "middle")
            .text('');
    }
}

/* update the four breadcrumbs */
function updateBreadcrumbs (data) {

    updateBreadcrumbElement('polygonTwo', '1');
    updateBreadcrumbElement('polygonThree', '2');
    updateBreadcrumbElement('polygonFour', '3');
    updateBreadcrumbElement('polygonFive', '4');


    function updateBreadcrumbElement(name, number){
        // update 2nd polygon, i.e. first layer
        if(! (number in data) ){
            d3.select('#' + name)
                .attr('opacity',0);
            d3.select('#' + name + 'Text').text(' ')
        }
        else {
            d3.select('#' + name)
                .attr('fill', function(d){
                    return colorFilter(data[number].color)
                })
                .attr('opacity', 1)
                .on('click', function(d){
                    // get color
                    console.log(data[number].color);

                    // dispatch
                    // d3.select('#select').dispatch('click')
                });

            d3.select('#' + name + 'Text')
                .text(function(d){return data[number].name})
        }
    }
}

function createPointsOne(startpos, partitionWidth, partitionHeight){

    let pointsAbstract =
        0 + ',' + startpos + ' ' + // left, top
        0 + ',' + (startpos + partitionHeight/2) + ' ' + // left, bottom
        partitionWidth/2 +',' + (startpos + partitionHeight) + ' ' +
        partitionWidth + ',' + (startpos + partitionHeight/2) + ' ' +
        partitionWidth + ',' + startpos + ' ';

    return pointsAbstract;
}

function createPointsTwo(startpos, partitionWidth, partitionHeight){

    let pointsAbstract =
        0 + ',' + (startpos - partitionHeight/2) + ' ' + // left, top
        0 + ',' + (startpos + partitionHeight/2) + ' ' + // left, bottom
        partitionWidth/2 +',' + (startpos + partitionHeight) + ' ' + // center bottom
        partitionWidth + ',' + (startpos + partitionHeight/2) + ' ' + // right bottom
        partitionWidth + ',' + (startpos - partitionHeight/2) + ' ' + // right top
        partitionWidth/2 +',' + (startpos) + ' '; // center top;

    return pointsAbstract;
}