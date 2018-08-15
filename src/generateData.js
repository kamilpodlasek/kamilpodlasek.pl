const charsGenerator = {
    ' ': () => [],
    A: ({ h, w }) => [[0, h], [w / 2, 0], [w, h], [(w / 4) * 3, h / 2], [w / 4, h / 2]],
    C: ({ h, w }) => [[w, h], [0, h], [0, 0], [w, 0]],
    D: ({ h, w }) => [[0, h], [0, 0], [w, h / 4], [w, (h / 4) * 3], [0, h]],
    E: ({ h, w }) => [[w, h], [0, h], [0, h / 2], [w, h / 2], [0, h / 2], [0, 0], [w, 0]],
    I: ({ h, w }) => [[w / 2, h], [w / 2, 0]],
    J: ({ h, w }) => [[0, (h / 4) * 3], [0, h], [w, h], [w, 0]],
    K: ({ h, w }) => [[0, h], [0, 0], [0, h / 2], [w, 0], [0, h / 2], [w, h]],
    L: ({ h, w }) => [[0, 0], [0, h], [w, h]],
    M: ({ h, w }) => [[0, h], [0, 0], [w / 2, h / 2], [w, 0], [w, h]],
    O: ({ h, w }) => [[0, h], [0, 0], [w, 0], [w, h], [0, h]],
    P: ({ h, w }) => [[0, h], [0, 0], [w, 0], [w, h / 2], [0, h / 2]],
    R: ({ h, w }) => [[0, h], [0, 0], [w, 0], [w, h / 2], [0, h / 2], [w, h]],
    S: ({ h, w }) => [[0, h], [w, h], [w, h / 2], [0, h / 2], [0, 0], [w, 0]],
    T: ({ h, w }) => [[w / 2, h], [w / 2, 0], [0, 0], [w, 0]],
    V: ({ h, w }) => [[0, 0], [w / 2, h], [w, 0]],
};

export const generateData = (word, dimensions) =>
    Array.from(word.toUpperCase()).map(char => charsGenerator[char](dimensions));
