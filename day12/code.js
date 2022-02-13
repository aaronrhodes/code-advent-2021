import { Graph } from './graph.js';
import { sample as data } from './data.js';

const graph = new Graph(true);

const dataMap = Object.keys(data.reduce((result, item) => {
    item.forEach(f => result[f] = f);
    return result;
}, {}));

console.log(dataMap.map((m, i) => ({ m, i })));

data.forEach(path => {
    graph.insert(dataMap.indexOf(path[0]), dataMap.indexOf(path[1]));
});

graph.bfs(dataMap.indexOf('start'));