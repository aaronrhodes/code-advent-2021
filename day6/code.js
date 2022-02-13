import { fish } from './data.js';

//const fish = [3, 4, 3, 1, 2];

const processFish = (fish) => fish === 0 ? 6 : fish - 1;

let days = 1;
let theFish = fish;

while (days <= 80) {
    const newFishCount = theFish.filter(f => f === 0).length;
    theFish = theFish.map(m => processFish(m));
    theFish = [...theFish, ...Array(newFishCount).fill(8)];

    days++;
}

console.log('Part 1: ', theFish.length);


let fishCounters = fish.reduce((result, item) => {
    result[item] = (result[item] || 0) + 1
    return result;
}, { ...Array(9).fill(BigInt(0)) });

console.log({ ...Array(9).fill(BigInt(0)) }, fishCounters)

days = 1;
while (days <= 256) {
    fishCounters = Object.keys(fishCounters).reduce((result, item) => {
        let key = parseInt(item);

        if (key === 0) result[8] += BigInt(fishCounters[item]);

        key = key === 0 ? 6 : key - 1;
        result[key] += BigInt(fishCounters[item]);

        return result;
    }, { ...Array(9).fill(BigInt(0)) });

    days += 1;
}

const result = Object.keys(fishCounters).reduce((sum, key) => {
    return sum + BigInt(fishCounters[key]);
}, BigInt(0));

console.log(result, fishCounters);