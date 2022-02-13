export class Vertex {
    constructor(adjacencyInfo = null, nextVertex = null, weight = null) {
        this.adjacencyInfo = adjacencyInfo;
        this.nextVertex = nextVertex;
        this.weight = weight;
    }
}

export class Queue {
    queue = [];

    enqueue(item) {
        this.queue.push(item);
    }

    dequeue() {
        return this.queue.shift();
    }

    get length() {
        return this.queue.length;
    }
}

const MAX_VERTICES = 10; // can be any number
const PROCESSED = new Array(MAX_VERTICES);
const VISITED = new Array(MAX_VERTICES);
const PARENTS = new Array(MAX_VERTICES);

export class Graph {
    constructor(hasDirection) {
        this.connections = new Array(MAX_VERTICES).fill(null);
        this.degrees = new Array(MAX_VERTICES).fill(0);
        this.edges = 0;
        this.isDirected = hasDirection;
        this.vertices = 0;
    }

    insert(vertexStart, vertexEnd) {
        let vertex = new Vertex(vertexEnd, this.connections[vertexStart]);
        this.connections[vertexStart] = vertex;
        this.degrees[vertexStart] += 1;

        if (this.isDirected) {
            this.edges += 1;
        } else {
            this.insert(vertexEnd, vertexStart);
        }
    }

    print() {
        for (let i = 0; i < this.connections.length; i++) {
            console.log(`${i}: `);
            let connection = this.connections[i];

            while (connection) {
                console.log(` ${connection.adjacencyInfo}`);
                connection = connection.next;
            }

            console.log('\n'); // new line for clarity
        }
    }

    bfs(startVertex) {
        let visitQueue = new Queue();
        let currentVertex, nextVertex, tempVertex;

        visitQueue.enqueue(startVertex);
        VISITED[startVertex] = true;

        while (visitQueue.length > 0) {
            currentVertex = visitQueue.dequeue();
            console.log("PRE-PROCESSED!");
            PROCESSED[currentVertex] = true;
            tempVertex = this.connections[currentVertex];

            while (tempVertex) {
                nextVertex = tempVertex.adjacencyInfo;

                if (!PROCESSED[nextVertex] || this.isDirected) {
                    console.log(`PROCESSED EDGE ${currentVertex}=>${nextVertex}`);
                }

                if (!VISITED[nextVertex]) {
                    visitQueue.enqueue(nextVertex);
                    VISITED[nextVertex] = true;
                    PARENTS[nextVertex] = currentVertex;
                }

                tempVertex = tempVertex.nextVertex;
            }

            console.log("POST-PROCESSED");
        }
    }
}