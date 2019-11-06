/* * * * * * * * * * * * * * * * * *
*                                  *
*               MAIN               *
*                                  *
* * * * * * * * * * * * * * * * *  */

let globalTutorData;

function start(data) {

    // INITIATION
    createDataStructure()
        .then( initiateBreadcrumbs() )
        .then( initiateDropdowns() );
}


// INITIATION FUNCTIONS
function initiateDropdowns(){
    // initiate
    $('.ui.dropdown')
        .dropdown()
    ;
}



















