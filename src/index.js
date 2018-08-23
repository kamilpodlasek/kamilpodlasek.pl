import style from './style.css';
import { generateContainer } from './generateContainer';
import { generateText } from './generateText';

const body = document.querySelector('body');

const types = ['flashing', 'scatteredLines'];

const type = types[Math.round(Math.random())];

const texts = [
    { text: 'Kamil', size: 'big', type },
    { text: 'Podlasek', size: 'big', type, marginBottom: 20 },
    { text: 'JavaScript Developer', type, size: 'medium' },
];

const letterSpacings = {
    big: 14,
    medium: 10,
};

const maxCharWidth = {
    big: 30,
    medium: 15,
};

const minStrokeWidths = {
    big: 2,
    medium: 1,
};

const marginLeft = 10;
const marginTop = 10;

initiatePage();

window.addEventListener('resize', initiatePage);

function initiatePage() {
    const { width, container } = generateContainer(body);

    const dimensions = {
        big: calculateDimensions('big', 70, width),
        medium: calculateDimensions('medium', 95, width),
    };

    texts.reduce(
        (accMargin, { size, marginBottom = 0, ...params }) =>
            generateText({
                ...params,
                container,
                marginLeft,
                marginTop: accMargin,
                marginBottom,
                ...dimensions[size],
            }),
        marginTop,
    );
}

function calculateDimensions(size, textWidth, containerWidth) {
    const charsHorizontal = Math.max(
        ...texts.filter(({ size: currentSize }) => currentSize === size).map(({ text }) => text.length),
    );

    const availableWidth =
        (containerWidth / 100) * textWidth - 2 * marginLeft - letterSpacings[size] * charsHorizontal;

    const charWidth = Math.min(maxCharWidth[size], availableWidth / charsHorizontal);

    return {
        charWidth,
        charHeight: charWidth * 3,
        strokeWidth: Math.max(charWidth / 14, minStrokeWidths[size]),
        letterSpacing: letterSpacings[size],
    };
}
