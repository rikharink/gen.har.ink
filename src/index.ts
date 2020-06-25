import './styles/index.css';
import { tiledLines } from './art/tiled-lines';
import { joyDivision } from './art/joy-division';
import { cubicDisarray } from './art/cubic-disarray';
import { keyboard } from './keyboard';
const width = () => window.innerWidth * window.devicePixelRatio;
const height = () => window.innerHeight * window.devicePixelRatio;

function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}

const pieces = [
    () => tiledLines(width(), height(), random(8, 50)),
    () => joyDivision(Math.min(window.innerWidth, 300), 10, window.innerWidth > 400 ? 10 : 2, 10),
    () => cubicDisarray(width(), height(), window.innerWidth > 400 ? 30 : 60, 100),
];

let currentPiece = Math.floor(random(0, pieces.length - 1));
let piece = pieces[currentPiece];
window.onresize = piece;
piece();

const left = keyboard('ArrowLeft');
left.press = () => {
    document.body.innerHTML = '';
    currentPiece = mod(currentPiece - 1, pieces.length);
    piece = pieces[currentPiece];
    window.onresize = piece;
    piece();
};

const right = keyboard('ArrowRight');
right.press = () => {
    document.body.innerHTML = '';
    currentPiece = mod(currentPiece + 1, pieces.length);
    piece = pieces[currentPiece];
    window.onresize = piece;
    piece();
};
