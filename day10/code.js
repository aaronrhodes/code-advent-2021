import { chunks } from './data.js';

const closer = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">"
}

const points = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
}

const completePoints = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
}

const errors = chunks.map((m, rowIndex) => {
    const opened = [];

    for (let i = 0; i < m.length; i++) {
        const char = m.charAt(i);
        if (char.match(/[/[/(/{/<]/)) {
            opened.push(char);
        } else if (char === closer[opened[opened.length - 1]]) {
            opened.pop();
        } else {
            // error
            return {
                rowIndex,
                index: i,
                char
            }
        }
    }

    return {}
}).filter(f => f.char);

console.log('Part 1:', errors.map(m => points[m.char]).reduce((a, b) => a + b));

const incomplete = chunks.filter((f, i) => !errors.find(f => f.rowIndex === i));

const complete = incomplete.map((m, rowIndex) => {
    let score = 0;
    const opened = [];

    for (let i = 0; i < m.length; i++) {
        const char = m.charAt(i);
        if (char.match(/[/[/(/{/<]/)) {
            opened.push(char);
        } else if (char === closer[opened[opened.length - 1]]) {
            opened.pop();
        }
    }

    for (let i = opened.length - 1; i >= 0; i--) {
        const closingChar = closer[opened[i]];
        m += closingChar;

        score = score * 5;
        score += completePoints[closingChar];
    }

    return { chunk: m, score };
}).sort((a, b) => a.score - b.score);

console.log(complete[Math.floor(complete.length / 2)].score);