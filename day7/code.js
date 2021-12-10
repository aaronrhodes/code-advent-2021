import { crabs } from './data.js';

const distribution = crabs.reduce((result, crab) => {
    result[crab] = (result[crab] || 0) + 1;
    return result;
}, {})

console.log(distribution);

// const resolved = Object.keys(distribution).reduce((result, crab) => {
//     const index = parseInt(crab);
//     result[crab] = distribution[crab] * crab;
//     return result;
// }, {});

// console.log(resolved)

const vals = Object.keys(distribution).reduce((result, item) => {
    const position = parseInt(item);

    const calc = Object.keys(distribution).reduce((result, item) => {
        const current = parseInt(item);
        result.push(Math.abs(position - current) * distribution[current]);
        return result;
    }, []);

    result.push(calc.reduce((sum, i) => sum + i));

    return result;
}, []);

console.log('Part 1: ', Math.min(...vals));

// part 2

const furthestCrab = Math.max(...Object.keys(distribution).map(m => parseInt(m)));

const part2 = Array(furthestCrab).fill(0).reduce((result, item, position) => {
    // const position = parseInt(item);

    const calc = Object.keys(distribution).reduce((result, item) => {
        const current = parseInt(item);
        const count = Math.abs(position - current);
        const values = Array(count).fill(0).map((m, i) => 1 * (i + 1));
        // console.log(count, position, current)
        if (count === 0) result.push(0)
        else result.push(values.reduce((sum, i) => sum + i) * distribution[current]);
        return result;
    }, []);
    // console.log(calc)
    result.push(calc.reduce((sum, i) => sum + i));

    return result;
}, []);

console.log('Part 2: ', Math.min(...part2));

function findMedian(m) {
    var middle = Math.floor((m.length - 1) / 2); // NB: operator precedence
    if (m.length % 2) {
        return m[middle];
    } else {
        return (m[middle] + m[middle + 1]) / 2.0;
    }
}

const median = findMedian([...crabs].sort((a, b) => a - b));
