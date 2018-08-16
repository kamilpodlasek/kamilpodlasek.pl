import { generateContainer } from './generateContainer';
import { generateWord } from './generateWord';
import { generateLinesWord } from './generateLinesWord';
import style from './style.css';

const container = generateContainer(document.querySelector('body'));

generateWord({
    word: 'kamil',
    container,
    marginX: 30,
    marginY: 30,
    charHeight: 100,
    charWidth: 50,
    strokeWidth: 4,
    letterSpacing: 14,
});

generateWord({
    word: 'podlasek',
    container,
    marginX: 30,
    marginY: 131,
    charHeight: 100,
    charWidth: 50,
    strokeWidth: 4,
    letterSpacing: 14,
});

generateWord({
    word: 'javascript developer',
    container,
    marginX: 30,
    marginY: 261,
    charHeight: 50,
    charWidth: 25,
    strokeWidth: 2,
    letterSpacing: 10,
});

generateLinesWord({
    word: 'abcdefghijklmnopqrstuvwxyz .,-?!',
    container,
    marginX: 30,
    marginY: 400,
    charHeight: 30,
    charWidth: 12,
    strokeWidth: 1,
    letterSpacing: 6,
});
