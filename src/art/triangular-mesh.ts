// import ColorChangeFilter from '../filters/color/color-change';
import { setupStage, center } from './util';
import { Application, Graphics, utils } from 'pixi.js';
import { Point } from './point';
import ColorChangeFilter from '../filters/color/color-change';

let app: Application;

export function triangularMesh(width: number, height: number, gap: number, randomness: number): void {
    app = setupStage(app, 0xffffff, width, height);

    const size = height;
    const lines: Point[][] = [];
    let odd = false;
    let line: Point[] = [];

    for (let y = 4; y <= size; y += gap) {
        odd = !odd;
        line = [];
        for (let x = 0; x <= size; x += gap) {
            line.push({
                x: x + Math.random() * randomness * gap + (odd ? gap / 2 : 0),
                y: y + Math.random() * randomness * gap,
            });
        }
        lines.push(line);
    }

    function drawTriangle(pointA: Point, pointB: Point, pointC: Point): void {
        const triangle = new Graphics();
        triangle.lineStyle(1, 0x000000, 1, 0.5);
        const gray = Math.random();
        const color = utils.rgb2hex([gray, gray, gray]);
        triangle.beginFill(color, 1);
        triangle.moveTo(pointA.x, pointA.y);
        triangle.lineTo(pointB.x, pointB.y);
        triangle.lineTo(pointC.x, pointC.y);
        triangle.lineTo(pointA.x, pointA.y);
        triangle.endFill();
        app.stage.addChild(triangle);
    }

    let dotLine;
    odd = true;

    for (let y = 0; y < lines.length - 1; y++) {
        odd = !odd;
        dotLine = [];
        for (let i = 0; i < lines[y].length; i++) {
            dotLine.push(odd ? lines[y][i] : lines[y + 1][i]);
            dotLine.push(odd ? lines[y + 1][i] : lines[y][i]);
        }
        for (let i = 0; i < dotLine.length - 2; i++) {
            drawTriangle(dotLine[i], dotLine[i + 1], dotLine[i + 2]);
        }
    }

    const filter = new ColorChangeFilter();
    app.stage.filters = [filter];
    center(app.stage, true, true);
}
