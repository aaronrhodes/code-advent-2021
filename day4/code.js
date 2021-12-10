import { boards, results } from './data.js';

const rows = [...boards];
const columns = boards.reduce((result, item) => {
    //console.log(item)
    const board = [];
    for (let x = 0; x < item[0].length; x++) {
        const col = item.map(m => m[x]);
        board.push(col);
    }
    result.push(board);
    return result;
}, []);

const checkForWin = (boards, numbers) => {
    return boards.filter(
        f => f.filter(
            b => b.every(e => numbers.indexOf(e) > -1)
        ).length > 0
    );
}

for (let r = 0; r < results.length; r++) {
    const active = results.slice(0, r);

    const winners = [
        ...checkForWin(rows, active),
        ...checkForWin(columns, active)
    ];

    // console.log(active);

    if (winners.length > 0) {
        const otherRows = winners[0].map(f => f.filter(e => active.indexOf(e) === -1));

        const sum = otherRows.reduce((result, item) => {
            return result + item.reduce((total, i) => {
                return total + i;
            }, 0);
        }, 0);

        console.log(sum * active[active.length - 1]);
        break;
    }
}

const winners = [];
let lastWinNumbers = [];

// last board to win
for (let r = 0; r < results.length; r++) {
    const active = results.slice(0, r);

    const newWinners = [
        ...checkForWin(rows.filter((f, i) => winners.indexOf(i) === -1), active),
        ...checkForWin(columns.filter((f, i) => winners.indexOf(i) === -1), active)
    ].map(m => {
        const rowIndex = rows.indexOf(m);
        const colIndex = columns.indexOf(m);

        return rowIndex === -1 ? colIndex : rowIndex;
    });

    if (newWinners.length > 0) lastWinNumbers = [...active];

    newWinners
        .filter(f => winners.indexOf(f) === -1)
        .forEach(f => winners.push(f));
}

const otherRows = rows[winners[winners.length - 1]].map(f => f.filter(e => lastWinNumbers.indexOf(e) === -1));

const sum = otherRows.reduce((result, item) => {
    return result + item.reduce((total, i) => {
        return total + i;
    }, 0);
}, 0);

console.log(sum * lastWinNumbers[lastWinNumbers.length - 1]);