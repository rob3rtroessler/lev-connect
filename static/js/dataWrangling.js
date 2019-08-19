/* * * * * * * * * * * * * * * * * *
*                                  *
*         DATA STRUCTURE           *
*                                  *
* * * * * * * * * * * * * * * * *  */


/* * * * * * * * * *
*   HELPER ARRAYS  *
* * * * * * * * * */

let replacementLib = [

    // concentrations
    {word: 'Theater, Dance, and Media', replacement: 'rep1'},
    {word: 'Art, Film, and Visual Studies - formerly VES', replacement: 'rep2'},
    {word: 'Russia, Eastern Europe, and Central Asia', replacement: 'rep3'},
    {word: 'Religion, Comparative Study of', replacement: 'rep3'},

    // research
    {word: 'Arts, Music, Museums, Performance', replacement: 'rep4'},
    {word: 'Literature, History, Area Studies', replacement: 'rep5'},
    {word: 'Philosophy, Religion, Ethics', replacement: 'rep6'},
    {word: 'Earth, Environment, Geology', replacement: 'rep7'},
    {word: 'Natural Sciences (Physics, Chemistry, etc.)', replacement: 'rep8'},
    {word: 'Business, Organizations, Markets', replacement: 'rep9'},
    {word: 'Economics, International Development', replacement: 'rep10'},
    {word: 'Government, Public Policy, Law', replacement: 'rep11'},
    {word: 'Psychology (non-lab, i.e. social, clinical, developmental)', replacement: 'rep12'},

    // other pathways
    {word: 'Designing your own course, concentration, or research', replacement: 'rep13'},


    /* CAREERS AND INTERNSHIPS */

    // careers and internships
    {word: 'Arts Management, Museums, Libraries, Galleries, etc.', replacement: 'rep14'},
    {word: 'Entertainment/Media (TV, film, sports management, etc)', replacement: 'rep15'},
    {word: 'Journalism, Publishing, Writing etc', replacement: 'rep16'},
    {word: 'Performing Arts (acting, music, theatre, etc)', replacement: 'rep17'},
    {word: 'Advertising, Marketing, PR, etc.', replacement: 'rep18'},
    {word: 'Entrepreneurship, Start-ups, VC', replacement: 'rep19'},
    {word: 'Fashion, Retail, Consumer products, hospitality', replacement: 'rep20'},
    {word: 'Finance (Banking, PE, Real estate, Hedge funds, etc)', replacement: 'rep21'},
    {word: 'Ed: Counseling, Ed Policy/ Admin, etc.', replacement: 'rep22'},
    {word: 'Government/Politics, Think-tanks/Policy, IR/Diplomacy, etc.', replacement: 'rep23'},
    {word: 'International Development, Human Rights, etc.', replacement: 'rep24'},
    {word: 'Non-profit, Social enterprise, Philanthropy, etc.', replacement: 'rep25'},
    {word: 'Allied health (nursing, physical therapy, etc.)', replacement: 'rep26'},
    {word: 'Pharma, Biotech, etc.', replacement: 'rep27'},
    {word: 'Architecture, Design, Urban planning, Real estate & related fields', replacement: 'rep28'},
    {word: 'Engineering, Robotics, Medical devices, etc.', replacement: 'rep29'},
    {word: 'Environment, Energy, Sustainability, Food, etc.', replacement: 'rep30'},
    {word: 'Programming, Data analytics, Cyber security, etc.', replacement: 'rep31'},
    {word: 'Technology management/ development, etc.', replacement: 'rep32'},

    // graduate school
    {word: 'Area Studies (African-American Studies, NELC, etc.)', replacement: 'rep33'},
    {word: 'Art (MFA, History of Art/Architecture, etc.)', replacement: 'rep34'},
    {word: 'Government/Political Science, IR', replacement: 'rep35'},
    {word: 'Mass Media, Communication, Journalism', replacement: 'rep36'},
    {word: 'Philosophy, Ethics', replacement: 'rep37'},
    {word: 'Psychology, Cognitive Science & related fields', replacement: 'rep38'},
    {word: 'Religious Studies, Divinity', replacement: 'rep39'}


    /* TRAVEL & LANGUAGES */
];



/* * * * * * * * * * * *
*   GLOBAL VARIABLES   *
* * * * * * * * * * * */

let FinalData = {};


// first create full data structure?
// then fill in the data?
// ultimately, I just want to display the stuff we have.

function createDataStructure (){

    // first get predefined, initial data structure
    d3.json("data/structure.json").then(function(structure) {

        /* * * * * * * * * * * *
        *       VARIABLES      *
        * * * * * * * * * * * */

        /* STRUCTURE LOCATIONS */

        // CAT #1 - Academic Pathways
        let
            // concentrations
            AP_C_arts = structure.children[0].children[0].children[0],
            AP_C_sciences = structure.children[0].children[0].children[1],
            AP_C_social = structure.children[0].children[0].children[2],

            // research
            AP_R_arts = structure.children[0].children[1].children[0],
            AP_R_life = structure.children[0].children[1].children[1],
            AP_R_sciences = structure.children[0].children[1].children[2],
            AP_R_social = structure.children[0].children[1].children[3],

            // other pathways
            AP_O = structure.children[0].children[2];


        // CAT #2 - Work & Graduate School
        let
            //Internships & Careers
            WG_IC_arts = structure.children[1].children[0].children[0],
            WG_IC_business = structure.children[1].children[0].children[1],
            WG_IC_GovEtc = structure.children[1].children[0].children[2],
            WG_IC_health = structure.children[1].children[0].children[3],
            WG_IC_tech = structure.children[1].children[0].children[4],

            // graduate school
            WG_G_arts = structure.children[1].children[1].children[0],
            WG_G_prof = structure.children[1].children[1].children[1],
            WG_G_science = structure.children[1].children[1].children[2];


        // CAT #3 - Travel & Languages
        let
            //Travel
            TL_C_africa = structure.children[2].children[0].children[0],
            TL_C_americas = structure.children[2].children[0].children[1],
            TL_C_asia = structure.children[2].children[0].children[2],
            TL_C_australia = structure.children[2].children[0].children[3],
            TL_C_europe = structure.children[2].children[0].children[4],

            // Languages
            TL_L = structure.children[2].children[1];


        // CAT #4 - Tutor Roles & Peer Advisers
        let
            //TODO: Do we really want that here?
            TP = structure.children[1].children[0].children[0];




            /* EXPERTISE ARRAYS */

        // Academic Pathways
        let
            // concentrations
            AP_C_arts_ee = [],
            AP_C_social_ee = [],
            AP_C_sciences_ee = [],

            // research
            AP_R_arts_ee = [],
            AP_R_life_ee = [],
            AP_R_sciences_ee = [],
            AP_R_social_ee = [],

            // other pathways
            AP_O_ee = [];

        // Work and Graduate School
        let
            // internships and careers
            WG_IC_arts_ee = [],
            WG_IC_business_ee = [],
            WG_IC_GovEtc_ee = [],
            WG_IC_health_ee = [],
            WG_IC_tech_ee =[],

            // graduate school
            WG_G_arts_ee = [],
            WG_G_prof_ee = [],
            WG_G_science_ee = [];


        // Travel and Languages
        let
            // Countries
            TL_C_africa_ee = [],
            TL_C_americas_ee = [],
            TL_C_asia_ee = [],
            TL_C_australia_ee = [],
            TL_C_europe_ee =[],

            // languages
            TL_L_ee = [];










        // on top of that predefined structure, load the data from the form
        d3.csv("/data/data.csv").then(function(data) {

            // now, for each tutor, sort his or her data into the structure
            data.forEach(function(d){
                //console.log(d);

                /* * * * * * * * * * * *
                *   ACADEMIC PATHWAYS  *
                * * * * * * * * * * * */

                /* CONCENTRATIONS & SECONDARIES  */
                fillChildren(d, "Arts & Humanities concentrations/secondaries", AP_C_arts, AP_C_arts_ee, '#e41a1c');
                fillChildren(d, "Science & Engineering concentrations/secondaries", AP_C_sciences, AP_C_sciences_ee, '#e41a1c');
                fillChildren(d, "Social Science concentrations/secondaries", AP_C_social, AP_C_social_ee, '#e41a1c');

                /* RESEARCH  */
                fillChildren(d, "Arts and Humanities research", AP_R_arts, AP_R_arts_ee, '#e41a1c');
                fillChildren(d, "Life/Health Sciences research", AP_R_life, AP_R_life_ee, '#e41a1c');
                fillChildren(d, "Science/Engineering research", AP_R_sciences, AP_R_sciences_ee, '#e41a1c');
                fillChildren(d, "Social Science/Professional field research", AP_R_social, AP_R_social_ee, '#e41a1c');

                /* OTHER PATHWAYS  */
                fillChildren(d, "Other pathways", AP_O, AP_O_ee, '#e41a1c');


                /* * * * * * * * * * * * *
                *    WORK &GRAD SCHOOL   *
                * * * * * * * * * * * * */

                /* INTERNSHIPS & CAREERS */
                fillChildren(d, "Arts/Entertainment/Media", WG_IC_arts, WG_IC_arts_ee, '#377eb8');
                fillChildren(d, "Business/Entrepreneurship", WG_IC_business, WG_IC_business_ee, '#377eb8');
                fillChildren(d, "Gov/Law/Ed/Non-profit", WG_IC_GovEtc, WG_IC_GovEtc_ee, '#377eb8');
                fillChildren(d, "Health/Life Sciences", WG_IC_health, WG_IC_health_ee, '#377eb8');
                fillChildren(d, "Tech/Engineering/Environment/Architecture", WG_IC_tech, WG_IC_tech_ee, '#377eb8');

                /* GRADUATE SCHOOL */
                fillChildren(d, "Arts/Humanities/Social Sciences grad school", WG_G_arts, WG_G_arts_ee, '#377eb8');
                fillChildren(d, "Professional grad school", WG_G_prof, WG_G_prof_ee, '#377eb8');
                fillChildren(d, "Sciences/Engineering grad school", WG_G_science, WG_G_science_ee, '#377eb8');


                /* * * * * * * * * * * *
                *    TRAVEL & LANG     *
                * * * * * * * * * * * */

                /* Countries */
                fillChildren(d, "Africa", TL_C_africa, TL_C_africa_ee, '#4daf4a');
                fillChildren(d, "Americas", TL_C_americas, TL_C_americas_ee, '#4daf4a');
                fillChildren(d, "Asia", TL_C_asia, TL_C_asia_ee, '#4daf4a');
                fillChildren(d, "Australia/Oceania", TL_C_australia, TL_C_australia_ee, '#4daf4a');
                fillChildren(d, "Europe", TL_C_europe, TL_C_europe_ee, '#4daf4a');

                fillChildren(d, "Non-English Languages", TL_L, TL_L_ee, '#4daf4a');




                FinalData = structure;
            });

            drawSunburst(FinalData);
        });
    });
}


function fillChildren (tutorData, category, categoryLocation, existingExpertise, color) {

    // first, get the information from the field in the csv that we're interested in
    let tmpStr = tutorData[category];

    // we only care about tutors with expertise for now - so, if tutors have expertise
    if ( !( tmpStr === 'no expertise' || tmpStr === 'none') ) {

        // replace, i.e. iterate over rep lib and replace in all cases
        replacementLib.forEach(function(item) {
            //console.log('rep test:', item.word, item.replacement, arts);
            tmpStr = tmpStr.replace(item.word, item.replacement);
        });

        // split tmpStr and create provisional expertise Array
        let tmpExpArray = tmpStr.split(', ');


        // replace again:
        // for each item in the temporary expertise array
        tmpExpArray.forEach( (item, i) => {
            // check whether the item was a replacement
            replacementLib.forEach(libItem => {
                if (item === libItem.replacement) {
                    // console.log('hit', i, tmpExpArray, libItem);
                    tmpExpArray[i] = libItem.word;
                }
            });
        });

        let finalExpArray = tmpExpArray;


        // and now, foreach final expArray item, create it first, unless its there and enter ID
        finalExpArray.forEach(expertise => {
            // first check, whether we can check at all, or whether we need to start filling
            if (categoryLocation.children.length === 0) {

                // first, push expertise in existing expertise array
                existingExpertise.push(expertise);

                // then push object as new child
                categoryLocation.children.push(
                    {"name": expertise, "color": color, "size": 1, id:[tutorData['Last Name']]}
                );

            }

            // else, we need to check
            else {

                // if expertise is already created as a child
                if ( existingExpertise.includes(expertise) ) {

                    // in that case find correct child object and add size and additional id
                    categoryLocation.children.forEach( child => {
                        if (child.name === expertise) {
                            child.size += 1;
                            child.id.push(tutorData['Last Name'])
                        }
                    })
                }

                // or whether we need to push a new child
                else {
                    existingExpertise.push(expertise);
                    categoryLocation.children.push(
                        {"name": expertise, "color": color, "size": 1, id:[tutorData['Last Name']]});
                }
            }
        });
    }
}












let studentData = [
    {id: 1, name: 'Emily Harrison', picture: 'url', secondaries: 'Emily_Secondaries'},
    {id: 2, name: 'Judith Murciano-Goroff', picture: 'url'},
    {id: 3, name: 'Jonathan Abraham', picture: 'url'},
    {id: 4, name: 'Amy Xu', picture: 'url'},
    {id: 5, name: 'Bilal Malik', picture: 'url'},
    {id: 6, name: 'Chris Cleveland', picture: 'url'},
    {id: 7, name: 'Marek Hlavac', picture: 'url'},
    {id: 8, name: 'Shervin Tabrizi', picture: 'url'},
    {id: 9, name: 'Alex Hugon', picture: 'url'},
    {id: 10, name: 'Diana Tamir', picture: 'url'},
    {id: 11, name: 'Robert Roessler', picture: 'url'}
];

// map by id
let dataByIdArray = studentData.map(obj =>{
    let rObj = {};
    rObj['sl-id-' + obj.id] = {name: obj.name, picture: obj.picture};
    return rObj;
});

// convert array to obj;
let dataByIdObj = dataByIdArray.reduce((a, b) => Object.assign(a, b), {});
