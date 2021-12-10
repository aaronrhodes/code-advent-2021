import { lines } from './data.js';
import fs from 'fs';

const minX = Math.min(...lines.map(m => m[0].x), ...lines.map(m => m[1].x));
const minY = Math.min(...lines.map(m => m[0].y), ...lines.map(m => m[1].y));
const maxX = Math.max(...lines.map(m => m[0].x), ...lines.map(m => m[1].x));
const maxY = Math.max(...lines.map(m => m[0].y), ...lines.map(m => m[1].y));

console.log(minX, maxX, minY, maxY)

const matrix = [...Array(maxX + 1)].map(m => [...Array(maxY + 1).keys()].map(m => 0));

lines
    .filter(f => f[0].x === f[1].x || f[0].y === f[1].y)
    .forEach(line => {
        let x = line[0].x, y = line[0].y;
        while (x < line[1].x || y < line[1].y) {
            matrix[x][y] = matrix[x][y] + 1;
            if (x < line[1].x) x++; 
            if (y < line[1].y) y++;
        }

        matrix[x][y] = matrix[x][y] + 1;

        // for (let x = line[0].x; x <= line[1].x; x++) {
        //     for (let y = line[0].y; y <= (line[1].y); y++) {
        //         console.log(x,y)
        //         matrix[x][y] = matrix[x][y] + 1;
        //     }
        // }
    });

const sum = matrix.reduce((sum, line) => {
    return sum + line.filter(f => f > 1).length;
}, 0);

console.log(sum);

fs.writeFileSync('./results.txt', matrix.map(m => m.join(' ')).join('\n'));