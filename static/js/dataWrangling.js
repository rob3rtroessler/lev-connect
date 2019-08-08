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
