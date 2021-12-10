import { matrix } from './data.js';

const getGraph = () => {
    const graph = matrix
        .map(m => m.map(n => ({ value: n })))
        .reduce((result, row, ri, values) => {
            result.push(row.map((n, i) => {
                return {
                    ...n,
                    // id: `${ri}.${i}`,
                    left: () => graph[ri][i - 1],
                    top: () => ri > 0 ? graph[ri - 1][i] : undefined,
                    right: () => graph[ri][i + 1],
                    bottom: () => ri < graph.length - 1 ? graph[ri + 1][i] : undefined,
                }
            }));

            return result;
        }, []);

    return graph;
}

const list = getGraph().flatMap(row => row.map(m => [m.value, m.left()?.value, m.top()?.value, m.right()?.value, m.bottom()?.value].filter(f => f !== undefined)));

console.log('Part 1:',
    list.filter(f => {
        const [n, ...compare] = f;
        // console.log(n, compare)
        return compare.every(f => n < f);
    })
        .map(m => m[0] + 1)
        .reduce((a, b) => a + b)
);

// find consecutive not 9 numbers
// use index start and end to find non 9s that are directly below and adjacent

const graph = getGraph();


// let current = graph[0][0];

// const getAdjacent = (current, all = []) => {
//     let group = [];
//     const first = current;

//     if (!current) return group;

//     while (current && current.value < 9) {
//         if (!all.find(f => f.id === current.id) && !group.find(f => f.id === current.id)) group.push(current);
//         current = current.right();
//     }

//     current = first;

//     while (current && current.value < 9) {
//         if (!all.find(f => f.id === current.id) && !group.find(f => f.id === current.id)) group.push(current);
//         current = current.left();
//     }

//     const children = group.reduce((result, i) => {
//         const children = getAdjacent(i.bottom(), result);
//         result.push(...children);
//         // if (i.id === '1.9') console.log('bork', children);
//         return result;
//     }, [])

//     return [...group, ...children];
// }

// const allSelected = [];
// const groups = [];

// for (let row of graph) {
//     let current = row[0];
//     let rowEntries = [];
//     let group = [];

//     while (current) {
//         if (current.value === 9) {
//             if (group.length > 0) {
//                 rowEntries.push(group);
//                 group = [];
//             }
//         } else {
//             if (!allSelected.find(f => f.id === current.id)) {
//                 group.push(current);
//                 allSelected.push(current);
//             }
//         }

//         current = current.right();
//     }

//     if (group.length > 0) {
//         rowEntries.push(group);
//         group = [];
//     }

//     rowEntries = rowEntries.map(m => {
//         const it = [...m, ...m.reduce((result, i) => {
//             const children = getAdjacent(i.bottom(), result);
//             result.push(...children.filter(f => !allSelected.find(a => a.id === f.id)));
//             return result;
//         }, [])];

//         // console.log('it', it);

//         allSelected.push(...it);

//         return it;
//     });

//     groups.push(...rowEntries.map(m => m.map(r => r.value)));
// }
// console.log(groups);

const getAdjacent = (node, exclude) => {
    const first = node;
    let current = node;
    const results = [];

    // console.log('exclude', exclude.length)

    for (let move of ['right', 'left']) {
        while (current) {
            if (current.value === 9) break;

            if (exclude.indexOf(current) === -1 && results.indexOf(current) === -1) {
                results.push(current);
                results.push(...getAdjacent(current.bottom(), [...exclude, ...results]));
                results.push(...getAdjacent(current.top(), [...exclude, ...results]));
            }

            current = current[move]();
        }

        current = first;
    }

    return results;
};

const groups = graph.reduce((result, row, i) => {
    let current = row[0];
    let group = [];

    while (current) {
        if (current.value < 9 && result.flatMap(f => f).indexOf(current) === -1 && group.indexOf(current) === -1) {
            // console.log(current.value);
            group.push(current);
            group.push(...getAdjacent(current.bottom(), [...result.flatMap(f => f), ...group]));
            group.push(...getAdjacent(current.top(), [...result.flatMap(f => f), ...group]));
        }

        if (current.value === 9 && group.length > 0) {
            result.push(group);
            group = [];
        }

        current = current.right();
    }

    if (group.length > 0) result.push(group);

    return result;
}, []);

// const flat = groups.flatMap(f => f);
// const missing = graph.flatMap(f => f).filter(f => !groups.find(b => b.id === f.id));
// console.log(flat.length, missing.length)
// console.log(groups.map(m => m.map(b => b.value)).sort((a, b) => b.length - a.length));
console.log(groups.map(m => m.length).sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a * b));

// 903168
// 970200