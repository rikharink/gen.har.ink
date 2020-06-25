import ColorChangeFilter from '../filters/color/color-change';
import { Application, Graphics } from 'pixi.js';
import { clearStage } from './util';

let app: Application | undefined = undefined;

export function tiledLines(width: number, height: number, step: number): void {
    function draw(x: number, y: number, width: number, height: number) {
        const leftToRight = Math.random() >= 0.5;
        const line = new Graphics();
        line.lineStyle(4, 0xffffff, 1);
        if (leftToRight) {
            line.moveTo(x, y);
            line.lineTo(x + width, y + height);
        } else {
            line.moveTo(x + width, y);
            line.lineTo(x, y + height);
        }
        app.stage.addChild(line);
    }
    if (!app || !document.querySelector('canvas')) {
        app = new Application({
            width: width * window.devicePixelRatio,
            height: height * window.devicePixelRatio,
            backgroundColor: 0x000000,
        });
        document.body.appendChild(app.view);
    }
    clearStage(app.stage);
    const filter = new ColorChangeFilter();
    app.stage.filters = [filter];
    for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
            draw(x, y, step, step);
        }
    }
    requestAnimationFrame(filter.animate.bind(filter));
}
