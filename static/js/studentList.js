
// variables
let studentListHtml = '';
let selectedStudents = [];
let dataByIdObj = {};


function createStudentList(selectedNames){

    console.log(selectedNames, 'then reset list');
    studentListHtml = '';
    selectedStudents = [];



    // first look up all the students by last name, i.e. iterate over all
    d3.csv("/data/data3.csv").then(function(data) {


        data.forEach( (d,i) => {

            console.log('data', d);

            // if a student is listed in the studentArray
            if( selectedNames.includes(d['Last Name']) ) {

                // pictureID
                let pictureID = d['ID'];

                // email
                let email = d['Please give the email you would prefer to be contacted on by Leverett students'];

                //cv
                let cv = d['Upload CV or resume here (PDF only):'];

                // concentrations
                let concentrations = '';
                if(d['Arts & Humanities concentrations/secondaries'] !== 'no expertise') {
                    concentrations += d['Arts & Humanities concentrations/secondaries'] + ', ';
                }
                if(d['Social Science concentrations/secondaries'] !== 'no expertise') {
                    concentrations += d['Social Science concentrations/secondaries'] + ', ';
                }

                if(d['Science & Engineering concentrations/secondaries'] !== 'no expertise') {
                    concentrations += d['Science & Engineering concentrations/secondaries'] + ';';
                }

                // research:
                let research = '';
                if(d['Arts and Humanities research'] !== 'no expertise') {
                    research += d['Arts and Humanities research'] + ', ';
                }
                if(d['Life/Health Sciences research'] !== 'no expertise') {
                    research += d['Life/Health Sciences research'] + ', ';
                }
                if(d['Science/Engineering research'] !== 'no expertise') {
                    research += d['Science/Engineering research'] + ', ';
                }
                if(d['Social Science/Professional field research'] !== 'no expertise') {
                    research += d['Social Science/Professional field research'] + ';';
                }

                // other pathways
                let otherPathways = d['Other pathways'];

                // academic pathways explanation
                let academicExplanation = d['Enter explanation AP'];


                // WORK & GRAD SCHOOL

                /* grad school */
                let gradSchool = '';
                if(d['Arts/Humanities/Social Sciences grad school'] !== 'none') {
                    gradSchool += d['Arts/Humanities/Social Sciences grad school'];
                }
                if(d['Sciences/Engineering grad school'] !== 'none') {
                    gradSchool += d['Sciences/Engineering grad school'];
                }
                if(d['Professional grad school'] !== 'none') {
                    gradSchool += d['Professional grad school'];
                }
                gradSchool += ';';
                gradSchoolExp = d['Enter explanation Grad'];

                /* work */
                let work = '';
                if(d['Arts/Entertainment/Media'] !== 'none') {
                    work += d['Arts/Entertainment/Media'] + ', ';
                }
                if(d['Business/Entrepreneurship'] !== 'none') {
                    work += d['Business/Entrepreneurship'] + ', ';
                }
                if(d['Gov/Law/Ed/Non-profit'] !== 'none') {
                    work += d['Gov/Law/Ed/Non-profit'] + ', ';
                }
                if(d['Health/Life Sciences'] !== 'none') {
                    work += d['Health/Life Sciences'] + ', ';
                }
                if(d['Tech/Engineering/Environment/Architecture'] !== 'none') {
                    work += d['Tech/Engineering/Environment/Architecture'];
                }
                work += ';';
                workExp = d['Enter explanation Career'];




                // TRAVEL AND LANGUAGES
                let countries ='';
                if(d['Africa'] !== 'none') {
                    countries += d['Africa'] + ', ';
                }
                if(d['Americas'] !== 'none') {
                    countries += d['Americas'] + ', ';
                }
                if(d['Asia'] !== 'none') {
                    countries += d['Asia'] + ', ';
                }
                if(d['Australia/Oceania'] !== 'none') {
                    countries += d['Australia/Oceania'] + ', ';
                }
                if(d['Europe'] !== 'none') {
                    countries += d['Europe'] + ';';
                }

                let countriesExp = d['Enter explanation Countries'];

                let languages = d['Non-English Languages'];
                let languagesExp = d['Explain Lang'];



                // create studentItem
                let studentItem = {

                    // meta info
                    id: i,
                    name: d['First Name'] + ' '  + d['Last Name'],
                    pictureID: pictureID,
                    email: email,
                    cv: cv,

                    // concentration
                    concentrations: concentrations,
                    research: research,
                    otherPathways: otherPathways,
                    academicExplanation: academicExplanation,

                    // work & grad school
                    work: work,
                    workExp: workExp,
                    gradSchool: gradSchool,
                    gradSchoolExp: gradSchoolExp,

                    // travel
                    countries: countries,
                    countriesExp: countriesExp,
                    languages: languages,
                    languagesExp: languagesExp,


                };

                // push studentItem to data array
                selectedStudents.push(studentItem)
            }
        });


        //console.log('finalized', selectedStudents);

        // map by id
        let dataByIdArray = selectedStudents.map(obj =>{

            let rObj = {};

            rObj['sl-id-' + obj.id] = {
                id: obj.id,
                name: obj.name,
                pictureID: obj.pictureID,
                email: obj.email,
                cv:obj.cv,

                // concentrations
                concentrations: obj.concentrations,
                research: obj.research,
                otherPathways: obj.otherPathways,
                academicExplanation: obj.academicExplanation,

                // work & grad school
                work: obj.work,
                workExp: obj.workExp,
                gradSchool: obj.gradSchool,
                gradSchoolExp: obj.gradSchoolExp,

                // travel
                countries: obj.countries,
                countriesExp: obj.countriesExp,
                languages: obj.languages,
                languagesExp: obj.languagesExp
            };

            return rObj;
        });

        // convert array to obj;
        dataByIdObj = dataByIdArray.reduce((a, b) => Object.assign(a, b), {});


        // create profile view
        clickStudentListItem("sl-id-" + selectedStudents[0].id);


        // create student tiles for each student in selected students
        selectedStudents.forEach( d => {

            studentListHtml +=  `<div class="row student-list-item" id="sl-id-${d.id}"
                                   onmouseover="mouseoverStudentListItem('sl-id-${d.id}')"
                                                onclick="clickStudentListItem('sl-id-${d.id}')"
                                                onmouseout="mouseoutStudentListItem()">
                                            
                                            <div class="col-3">
                                                <div class="row" style="height: 100%" 
                                                >                                              
                                                    <div class="sl-parent" style="height: 100%">
                                                        <div class="sl-child"> <img class="portraitMini" 
                                                        src="img/${d.pictureID}.jpg"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="col-9">
                                                <div class="row" style="height: 100%">
                                                    <div class="sl-parent" style="height: 100%">
                                                        <div class="sl-child"><h4>${d.name}</h4></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`;
        });

        // update DOM
        $('#studentList').html(studentListHtml);

    });
}



