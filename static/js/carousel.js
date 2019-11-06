
/* * * * * * * * * * * * * * * * * *
*                                  *
*            CAROUSEL              *
*                                  *
* * * * * * * * * * * * * * * * *  */

// config
$('.carousel').carousel({
    interval: false
});


/* * * * * * * * * * * * * * * * * *
*         HELPER FUNCTIONS         *
* * * * * * * * * * * * * * * * *  */

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
