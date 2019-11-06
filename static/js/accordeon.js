/* * * * * * * * * * * * * * * * * *
*                                  *
*            ACCORDION             *
*                                  *
* * * * * * * * * * * * * * * * *  */

// track current accordion selection
let accordionTracker = '';


// based on the hierarchy of a sunburst element, getIdByHierarchy() returns the id of the according dropdown element
function getAccordionIdByHierarchy (hierarchy){

    // splitting
    let hierarchyArray = hierarchy.split('_');
    let id = '#acc__' + hierarchyArray[0];

    // just grabbing the first two levels of hierarchy
    if(hierarchyArray.length >= 2){
        id += '_' + hierarchyArray[1].charAt(0);
    }
    // console.log(hierarchy, id);
    return id;
}


// triggerAccordionInner changes the text and updates the color of according dropdown elements in the accordion
function triggerAccordionInner (id,text, color) {
    $(id).dropdown('set text', text);
    $(id).css('border', `thin solid ${color}`)
}


//
function triggerAccordion(hierarchy) {

    // logs
    // console.log('triggerAccordion()', 'currently selected:', accordionTracker);

    // store first character/level of hierarchy in variable 'identifier'
    let identifier = hierarchy.charAt(0);

    // collapse tabs accordingly
    if (identifier === '0'){
        $('#collapseOne').collapse('show');
    }
    else if (identifier === '1'){
        $('#collapseTwo').collapse('show');
    }
    else if (identifier === '2'){
        $('#collapseThree').collapse('show');
    }
    else if (identifier === '3'){
        $('#collapseFour').collapse('show');
    }
    // else, if color === 'select', i.e. color === white, collapse all;
    else {
        $('#collapseOne').collapse('hide');
        $('#collapseTwo').collapse('hide');
        $('#collapseThree').collapse('hide');
        $('#collapseFour').collapse('hide');
    }
}


//
function hideAccordionTabs() {

    // logs
    //console.log('hideAccordionTabs()', 'currently selected:', accordionTracker);

    if (accordionTracker === ''){
        $('#collapseOne').collapse('hide');
        $('#collapseTwo').collapse('hide');
        $('#collapseThree').collapse('hide');
        $('#collapseFour').collapse('hide');
    }
}


// triggerSunburst; gets fired when accordion tabs are clicked
function triggerSunburst(id) {

    // logs
    // console.log('triggerSunburst()', id, accordionTracker);

    if (accordionTracker === id){
        console.log('accordionTracker equal id -> reset');
        d3.select('#select').dispatch('click');
        accordionTracker = '';
    }
    else {
        accordionTracker = id;
        d3.select('#' + id).dispatch('click');
    }
}


//
function highlightSunburst(id){
    d3.selectAll('.arcTile').attr('opacity', 1);
}