
// define data
let data = [
    {id: 'filter_one', text: 'Resident Tutor'},
    {id: 'filter_two', text: 'Non-resident Tutor'},
    {id: 'filter_three', text: 'Non-resident Affiliate'},
    {id: 'filter_four', text: 'Student'},
    {id: 'filter_five', text: 'Other affiliate'},

];

// empty variable
let html = `<div class="col-1"></div>`;

// fill html
data.forEach( function(d){
    let tmp = `<div class="col-2">
                   <div class="row h-100" style="height: 100%">
                        <div class="col-3">
                             <div class="centeredCheckbox">
                                 <input type="checkbox" id="${d.id}" class="cbx-d2" style="display:none" checked/>
                                 <label for="${d.id}" class="toggle"><span></span></label>
                             </div>
                        </div>
                        <div class="col-9 h-100 d-table">
                            <div class="d-table-cell align-middle">${d.text}</div>
                        </div>
                   </div>
               </div>`
    ;
    html += tmp;

});

$('#filters').html(html);
