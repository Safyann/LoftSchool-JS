function slice(array, from, to) {
    const newArr = [];

    if (to === undefined || to > array.length) {
        to = array.length
    }

    if (to < 0) {
        to = array.length + to;
    }

    if (from === undefined || from < 0) {
        from = 0;
    }

    for (let i = from; i < to; i++) {
        newArr.push(array[i]);
    }

    return newArr;
}

let array = [1, 2, 3, 4, 5, 6, 7];

console.log(slice(array, -999, -4))