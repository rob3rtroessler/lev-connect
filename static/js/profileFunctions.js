
/* * * * * * * * * * * * * * * * * *
*                                  *
*          PROFILE VIEW            *
*                                  *
* * * * * * * * * * * * * * * * *  */



/* * * * * * * * * * * * * * * * * *
*          STUDENT LIST            *
* * * * * * * * * * * * * * * * *  */

// HiTS - responsive scrolling currently disabled
enableScrolling('studentList');

/*

let studentListDiv = $('#studentList');

// make div scrollable
studentListDiv.on('mouseover', function(){
    enableScrolling('studentList')
});

// hide scrollbar
studentListDiv.on('mouseout', function(){
    removeScrolling ('studentList')
});

*/

$('.student-list-item').on('mouseover', function(){
    // make all passive
    $('.student-list-item').removeClass('student-list-item-active');
    $(this).addClass('student-list-item-active');

});


/* * * * * * * * * * * * * * * * * *
*             PROFILE              *
* * * * * * * * * * * * * * * * *  */

// PROFILE - responsive scrolling currently disabled
enableScrolling('profile');

/*

let profileDiv = $('#profile');

// make div scrollable
profileDiv.on('mouseover', function(){
    enableScrolling('profile')
});

// hide scrollbar
profileDiv.on('mouseout', function(){
    removeScrolling ('profile')
});

*/



/* * * * * * * * * * * * * * * * * *
*                                  *
*        GLOBAL VARIABLES          *
*                                  *
* * * * * * * * * * * * * * * * *  */

let currentlySelectedProfileId = '';

/* * * * * * * * * * * * * * * * * *
*                                  *
*        HELPER FUNCTIONS          *
*                                  *
* * * * * * * * * * * * * * * * *  */

function enableScrolling (id){
    $('#' + id).addClass('scrollable')
}
function removeScrolling (id){
    $('#' + id).removeClass('scrollable')
}
function hoveredListItem () {

}

function mouseoverStudentListItem(id) {

    // get profile data
    let data = dataByIdObj[id];


    console.log('fired', id, data);

    // fill according html elements
    $('#profile_nameField').html(data.name);
}

function clickStudentListItem(id) {
    currentlySelectedProfileId = id;
}