export const validationName = (name:string) => {
    let mistake = '';
    if (name === '') return 'empty'; // return 'empty'
    if (/^[A-Z]/.test(name) && /\w\w/ig.test(name) && /^[a-z]*$/i.test(name)) return 'nomistake';
    if (!/^[A-Z]/.test(name)) mistake += 'small first letter, ';
    if (!/\w\w/ig.test(name)) mistake += 'more letters, '
    if (!/^[a-z]*$/i.test(name)) mistake += 'only latins letters, '
    return mistake;
}


export const validationEntrance = (number: string)=>{
    let mistake ='';
    if (number === '') return 'empty';
    if(!/^\d+$/.test(number)) mistake = 'only number';
    return mistake;
}


export const validationEmail = (email:string) => {
    if (email === '') return 'empty'; // return 'empty'
    if (!(/^\w[\w\d]*@\w+\.\w+$/gi.test(email))) return 'invalid email';
    return 'nomistake';
}

export const validationConfirmToken = (token:string) =>{
    if(token === '') return 'empty';
    if(!(/^[^\s]{20}$/.test(token))) return 'wrong token';
    return 'nomistake';
}

// let str = '12345678901234567890'

export function validPassword(password:string) {
    let mistakes = '';
    if (password === '') return 'empty'; // return 'empty'
    if ((/\s/gm.test(password))) {
        mistakes = mistakes + 'no space, ';
    }
    if (!(/\S{8}/gi.test(password))) {
        mistakes = mistakes + 'more symbols, ';
    }
    if (!(/[A-Z]/g.test(password))) {
        mistakes = mistakes + 'add big letters, ';
    }
    if (!(/[a-z]/g.test(password))) {
        mistakes = mistakes + 'add small letters, ';
    }
    if (!(/\d+/g.test(password))) {
        mistakes = mistakes + 'add digits, ';
    }
    if (!(/[!%?#$*]+/g.test(password))) {
        mistakes = mistakes + 'add special characters, '
    }
    return mistakes === '' ? 'nomistake' : mistakes;
}

export const validationNumber = (number:string) => {
    if (number === '') return ''; // return 'empty'
    if (!(/^\d\d{8}\d$/gi.test(number) || /^\d\d{10}\d$/gi.test(number))) return 'wrong length, ';
    if (/^\d\d{8}\d$/gi.test(number)) {
        if (!(/^0[96][3687]\d{6}\d$/gm.test(number))) {
            return 'invalid number10, ';
        } else {

        }
    } else if (/^\d\d{10}\d$/gi.test(number)) {
        if (!(/^380[96][3687]\d{6}\d$/gm.test(number))) {
            return 'invalid number12, ';
        }
    }
    return 'nomistake';
}

export const validationNameKir = (name:string) => {
    let mistake = '';
    if (name === '') return 'empty'; // return 'empty'
    if (/^[А-Я]/.test(name) && /[\wа-яА-Я]{2}/ig.test(name) && /^[а-я]*$/i.test(name)) return 'nomistake';
    if (!/^[А-Я]/.test(name)) mistake += 'small first letter, ';
    if (!/[\wа-яА-Я]{2}/ig.test(name)) mistake += 'more letters, '
    if (!/^[а-я]*$/i.test(name)) mistake += 'only kirillitsa letters, '
    return mistake;
}


  export const validationNameKirLat = (name:string) => {

    if (/^[а-яА-Я]/.test(name)) {
        let mistake = '';
        if (name === '') return 'empty'; // return 'empty'
        if (/^[А-Я]/.test(name) && /[\wа-яА-Я]{2}/ig.test(name) && /^[а-я]*$/i.test(name)) return 'nomistake';
        if (!/^[А-Я]/.test(name)) mistake += 'small first letter, ';
        if (!/[\wа-яА-Я]{2}/ig.test(name)) mistake += 'more letters, '
        if (!/^[а-я]*$/i.test(name)) mistake += 'only kirillitsa letters, '
        return mistake;
      } else if (/^[a-zA-Z]/.test(name)) {
        let mistake = '';
        if (name === '') return 'empty'; // return 'empty'
        if (/^[A-Z]/.test(name) && /\w\w/ig.test(name) && /^[a-z]*$/i.test(name)) return 'nomistake';
        if (!/^[A-Z]/.test(name)) mistake += 'small first letter, ';
        if (!/\w\w/ig.test(name)) mistake += 'more letters, '
        if (!/^[a-z]*$/i.test(name)) mistake += 'only latins letters, '
        return mistake;
      }
}

export const validationStreetKirLat = (name:string) => {

    if (/^[а-яА-Я]/.test(name)) {
        if (name === '') return 'empty';   
        if (/^[А-Я][а-я]{1,19}( [А-Я][а-я]{1,19}){0,2}$/.test(name)) return 'nomistake';
        return 'wrong input';
      } else if (/^[a-zA-Z]/.test(name)) {
        if (name === '') return 'empty';   
        if (/^[A-Z][a-z]{1,19}( [A-Z][a-z]{1,19}){0,2}$/.test(name)) return 'nomistake';
        return 'wrong input';
      }
}