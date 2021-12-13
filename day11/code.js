import { actual as octopi } from './data.js';

const getGraph = (matrix) => {
    const graph = matrix
        .map(m => m.map(n => ({ value: n })))
        .reduce((result, row, ri, values) => {
            result.push(row.map((n, i) => {
                const map = {
                    ...n,
                    // id: `${ri}.${i}`,
                    left: () => graph[ri][i - 1],
                    top: () => ri > 0 ? graph[ri - 1][i] : undefined,
                    topLeft: () => ri > 0 ? graph[ri - 1][i - 1] : undefined,
                    topRight: () => ri > 0 ? graph[ri - 1][i + 1] : undefined,
                    right: () => graph[ri][i + 1],
                    bottom: () => ri < graph.length - 1 ? graph[ri + 1][i] : undefined,
                    bottomLeft: () => ri < graph.length - 1 ? graph[ri + 1][i - 1] : undefined,
                    bottomRight: () => ri < graph.length - 1 ? graph[ri + 1][i + 1] : undefined,
                    ri,
                    i
                };

                map.adjacents = () => [map.left(), map.top(), map.topLeft(), map.topRight(), map.right(), map.bottom(), map.bottomLeft(), map.bottomRight()].filter(f => f);

                return map;
            }));

            return result;
        }, []);

    return graph;
}

const set = getGraph(octopi);

let flashes = 0;

const flashOcto = (octo, flashed = []) => {
    const run = (octo) => {
        for (let row of octo) {
            for (let v of row) {
                v.value += 1;
            }
        }

        const flashing = octo.map(m => m.filter(f => flashed.indexOf(f) === -1 && f.value > 9));
        flashed.push(...flashing.flatMap(m => m));

        for (let f of flashing) {
            for (let v of f) {
                const adjacents = v.adjacents();
                run([adjacents]);
            }
        }
    }

    run(octo);
};

console.table(set.map(m => m.map(v => v.value)));

let foundStep = false;
let step = 1;

while (true) {
    flashOcto(set);

    const count = set.flatMap(f => f.filter(v => v.value > 9)).length;

    if (step <= 100) {
        flashes += count;
    }

    if (!foundStep && count === set.flatMap(f => f).length) {
        foundStep = true;
        console.log('Part 2', step);
        break;
    }

    set.forEach(row => row.forEach(octo => octo.value > 9 ? octo.value = 0 : null));

    step++;

    // console.table(set.map(m => m.map(v => v.value)));
}

console.log('Part 1:', flashes);