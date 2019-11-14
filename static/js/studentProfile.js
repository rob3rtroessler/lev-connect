
/* * * * * * * * * * * * * * * * * *
*                                  *
*          PROFILE VIEW            *
*                                  *
* * * * * * * * * * * * * * * * *  */




/* * * * * * * * * * * * * * * * * *
*        GLOBAL VARIABLES          *
* * * * * * * * * * * * * * * * *  */

let currentlySelectedProfileId = '';



/* * * * * * * * * * * * * * * * * *
*        HELPER FUNCTIONS          *
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
    currentlySelectedProfileId = id;

    // get profile data
    let data = dataByIdObj[id];

    // log
    // console.log(`data for student with id=${id}`, data);


    /* * * * * * * * * * * * * * * * * *
    *   fill according html elements   *
    * * * * * * * * * * * * * * * * * */

    // name
    $('#profile_nameField').html(data.name);

    // picture
    $('#pictureID').attr('src', 'img/' + data.pictureID + '.jpg');

    // email
    $('#contactViaEmail').attr('href', 'mailto:' + data.email + `?subject=RSVP%20for%20New%20Years%20Eve%20Party%20&body=Hi%20Bob,%0d%0dI%20would%20like%20to%20RSVP%20to%20your%20party%20invitation.%20Here%20are%20my%20details:%0d%0dName:%20Eryka%20Adams%0dNumber%20of%20Guest:%0d`);

    // cv
    $('#downloadCV').attr('href', 'data/CVs/CV_id_' + data.cvID + '.pdf');
        //);

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

    // ADDITIONAL INFO
    $('#profile_additionalInfo').html(data.additionalInfo);


    // array of fields that can potentially be filled out as 'none'
    let potentialNones = ['work', 'workExp', 'gradSchool', 'gradSchoolExp', 'countries', 'countriesExp', 'languages', 'languagesExp', 'additionalInfo'];

    // hiding none-cases
    potentialNones.forEach(function (field) {

        // special 'hiding' for languages and countries
        if ( (data[field] === 'none' || data[field] === '' || data[field] === ';') && (field === 'languages' || field === 'countries')){
            $('#profile_' + field).parent().parent().hide();
        }
        // hiding
        else if (data[field] === 'none' || data[field] === 'None' || data[field] === 'no' || data[field] === '' || data[field] === ';'){
            $('#profile_' + field).parent().hide();
        }
        else {
            $('#profile_' + field).parent().show();
            $('#profile_' + field).parent().parent().show();
        }
    })
}