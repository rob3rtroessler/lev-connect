
/* * * * * * * * * * * * * * * * * *
*                                  *
*          PROFILE VIEW            *
*                                  *
* * * * * * * * * * * * * * * * *  */

/* * * * * * * * * * * * * * * * * *
*          STUDENT LIST            *
* * * * * * * * * * * * * * * * *  */

// HiTS - responsive scrolling currently disabled
//enableScrolling('studentList');

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
//enableScrolling('profile');

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

/* mouse over student list item */
function mouseoverStudentListItem(id) {
    // when hovering, remove active class from all items and add to hovered one
    $('.student-list-item').removeClass('student-list-item-active');
    // $('#' + currentlySelectedProfileId).addClass('student-list-item-active');
    $('#' + id).addClass('student-list-item-active');
}

/* mouse out student list item */
function mouseoutStudentListItem() {
    // when hovering, remove active class from all items and add to previously selected one
    $('.student-list-item').removeClass('student-list-item-active');
    $('#' + currentlySelectedProfileId).addClass('student-list-item-active');
}

/* mouse click student list item */
function clickStudentListItem(id) {

    // change currently selected
    // console.log('idcheck', id);
    currentlySelectedProfileId = id;

    // get profile data
    let data = dataByIdObj[id];

    console.log('hello, here', data);
    /* fill according html elements */


    // name
    $('#profile_nameField').html(data.name);

    // picture
    $('#pictureID').attr('src', 'img/' + data.pictureID + '.jpg');

    // email
    $('#contactViaEmail').attr('href', 'mailto:' + data.email);

    // cv
    $('#downloadCV').attr('href', data.cv);

    // ACADEMIC PATHWAYS
    $('#profile_concentrations').html(data.concentrations);
    $('#profile_research').html(data.research);
    $('#profile_otherPathways').html(data.otherPathways);
    $('#profile_academicExplanation').html(data.academicExplanation);

    // WORK & GRAD SCHOOL
    $('#profile_work').html(data.work);
    $('#profile_workExp').html(data.workExp);
    $('#profile_gradSchool').html(data.gradSchool);
    $('#profile_gradSchoolExp').html(data.gradSchoolExp);

    // TRAVEL & LANGUAGES
    $('#profile_countries').html(data.countries);
    $('#profile_countriesExp').html(data.countriesExp);
    $('#profile_languages').html(data.languages);
    $('#profile_languagesExp').html(data.languagesExp);

    // travel
    if(data.europe !== 'none'){ $('#profile_travelEuropeField').html(data.europe); }
}