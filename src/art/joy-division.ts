import { Application, Graphics, BLEND_MODES } from 'pixi.js';
import { clearStage } from './util';

interface Point {
    x: number;
    y: number;
}
let app: Application | undefined;
export function joyDivision(size: number, step: number, xOffset: number, yOffset: number): void {
    if (!app) {
        app = new Application({
            width: size,
            height: size,
            backgroundColor: 0xffffff,
            forceCanvas: true,
        });
        document.body.appendChild(app.view);
    }

    document.body.appendChild(app.view);
    const scale = Math.min(window.innerHeight / size, window.innerWidth / size);
    app.stage.scale.x = app.stage.scale.y = scale;
    clearStage(app.stage);
    const lines: Point[][] = [];
    for (let i = yOffset; i <= size - yOffset; i += step) {
        const line = [];
        for (let j = xOffset; j <= size - xOffset; j += step) {
            const distanceToCenter = Math.abs(j - size / 2);
            const variance = Math.max(size / 2 - 50 - distanceToCenter, 0);
            const random = ((Math.random() * variance) / 2) * -1;
            const point: Point = { x: j, y: i + random };
            line.push(point);
        }
        lines.push(line);
    }

    for (let i = 3; i < lines.length; i++) {
        const line = new Graphics();
        line.blendMode = BLEND_MODES.DST_OUT;
        line.lineStyle(2, 0x000000, 1);
        line.moveTo(lines[i][0].x, lines[i][0].y);
        let j: number;
        for (j = 0; j < lines[i].length - 2; j++) {
            const xc = (lines[i][j].x + lines[i][j + 1].x) / 2;
            const yc = (lines[i][j].y + lines[i][j + 1].y) / 2;
            line.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc);
        }
        line.quadraticCurveTo(lines[i][j].x, lines[i][j].y, lines[i][j + 1].x, lines[i][j + 1].y);
        line.x = window.innerWidth / 2 / scale - line.width / 2;
        line.y = window.innerHeight / 2 / scale - size / 2;
        app.stage.addChild(line);
    }
    app.renderer.resize(window.innerWidth, window.innerHeight);
}
