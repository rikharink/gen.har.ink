import { Maze } from './life-like';

describe('Life-like automata', () => {
    it('should get the correct cell', () => {
        const maze = new Maze(3, 3, 0, 0);
        maze.grid = [false, false, false, false, false, true, false, false, false];
        const cell = maze.getCell(2, 1);
        expect(cell).toBe(true);
    });

    it('should calculate the moore neighborhood with wrapping correctly', () => {
        const maze = new Maze(3, 3, 0, 0);
        maze.grid = [true, false, true, true, false, true, true, false, true];
        const n = maze.countNeighbours(2, 1);
        expect(n).toBe(5);
    });

    it('cell should be born with 3 neighbours and self dead', () => {
        const maze = new Maze(3, 3, 0, 0);
        maze.grid = [false, false, false, true, false, true, false, true, false];
        const born = maze.born(1, 1);
        expect(born).toBe(true);
    });

    it('cell shouldnt be born with 3 neighbours and self alive', () => {
        const maze = new Maze(3, 3, 0, 0);
        maze.grid = [false, false, false, true, true, true, false, true, false];
        const born = maze.born(1, 1);
        expect(born).toBe(false);
    });

    it('cell shouldnt be born with not enough neighbours', () => {
        const maze = new Maze(3, 3, 0, 0);
        maze.grid = [false, false, false, true, false, false, false, true, false];
        const born = maze.born(1, 1);
        expect(born).toBe(false);
    });

    it('cell shouldnt be born with too much neighbours', () => {
        const maze = new Maze(3, 3, 0, 0);
        maze.grid = [false, false, false, true, false, true, true, true, false];
        const born = maze.born(1, 1);
        expect(born).toBe(false);
    });

    it('cell shouldnt survive with too many neighbours', () => {
        const maze = new Maze(3, 3, 0, 0);
        maze.grid = [true, true, true, true, true, true, false, true, false];
        const survive = maze.born(1, 1);
        expect(survive).toBe(false);
    });

    it('should create a correct buffer', () => {
        const maze = new Maze(3, 3, 0, 0);
        maze.grid = [false, false, false, true, false, true, false, true, false];
        maze.updateBuffer();
        const expected = [
            maze.deadColor[0],
            maze.deadColor[1],
            maze.deadColor[2],
            maze.alpha,
            maze.deadColor[0],
            maze.deadColor[1],
            maze.deadColor[2],
            maze.alpha,
            maze.deadColor[0],
            maze.deadColor[1],
            maze.deadColor[2],
            maze.alpha,
            maze.aliveColor[0],
            maze.aliveColor[1],
            maze.aliveColor[2],
            maze.alpha,
            maze.deadColor[0],
            maze.deadColor[1],
            maze.deadColor[2],
            maze.alpha,
            maze.aliveColor[0],
            maze.aliveColor[1],
            maze.aliveColor[2],
            maze.alpha,
            maze.deadColor[0],
            maze.deadColor[1],
            maze.deadColor[2],
            maze.alpha,
            maze.aliveColor[0],
            maze.aliveColor[1],
            maze.aliveColor[2],
            maze.alpha,
            maze.deadColor[0],
            maze.deadColor[1],
            maze.deadColor[2],
            maze.alpha,
        ];

        const buffer = maze.buffer;
        expect(buffer.length).toBe(expected.length);
        for (let i = 0; i < buffer.length; i++) {
            expect(buffer[i]).toBeCloseTo(expected[i]);
        }
    });
});
