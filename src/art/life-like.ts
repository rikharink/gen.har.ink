import { Color } from 'three';
export class LifeLike {
    public grid: boolean[] = [];
    private width: number;
    private height: number;
    private b: number[];
    private s: number[];
    public buffer: Uint8Array;

    public aliveColor: Color = new Color('#FFFFFF');
    public deadColor: Color = new Color('#000000');
    public alpha = 1;
    public iterations = 0;

    constructor(b: number[], s: number[], width: number, height: number, aliveColor?: Color, deadColor?: Color) {
        this.b = b;
        this.s = s;
        this.width = width;
        this.height = height;
        this.buffer = new Uint8Array(this.width * this.height * 3);
        if (aliveColor) {
            this.aliveColor = aliveColor;
        }
        if (deadColor) {
            this.deadColor = deadColor;
        }
    }

    public setBuffer(x: number, y: number, alive: boolean): void {
        const color = alive ? this.aliveColor : this.deadColor;
        this.buffer[y * 3 * this.width + x * 3] = color.r * 255;
        this.buffer[y * 3 * this.width + x * 3 + 1] = color.g * 255;
        this.buffer[y * 3 * this.width + x * 3 + 2] = color.b * 255;
    }

    public step(): void {
        this.iterations++;
        const updateGrid: boolean[] = [];
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const b = this.born(x, y);
                const s = this.survive(x, y);
                const alive = b || s;
                updateGrid[y * this.width + x] = alive;
                this.setBuffer(x, y, alive);
            }
        }
        this.grid = updateGrid;
    }

    public getCell(x: number, y: number): boolean {
        return this.grid[y * this.width + x];
    }

    public setCell(x: number, y: number, value: boolean): void {
        this.grid[y * this.width + x] = value;
    }

    public born(x: number, y: number): boolean {
        return !this.getCell(x, y) && this.b.indexOf(this.countNeighbours(x, y)) !== -1;
    }

    public survive(x: number, y: number): boolean {
        return this.getCell(x, y) && this.s.indexOf(this.countNeighbours(x, y)) != -1;
    }

    public countNeighbours(x: number, y: number): number {
        const left = x - 1 >= 0 ? x - 1 : this.width - 1;
        const right = x + 1 < this.width ? x + 1 : 0;
        const up = y + 1 < this.height ? y + 1 : 0;
        const down = y - 1 >= 0 ? y - 1 : this.height - 1;
        return [
            this.getCell(left, down),
            this.getCell(x, down),
            this.getCell(right, down),
            this.getCell(left, y),
            this.getCell(right, y),
            this.getCell(left, up),
            this.getCell(x, up),
            this.getCell(right, up),
        ].filter((n) => n).length;
    }
}

export class Maze extends LifeLike {
    constructor(
        width: number,
        height: number,
        widthSeed: number,
        heightSeed: number,
        aliveColor?: Color,
        deadColor?: Color,
    ) {
        super([3], [1, 2, 3, 4, 5], width, height, aliveColor, deadColor);
        this.seedGrid(width, height, widthSeed, heightSeed);
    }

    private seedGrid(width: number, height: number, widthSeed: number, heightSeed: number, threshold = 0.75): void {
        if (widthSeed % 2 !== 0 || heightSeed % 2 !== 0) {
            throw new Error('width and height of the seed must be even');
        }
        const halfX = Math.floor(width / 2);
        const halfY = Math.floor(height / 2);
        for (let y = halfY - heightSeed / 2; y <= halfY + heightSeed / 2; y++) {
            for (let x = halfX - widthSeed / 2; x <= halfX + widthSeed / 2; x++) {
                this.setCell(x, y, Math.random() > threshold);
            }
        }
    }
}
