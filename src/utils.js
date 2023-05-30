export const prettyDate = (date) => {
    const dObj = new Date(date.split('T')[0]);
    const [month, day, year] = [dObj.getMonth() + 1, dObj.getDate(), dObj.getFullYear()];
    const dString = `${month}/${day}/${year}`;
    return dString;
}

export const humanize = (str) => {
    const frags = str.split('_');
    for (let i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
}