export function compareObject(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function setValueFromStorage(key, value) {
    sessionStorage.setItem(key, JSON.stringify({ value }));
}

export function getValueFromStorage(key) {
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored).value : null;
}


export function cloneArray(array) {
    return array.slice();
}