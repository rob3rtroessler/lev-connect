
let qualitativeMild = ['#ffffb3','#bebada','#fb8072','#80b1d3'];
let qualitativeStrong = ['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00'];

let red = '#e41a1c';
let blue = '#377eb8';
let green = '#4daf4a';
let orange = '#ff7f00';
let violet = '#984ea3';

let reds = ['#c50006', '#dd1417', '#f22d27', '#ff4c3b', '#ff7057', '#ff8d6f', '#ffa686'];
let violets = ['#944ba0', '#aa5fb5', '#c073ca', '#d688e0', '#ed9df5', '#fdb8ff', '#ffd9ff'];
let blues =['#186ca5', '#3a80bb', '#5495d1', '#6caae8', '#83c1fd', '#9dd9ff', '#b7f2ff'];
let oranges = ['#d96000', '#f07300', '#ff8a13', '#ffa93c', '#ffc659'];





let colorDict = {

    'white': '#ffffff',

    // academic pathways
    '0': '#e41a1c',
    '0-0': '#f22d27',
    '0-0-0': '#ff4c3b',
    '0-0-0c': '#ff8d6f',
    '0-0-1': '#ff4c3b',
    '0-0-1c': '#ff8d6f',
    '0-0-2': '#ff4c3b',
    '0-0-2c': '#ff8d6f',
    '0-1': '#f22d27',
    '0-1-0': '#ff4c3b',
    '0-1-0c': '#ff8d6f',
    '0-1-1': '#ff4c3b',
    '0-1-1c': '#ff8d6f',
    '0-1-2': '#ff4c3b',
    '0-1-2c': '#ff8d6f',
    '0-1-3': '#ff4c3b',
    '0-1-3c': '#ff8d6f',
    '0-2': '#ff4c3b',
    '0-2c': '#ff8d6f',

    // work & grad school
    '1': '#944ba0',
    '1-0': '#aa5fb5',
    '1-0-0': '#c073ca',
    '1-0-0c': '#fdb8ff',
    '1-0-1': '#c073ca',
    '1-0-1c': '#fdb8ff',
    '1-0-2': '#c073ca',
    '1-0-2c': '#fdb8ff',
    '1-0-3': '#c073ca',
    '1-0-3c': '#fdb8ff',
    '1-0-4': '#c073ca',
    '1-0-4c': '#fdb8ff',
    '1-1': '#aa5fb5',
    '1-1-0': '#c073ca',
    '1-1-0c': '#fdb8ff',
    '1-1-1': '#c073ca',
    '1-1-1c': '#fdb8ff',
    '1-1-2': '#c073ca',
    '1-1-2c': '#fdb8ff',

    // travel & language
    '2': '#186ca5',
    '2-0': '#3a80bb',
    '2-0-0': '#5495d1',
    '2-0-0c': '#9dd9ff',
    '2-0-1': '#5495d1',
    '2-0-1c': '#9dd9ff',
    '2-0-2': '#5495d1',
    '2-0-2c': '#9dd9ff',
    '2-0-3': '#5495d1',
    '2-0-3c': '#9dd9ff',
    '2-0-4': '#5495d1',
    '2-0-4c': '#9dd9ff',
    '2-1': '#5495d1',
    '2-1c': '#9dd9ff',

    // tutor roles
    '3': '#d96000',
    '3-0': '#f07300',
    '3-0c': '#ffa93c',
    '3-1': '#f07300',
    '3-1c': '#ffa93c'

};

function colorFilter(data){
    return colorDict[data];
}