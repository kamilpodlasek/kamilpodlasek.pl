import { generateContainer } from './generateContainer';
import { generateText } from './generateText';
import style from './style.css';

const container = generateContainer(document.querySelector('body'));

generateText({
    text: 'kamil',
    type: 'flashing',
    container,
    marginX: 30,
    marginY: 30,
    charHeight: 100,
    charWidth: 50,
    strokeWidth: 4,
    letterSpacing: 14,
});

generateText({
    text: 'podlasek',
    type: 'flashing',
    container,
    marginX: 30,
    marginY: 131,
    charHeight: 100,
    charWidth: 50,
    strokeWidth: 4,
    letterSpacing: 14,
});

generateText({
    text: 'javascript developer',
    type: 'flashing',
    container,
    marginX: 30,
    marginY: 261,
    charHeight: 50,
    charWidth: 25,
    strokeWidth: 2,
    letterSpacing: 10,
});

generateText({
    text: 'abcdefghijklmnopqrstuvwxyz .,-?!',
    type: 'scatteredLines',
    container,
    marginX: 30,
    marginY: 400,
    charHeight: 30,
    charWidth: 12,
    strokeWidth: 1,
    letterSpacing: 6,
});
