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
    $('#carousel').carousel(1);
    $('#exitBox').show();

    $('.ui.dropdown').dropdown({
        "clearable": true
    });
}
function toSunburst(){
    $('#carousel').carousel(0);
    $('#exitBox').hide();

    // TODO: RESET SUNBURST
}
function toAcc(name){

    // classifier - would be nice if I could just send a classifier like 1.2.1


    // lookup
    $('#' + name).collapse('toggle');
}
function identifyClassifier(){

}


$("#headingOne").click(
  function(){testfunc()}
);

function testfunc(){
    console.log('running');

    let test = d3.select("white");
    console.log(test);
    test.dispatch('click');

    function run () {

    }
}


















