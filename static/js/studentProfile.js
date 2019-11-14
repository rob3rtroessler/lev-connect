
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
    $('#contactViaEmail').attr('href', 'mailto:' + data.email + `
    ?subject=Lev-Connect%3A%20Request%20to%20meet&body=Dear%20%5Bname%20of%20person%5D%2C%0A%0AI%20am%20a%20%5Bsophomore%2F%20junior%2F%20senior%5D%20at%20Leverett%20House.%20I%20found%20your%20contact%20information%20via%20LevConnect.%20In%20your%20profile%2C%20I%20saw%20that%20you%20were%20willing%20to%20talk%20to%20students%20about%20%5Binsert%20the%20relevant%20expertise%20of%20the%20person%20here%5D.%20I%20am%20really%20interested%20in%20learning%20more%20about%20this%2C%20in%20particular%3A%20%5Bbriefly%20list%20one%20or%20two%20key%20questions%20on%20your%20mind%20here%5D.%20%0A%0AIt%20would%20be%20wonderful%20if%20we%20could%20find%20a%20time%20and%20venue%20convenient%20for%20you.%20Some%20options%20include%20the%20following%3A%0A%5Boptions%5D%3A%0A%0AIf%20none%20of%20these%20options%20work%20for%20you%2C%20please%20let%20me%20know%20some%20alternative%20times%20and%20I%20am%20sure%20we%20can%20figure%20out%20a%20common%20time%20to%20meet.%20Just%20in%20case%20there%20is%20a%20change%20in%20your%20plans%2C%20you%20may%20find%20it%20useful%20to%20have%20my%20cell%20number%3A%20%5Blist%20your%20cell%20number%20here%5D.%0A%0AI%20look%20forward%20to%20seeing%20you%20soon.%20Thank%20you%20-%20%5BGive%20your%20full%20name%20here%5D
    `);

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