import './styles/index.css';
import { tiledLines } from './art/tiled-lines';
import { cubicDisarray } from './art/cubic-disarray';
import { triangularMesh } from './art/triangular-mesh';
import { random, width, height } from './art/util';
import { amazing } from './art/amazing';

//TODO: better switch system that doesn't ruin performance
//TODO: responsiveness that doesn't ruin performance
const pieces = [
    () => tiledLines(width(), height(), random(8, 50)),
    () => cubicDisarray(width(), height(), window.innerWidth > 400 ? 30 : 60, 100),
    () => triangularMesh(width(), height(), width() / random(8, 25), random(0.2, 1)),
    () => amazing(400, 400, 42, 42),
];

const currentPiece = pieces.length - 1;
const piece = pieces[currentPiece];
piece();
