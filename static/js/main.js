/* * * * * * * * * * * * * * * * * *
*                                  *
*               MAIN               *
*                                  *
* * * * * * * * * * * * * * * * *  */

// INITIATION
createDataStructure()
    .then( initiateCarousel() )
    .then( initiateBreadcrumbs() )
    .then( initiateDropdowns() );

// INITIATION FUNCTIONS
function initiateDropdowns(){
    // initiate
    $('.ui.dropdown')
        .dropdown()
    ;
}
function initiateCarousel(){
    // start carousel
    $('.carousel').carousel({
        interval: false
    });

}

// HELPER FUNCTIONS
function toProfile(){
    setTimeout(function(){
        $('#carousel').carousel(1);
        $('#exitBox').show();
    }, 700);

    $('.ui.dropdown').dropdown({
        "clearable": true
    });
}
function toSunburst(){

    // navigate to sunburst view
    $('#carousel').carousel(0);

    // hide exitBox
    $('#exitBox').hide();

    // reset lastClickedObject
    lastClickedObject = {};
    ancestorObj = {};
    updateBreadcrumbs({});

    // with a delay of half a second, reset sunburst
    setTimeout(function(){
        // reset sunburst
        d3.select('#select').dispatch('click');
        hideAccordionTabs();
    }, 500)
}

function toAcc(name){

    // classifier - would be nice if I could just send a classifier like 1.2.1


    // lookup
    $('#' + name).collapse('toggle');
}
function identifyClassifier(){

}






















