import ColorChangeFilter from '../filters/color/color-change';
import { setupStage } from './util';
import { Application, Graphics } from 'pixi.js';

let app: Application | undefined = undefined;

export function cubicDisarray(width: number, height: number, squareSize: number, padding: number): void {
    app = setupStage(app, 0x000000, width, height);
    const filter = new ColorChangeFilter();
    app.stage.filters = [filter];

    function draw(rotation: number, x: number, y: number, width: number, height: number) {
        const square = new Graphics();
        square.lineStyle(2, 0xffffff, 1);
        square.drawRect(-width / 2, -height / 2, width, height);
        square.x = x;
        square.y = y;
        square.rotation = rotation;
        app.stage.addChild(square);
    }

    for (let i = squareSize + padding; i <= height - squareSize - padding; i += squareSize) {
        for (let j = squareSize; j <= height - squareSize - padding; j += squareSize) {
            const randomDisplacement = 15;
            const rotateMultiplier = 20;
            const offset = 10;
            let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            const rotateAmt = (((j / width) * Math.PI) / 180) * plusOrMinus * Math.random() * rotateMultiplier;

            plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            const translateAmt = (j / width) * plusOrMinus * Math.random() * randomDisplacement;
            draw(rotateAmt, i + translateAmt + offset + (width - height) / 2, j + offset, squareSize, squareSize);
        }
    }
}
