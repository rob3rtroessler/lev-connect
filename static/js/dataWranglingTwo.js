
/* * * * * * * * * * * * * * * * * *
*                                  *
*        DATA STRUCTURE DB         *
*                                  *
* * * * * * * * * * * * * * * * *  */

function dataWranglingTwo(data){

    // children locations
    let loc_concentrations = data.children[0].children[0];
    let loc_research = data.children[0].children[1];
    let loc_otherPathways = data.children[0].children[2];

    let loc_internships = data.children[1].children[0];
    let loc_gradSchool = data.children[1].children[1];

    let loc_countries = data.children[2].children[0];
    let loc_languages = data.children[2].children[1];

    let loc_concentrationAdviser = data.children[3].children[0];
    let loc_houseRoles = data.children[3].children[1];

    // TMP ARRAYS

    // academic pathways
    let array_concentrations = [];
    let array_research = [];
    let array_otherPathways =[];

    // work and grad school
    let array_internships = [];
    let array_gradSchool = [];

    // international expertise
    let array_countries = [];
    let array_languages = [];

    // advising etc
    let array_concentrationAdviser = [];
    let array_houseRoles = [];

    computeHits(loc_concentrations, array_concentrations, '#concentrationMenu', '0_0'); // concentrations
    computeHits(loc_research, array_research, '#researchMenu', '0_1');
    computeHitsLessLevels(loc_otherPathways, array_otherPathways, '#otherPathwaysMenu', '0_2');

    computeHits(loc_internships, array_internships, '#internshipsMenu', '1_0');
    computeHits(loc_gradSchool, array_gradSchool, '#gradSchoolMenu', '1_1');

    computeHits(loc_countries, array_countries, '#countriesMenu', '2_0');
    computeHitsLessLevels(loc_languages, array_languages, '#languagesMenu', '2_1');

    computeHitsLessLevels(loc_concentrationAdviser, array_concentrationAdviser, '#concentrationAdviserMenu', '3_0');
    computeHitsLessLevels(loc_houseRoles, array_houseRoles, '#houseRolesMenu', '3_1');

}

function computeHits(location, finalArray, div, idRoot) {

    // for all the children
    location.children.forEach(function (d) {

        // look at all the children
        d.children.forEach(function (d) {

            //console.log(d);

            // and create a temporary item for each entry
            let tmpItem = {
                name: d.name,
                size: d.size,
                tutorIDs: d.tutorIDs
            };

            // array
            finalArray.push(tmpItem);

        });

    });


    // sort array and create string
    let sorted = finalArray.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    createOptions(finalArray, div, idRoot);
}



function computeHitsLessLevels(location, finalArray, div, idRoot) {

    // for all the children
    location.children.forEach(function(d){

        // create a temporary item for each entry
        let tmpItem = {
            name: d.name,
            size: d.size,
            tutorIDs: d.tutorIDs
        };

        // array
        finalArray.push(tmpItem);
    });


    // sort array and create string
    let sorted = finalArray.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    createOptions(finalArray, div, idRoot);
}

function createOptions(array, div, idRoot){

    // tmp variable
    let tmpHtmlString ='';

    // populate tmpHtmlString and add ids
    array.forEach(function(d,i){
        let tmpId = 'dd__' + idRoot + '_' + i;
        tmpHtmlString += `<div class="item ${tmpId}" id="${tmpId}" onmouseover="highlightSunburst('${tmpId}')">${d.name} (${d.size})</div>`;
    });

    // attach string to according div element
    $(div).html(tmpHtmlString);

    // use formerly created ids to add according event listener
    array.forEach(function(d,i){
        $('#' + 'dd__' + idRoot + '_' + i).click( () => profileView(d.tutorIDs) )

        // alternative: grab sunburst element here, and dispatch the sunburst's click event and fire it here;
    })
}