
// start carousel
$('.carousel').carousel({
    interval: false
});


// create the data structure
createDataStructure();






// helper functions
function toProfile(){
        $('#carousel').carousel(1);
        $('#exitBox').show();
}

function toSunburst(){
    $('#carousel').carousel(0);
    $('#exitBox').hide();

/*
    let root = d3.hierarchy(FinalData);
    root.sum(function(d) { return d.size; });
    click(root);
*/
2
    drawSunburst(FinalData);


}


function toAcc(name){

    // classifier - would be nice if I could just send a classifier like 1.2.1


    // lookup
    $('#' + name).collapse('toggle');
}


function identifyClassifier(){

}


















