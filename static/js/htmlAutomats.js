

let studentListHtml = '';

studentData.forEach( d => {

    studentListHtml +=  `<div class="row student-list-item"
                                   onmouseover="mouseoverStudentListItem('sl-id-${d.id}')"
                                                onclick="clickStudentListItem('sl-id-${d.id}')">
                                            
                                            <div class="col-3">
                                                <div class="row" id="sl-id-${d.id}" style="height: 100%" 
                                                >                                              
                                                    <div class="sl-parent" style="height: 100%">
                                                        <div class="sl-child"> <img class="portraitMini" src="img/female-placeholder.jpg"></div>
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

$('#studentList').html(studentListHtml);
