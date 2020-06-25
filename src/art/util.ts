import { Container, Application } from 'pixi.js';

export function setupStage(app: Application, color: number, width: number, height: number): Application {
    if (!app || !document.querySelector('canvas')) {
        app = new Application({
            width: width,
            height: height,
            backgroundColor: color,
        });
        document.body.appendChild(app.view);
    } else {
        app.renderer.resize(width, height);
    }
    clearStage(app.stage);
    app.stage.scale.x = app.stage.scale.y = window.devicePixelRatio;
    return app;
}

export function center(stage: Container): void {
    stage.x = window.innerWidth / 2 - stage.width / 2;
    stage.y = window.innerHeight / 2 - stage.height / 2;
}

export function clearStage(stage: Container): void {
    for (let i = stage.children.length - 1; i >= 0; i--) {
        stage.removeChild(stage.children[i]);
    }
}

export function random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function mod(n: number, m: number): number {
    return ((n % m) + m) % m;
}
