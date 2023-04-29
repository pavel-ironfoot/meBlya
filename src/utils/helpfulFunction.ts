export const divideArr = (arr: string[]): [string, string] => {
    const first: string[] = [];
    const second: string[] = [];
    arr.map((elem) => {
        let d = elem.split(' ');
        first.push(d[0])
        second.push(d[1])
    });
    return [first.join(','), second.join(',')];
}

export const recomendationFour = () => {
    return Math.floor(Math.random()*9+4) 
}