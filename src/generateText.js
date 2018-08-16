import { generateData } from './generateData';
import { generateFlashingText } from './generateFlashingText';
import { generateScatteredLinesText } from './generateScatteredLinesText';

const textTypes = ['flashing', 'scatteredLines'];

const generators = {
    flashing: generateFlashingText,
    scatteredLines: generateScatteredLinesText,
};

export function generateText(config) {
    if (!textTypes.includes(config.type)) {
        return;
    }

    const data = generateData(config);

    generators[config.type](config, data);
}
