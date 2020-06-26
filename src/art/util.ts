import { Container, Application } from 'pixi.js';

export function width(): number {
    return window.innerWidth * window.devicePixelRatio;
}

export function height(): number {
    return window.innerHeight * window.devicePixelRatio;
}

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

export function center(container: Container, horizontal: boolean, vertical: boolean): void {
    if (horizontal) {
        container.x = window.innerWidth / 2 - container.width / 2;
    }
    if (vertical) {
        container.y = window.innerHeight / 2 - container.height / 2;
    }
}

export function clearStage(stage: Container): void {
    for (let i = stage.children.length - 1; i >= 0; i--) {
        stage.removeChild(stage.children[i]);
    }
}

export function random(min: number, max: number, predicate?: (n: number) => boolean): number {
    const result = Math.random() * (max - min) + min;
    if (!predicate || predicate(result)) {
        return result;
    }
    return random(min, max, predicate);
}

export function mod(n: number, m: number): number {
    return ((n % m) + m) % m;
}

/**
 * pack and unpack from: https://github.com/Jam3/int-bits/
 * The MIT License (MIT) Copyright (c) 2015 Jam3
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const int8 = new Int8Array(4);
const int32 = new Int32Array(int8.buffer, 0, 1);
const float32 = new Float32Array(int8.buffer, 0, 1);

export function pack(i: number): number {
    int32[0] = i;
    return float32[0];
}

export function unpack(f: number): number {
    float32[0] = f;
    return int32[0];
}

/**
 * rgbaToFloat from: https://github.com/Jam3/rgba-to-float
 * The MIT License (MIT) Copyright (c) 2015 Jam3
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
export function rgbaToFloat(r: number, g: number, b: number, a: number): number {
    const bits = (a << 24) | (b << 16) | (g << 8) | r;
    return pack(bits & 0xfeffffff);
}
