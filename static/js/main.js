console.log('--------- initialization done ---------');

async function INITIALIZER (data){
    console.log('loading the data');
    ServerData = data;

}

// initializing asynchronously...
console.log('loading YoungVienna Example. Loading data and updating page asynchronously');

// go!
INITIALIZER(YoungViennaData)
    .then(initSliders([1890, 1900]))
    .then(parseAndPrepareLetters(ServerData.letters))
    .then(wrangleServerData(parsedLetters, selectedRange))
    .then( DrawNetwork() )
    .then(initSliderEvents())
    //.then(console.log('no need to update Timeslider', TimeSlider))
    .then(initLineChart())
    .then(console.log('DONE'));


// enabling user to select other data set with other range
function selectExample(data, rangeStart, rangeEnd) {

    INITIALIZER(data)
        .then(updateTimeSlider(TimeSlider, [rangeStart,rangeEnd]))
        .then(parseAndPrepareLetters(ServerData.letters))
        .then(wrangleServerData(parsedLetters, selectedRange))
        .then( DrawNetwork() )
        .then(initSliderEvents());
        //.then(removeLineChart())
        //.then(initLineChart);
}












