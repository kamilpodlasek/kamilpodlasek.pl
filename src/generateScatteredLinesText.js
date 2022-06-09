export function generateScatteredLinesText(
    {
        text,
        container,
        marginLeft,
        marginTop,
        charHeight,
        charWidth,
        strokeWidth,
        letterSpacing,
        index,
        url,
    },
    targetData,
) {
    const textLength = text.length;

    const data = targetData.map((letter, i) =>
        letter.map(targetLine => {
            const length = getLineLength(targetLine);

            const angle = (rand(0, 180) * Math.PI) / 180;

            const maxNewPointX = (textLength / 2 - i - 1) * charWidth;

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

    const delay = Math.sqrt(index) * 500;
    const duration = 1500;
    let transitionFinished = false;

    setTimeout(() => {
        transitionFinished = true;

        if (url) {
            container
                .append('rect')
                .on('click', onClick)
                .on('mouseover', onMouseOver)
                .on('mouseout', onMouseOut)
                .attr(
                    'transform',
                    (_d, i) =>
                        `translate(${letterSpacing * i + marginLeft + i * charWidth}, ${marginTop +
                            charHeight +
                            5})`,
                )
                .attr('width', 0)
                .attr('height', 1)
                .attr('fill', 'white')
                .transition()
                .duration(200)
                .attr('width', charWidth * textLength + letterSpacing * (textLength - 1));
        }
    }, delay + duration);

    const onClick = () => {
        if (!url || !transitionFinished) return;
        window.open(url, '_newtab' + Date.now());
        bg.attr('fill', 'transparent').style('cursor', 'default');
    };

    const onMouseOver = () => {
        if (!url || !transitionFinished) return;
        bg.attr('fill', 'red').style('cursor', 'pointer');
    };

    const onMouseOut = () => {
        if (!url || !transitionFinished) return;
        bg.attr('fill', 'transparent').style('cursor', 'default');
    };

    const bg = container
        .append('rect')
        .attr(
            'transform',
            (_d, i) => `translate(${letterSpacing * i + marginLeft + i * charWidth}, ${marginTop})`,
        )
        .attr('width', charWidth * textLength + letterSpacing * (textLength - 1))
        .attr('height', charHeight + 6)
        .on('click', onClick)
        .on('mouseover', onMouseOver)
        .on('mouseout', onMouseOut);

    container
        .append('g')
        .on('mouseover', onMouseOver)
        .on('mouseout', onMouseOut)
        .on('click', onClick)
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr(
            'transform',
            (_d, i) => `translate(${letterSpacing * i + marginLeft + i * charWidth}, ${marginTop})`,
        )
        .selectAll('line')
        .data(d => d.map(({ initial }) => initial))
        .enter()
        .append('line')
        .style('stroke-width', strokeWidth)
        .style('stroke', 'white')
        .attr('x1', ([[x1]]) => x1)
        .attr('y1', ([[_x1, y1]]) => y1)
        .attr('x2', ([_start, [x2]]) => x2)
        .attr('y2', ([_start, [_x2, y2]]) => y2)
        .data(d => d.map(({ target }) => target))
        .transition()
        .delay(delay)
        .duration(duration)
        .attr('x1', ([[x1]]) => x1)
        .attr('y1', ([[_x1, y1]]) => y1)
        .attr('x2', ([_start, [x2]]) => x2)
        .attr('y2', ([_start, [_x2, y2]]) => y2);
}

function getLineLength([[pointAx, pointAy], [pointBx, pointBy]]) {
    return Math.sqrt(Math.pow(pointBx - pointAx, 2) + Math.pow(pointBy - pointAy, 2));
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
