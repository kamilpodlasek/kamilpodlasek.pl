import style from './style.css';
import { generateContainer } from './generateContainer';
import { generateText } from './generateText';

const body = document.querySelector('body');

const types = ['flashing', 'scatteredLines'];

const type = types[1];

const texts = [
    { text: 'Kamil', size: 'big', type },
    { text: 'Podlasek', size: 'big', type, marginBottom: 20 },
    { text: 'Software Engineer', type, size: 'medium', marginBottom: 50 },
    {
        text: 'LinkedIn',
        type,
        size: 'small',
        marginBottom: 16,
        url: 'https://linkedin.com/in/kamil-podlasek',
    },
    { text: 'GitHub', type, size: 'small', marginBottom: 16, url: 'https://github.com/kamilpodlasek' },
    {
        text: 'Resume',
        type,
        size: 'small',
        marginBottom: 16,
        url:
            'https://docs.google.com/document/d/1dyIF2xt77KIOdpDS3xRoB7kd7qWFVCRJpw_imPIPBis/edit?usp=sharing',
    },
];

const letterSpacings = {
    big: 14,
    medium: 10,
    small: 8,
};

const maxCharWidth = {
    big: 30,
    medium: 15,
    small: 10,
};

const minStrokeWidths = {
    big: 2,
    medium: 1,
    small: 1,
};

const marginLeft = 10;
const marginTop = 10;

initiatePage();

function initiatePage() {
    const { width, container } = generateContainer(body);

    const dimensions = {
        big: calculateDimensions('big', 70, width),
        medium: calculateDimensions('medium', 95, width),
        small: calculateDimensions('small', 120, width),
    };

    texts.reduce(
        (accMargin, { size, marginBottom = 0, ...params }, index) =>
            generateText({
                ...params,
                container,
                marginLeft,
                marginTop: accMargin,
                marginBottom,
                ...dimensions[size],
                index,
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
