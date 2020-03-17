export const generateId = ((index = 0) => () => (index++).toString())();

export const createModalEvent = (args = {}) => {
    return {
        id: generateId(),
        timestamp: Date.now(),
        canceled: false,
        ...args,
    };
};
export const inRange = (from, to, value) => {
    return value < from ? from : value > to ? to : value;
};

export const stringStylesToObject = styles => {
    const lines = styles
        .split(';')
        .map(line => line.trim())
        .filter(Boolean);
    const entries = lines.map(line => line.split(':'));

    return entries.reduce((styles, [key, value]) => {
        return { ...styles, [key]: value };
    }, {});
};

export const windowWidthWithoutScrollbar = () => {
    const { innerWidth } = window;
    const { clientWidth } = document.documentElement;

    if (innerWidth && clientWidth) {
        return Math.min(innerWidth, clientWidth);
    }

    return clientWidth || innerWidth;
};
