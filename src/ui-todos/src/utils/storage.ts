const keyExists = (key: string) => {
    return window.localStorage.getItem(key) !== null;
};

const persistByKey = (key: string, value: any) => {
    window.localStorage.setItem(key, JSON.stringify(value));
};

const fetchByKey = (key: string) => {
    return JSON.parse(window.localStorage.getItem(key) as string);
};

const removeByKey = (key: string): void => {
    window.localStorage.removeItem(key);
};

export { keyExists, persistByKey, fetchByKey, removeByKey };
