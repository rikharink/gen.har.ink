import './styles/index.css';
import { tiledLines } from './art/tiled-lines';
import { cubicDisarray } from './art/cubic-disarray';
import { keyboard } from './keyboard';
import { triangularMesh } from './art/triangular-mesh';
import { mod, random } from './art/util';
const width = () => window.innerWidth * window.devicePixelRatio;
const height = () => window.innerHeight * window.devicePixelRatio;

const pieces = [
    () => tiledLines(width(), height(), random(8, 50)),
    () => cubicDisarray(width(), height(), window.innerWidth > 400 ? 30 : 60, 100),
    () => triangularMesh(width(), height(), width() / random(8, 25), random(0.2, 1)),
];

// let currentPiece = Math.floor(random(0, pieces.length - 1));
let currentPiece = pieces.length - 1;
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
