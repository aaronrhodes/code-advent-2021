import { codes } from './data.js';

const outputs = codes
    .map(m =>
        m.split('|')[1])
    .map(m =>
        m.split(' ')
            .map(a =>
                a.split('')
                    .sort()
                    .join('')
            )
            .filter(f => f)
    );

// const oneMatch = outputs.map(f => new RegExp(/^([a-z]{2})$/).exec(f));

// console.log(outputs, oneMatch);
// console.log(new RegExp(/^([a-z]{2})$/).exec('gg'));

console.log('Task 1:', outputs.flatMap(m => m).map(m => m.length).filter(f => f === 2 || f === 3 || f === 4 || f === 7).length);

const inputs = codes.map(
    m => m.split('|')[0])
    .map(m =>
        m.split(' ')
            .map(a =>
                a.split('')
                    .sort()
                    .join('')
            )
            .filter(f => f)
            .sort((a, b) => a.length - b.length)
    );

const mappings = inputs
    .map((m,i) => {
        let list = [...m];
        const one = list.find(f => f.length === 2);
        const four = list.find(f => f.length === 4);
        const seven = list.find(f => f.length === 3);
        const eight = list.find(f => f.length === 7);

        list = list.filter(f => f !== one && f !== four && f !== seven && f !== eight);

        const nine = list.find(f => f.length === 6 && four.split('').every(e => f.indexOf(e) > -1));
        list = list.filter(f => f !== nine);

        const three = list.find(f => f.length === 5 && seven.split('').every(e => f.indexOf(e) > -1));
        list = list.filter(f => f !== three);

        const zero = list.find(f => f.length === 6 && seven.split('').every(e => f.indexOf(e) > -1) && !four.split('').every(e => f.indexOf(e) > -1));
        list = list.filter(f => f !== zero);

        const five = list.find(f => f.length === 5 && nine.split('').filter(e => f.indexOf(e) === -1).length === 1);
        list = list.filter(f => f !== five);

        const six = list.find(f => f.length === 6 && five.split('').every(e => f.indexOf(e) > -1));
        list = list.filter(f => f !== six);

        const two = list[0];

        // if (i === 18) console.log(i, zero, one, two, three, four, five, six, seven, eight, nine);

        return [
            zero, one, two, three, four, five, six, seven, eight, nine
        ];
    });

const values = outputs.map((m, i) => m.map(b => mappings[i].indexOf(b)));

console.log(values.map(m => parseInt(m.join(''))).reduce((a,b) => a + b))

// const codes = {};
// codes[1] = inputs.filter(f => f.length === 2)[0]
// // codes[7] =

// inputs[0].reduce((result, code) => {

// });

//  'be',      'cfbegad', 'cbdgef',  'fgaecd',  'cgeb',    'fdcge',