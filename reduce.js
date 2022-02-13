const data = [{
    name: 'test',
    x: 99,
    y: 120
}, {
    name: 'test2',
    x: 123,
    y: 656
}, {
    name: 'test3',
    x: 345,
    y: 789
}];

console.log(data.map(m => [m.x, m.y]));