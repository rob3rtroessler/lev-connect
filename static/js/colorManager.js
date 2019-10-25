
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
    '0_0': '#f22d27',
    '0_0_0': '#ff4c3b',
    '0_0_0c': '#ff8d6f',
    '0_0_1': '#ff4c3b',
    '0_0_1c': '#ff8d6f',
    '0_0_2': '#ff4c3b',
    '0_0_2c': '#ff8d6f',
    '0_1': '#f22d27',
    '0_1_0': '#ff4c3b',
    '0_1_0c': '#ff8d6f',
    '0_1_1': '#ff4c3b',
    '0_1_1c': '#ff8d6f',
    '0_1_2': '#ff4c3b',
    '0_1_2c': '#ff8d6f',
    '0_1_3': '#ff4c3b',
    '0_1_3c': '#ff8d6f',
    '0_2': '#ff4c3b',
    '0_2c': '#ff8d6f',

    // work & grad school
    '1': '#944ba0',
    '1_0': '#aa5fb5',
    '1_0_0': '#c073ca',
    '1_0_0c': '#fdb8ff',
    '1_0_1': '#c073ca',
    '1_0_1c': '#fdb8ff',
    '1_0_2': '#c073ca',
    '1_0_2c': '#fdb8ff',
    '1_0_3': '#c073ca',
    '1_0_3c': '#fdb8ff',
    '1_0_4': '#c073ca',
    '1_0_4c': '#fdb8ff',
    '1_1': '#aa5fb5',
    '1_1_0': '#c073ca',
    '1_1_0c': '#fdb8ff',
    '1_1_1': '#c073ca',
    '1_1_1c': '#fdb8ff',
    '1_1_2': '#c073ca',
    '1_1_2c': '#fdb8ff',

    // travel & language
    '2': '#186ca5',
    '2_0': '#3a80bb',
    '2_0_0': '#5495d1',
    '2_0_0c': '#9dd9ff',
    '2_0_1': '#5495d1',
    '2_0_1c': '#9dd9ff',
    '2_0_2': '#5495d1',
    '2_0_2c': '#9dd9ff',
    '2_0_3': '#5495d1',
    '2_0_3c': '#9dd9ff',
    '2_0_4': '#5495d1',
    '2_0_4c': '#9dd9ff',
    '2_1': '#5495d1',
    '2_1c': '#9dd9ff',

    // tutor roles
    '3': '#d96000',
    '3_0': '#f07300',
    '3_0c': '#ffa93c',
    '3_1': '#f07300',
    '3_1c': '#ffa93c'

};

function colorFilter(data){
    return colorDict[data];
}