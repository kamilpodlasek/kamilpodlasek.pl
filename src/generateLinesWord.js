import { generateData } from './generateData';

export function generateLinesWord({
    word,
    container,
    marginX,
    marginY,
    charHeight,
    charWidth,
    strokeWidth,
    letterSpacing,
}) {
    const wordLength = word.length;

    const data = generateData(word, { h: charHeight, w: charWidth }, 'charsLines').map((letter, i) =>
        letter.map(targetLine => {
            const [[pointAx, pointAy], [pointBx, pointBy]] = targetLine;

            const length = Math.sqrt(Math.pow(pointBx - pointAx, 2) + Math.pow(pointBy - pointAy, 2));

            const angle = (rand(0, 180) * Math.PI) / 180;

            const maxNewPointX = (wordLength / 2 - i - 1) * charWidth;

            const newPointA = [rand(0, maxNewPointX), rand(0, charHeight)];

            const newPointB = [
                Math.cos(angle) * length + newPointA[0],
                Math.sin(angle) * length + newPointA[1],
            ];

            return {
                initial: [newPointA, newPointB],
                target: targetLine,
            };
        }),
    );

    const lines = container
        .append('g')
        .on('mouseover', () => handleMouseOver(lines))
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr(
            'transform',
            (_d, i) => `translate(${letterSpacing * i + marginX + i * charWidth}, ${marginY})`,
        )
        .selectAll('line')
        .data(d => d.map(({ initial }) => initial))
        .enter()
        .append('line')
        .style('stroke-width', strokeWidth)
        .style('stroke', 'white');

    setLinesAttrs(lines);
}

function setLinesAttrs(lines) {
    lines
        .attr('x1', ([[x1]]) => x1)
        .attr('y1', ([[_x1, y1]]) => y1)
        .attr('x2', ([_start, [x2]]) => x2)
        .attr('y2', ([_start, [_x2, y2]]) => y2);
}

function handleMouseOver(lines) {
    setLinesAttrs(
        lines
            .data(d => d.map(({ target }) => target))
            .transition()
            .duration(1500),
    );
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
