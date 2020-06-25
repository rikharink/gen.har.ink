import { Container } from 'pixi.js';

export function clearStage(stage: Container): void {
    for (let i = stage.children.length - 1; i >= 0; i--) {
        stage.removeChild(stage.children[i]);
    }
}
