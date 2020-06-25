import { Filter } from 'pixi.js';
import VERT from '../default.vert';
import FRAG from './color-change.frag';

export default class ColorChangeFilter extends Filter {
    constructor() {
        super(VERT, FRAG);
        this.uniforms.iTime = {
            type: 'f',
            value: 0.0,
        };
    }

    animate(time: number): void {
        requestAnimationFrame(this.animate.bind(this));
        this.time = time;
    }

    set time(time: number) {
        const t = time / 1000;
        this.uniforms.iTime = t;
    }
}
