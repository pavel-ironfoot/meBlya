export const validationEntrance = (number: string)=>{
    let mistake ='';
    if (number === '') return 'порожнє поле';
    if (/^\d+$/.test(number)) return 'nomistake';
    if(!/^\d+$/.test(number)) mistake = 'тільки числа';
    return mistake;
}

export const validationEmail = (email:string) => {
    if (email === '') return 'порожнє поле'; 
    if (!(/^[a-zA-Z_.-1234567890]{1,32}@[a-z]{1,5}\.[a-z]{2,7}$/gi.test(email))) return 'invalid email';
    return 'nomistake';
}


export const validationConfirmToken = (token:string) =>{
    if(token === '') return 'порожнє поле';
    if(!(/^[^\s]{20}$/.test(token))) return 'Некоректний формат даних';
    return 'nomistake';
}


export function validPassword(password:string) {
    let mistakes = '';
    if (password === '') return 'порожнє поле';
    if ((/\s/gm.test(password))) {
        mistakes = mistakes + 'без пробілів, ';
    }
    if (!(/\S{8}/gi.test(password))) {
        mistakes = mistakes + 'добавте символів, ';
    }
    if (!(/[A-Z]/g.test(password))) {
        mistakes = mistakes + 'добавте великі літери, ';
    }
    if (!(/[a-z]/g.test(password))) {
        mistakes = mistakes + 'добавте маленькі літери, ';
    }
    if (!(/\d+/g.test(password))) {
        mistakes = mistakes + 'добавте цифри, ';
    }
    if (!(/[&|@.,><_\-\^+!%?\#$*]+/g.test(password))) {
        mistakes = mistakes + 'добавте спеціальні символи, '
    }
    return mistakes === '' ? 'nomistake' : mistakes;
}

export const validationNumber = (number:string) => {
    if (number === '') return ''; // return 'empty'
    if (!(/^\d\d{8}\d$/gi.test(number) || /^\d\d{10}\d$/gi.test(number))) return 'Некоректний формат даних ';
    if (/^\d\d{8}\d$/gi.test(number)) {
        if (!(/^0[3965][0123456789]\d{6}\d$/gm.test(number))) {
            return 'Некоректний формат даних ';
        } else {

        }
    } else if (/^\d\d{10}\d$/gi.test(number)) {
        if (!(/^380[3965][0123456789]\d{6}\d$/gm.test(number))) {
            return 'Некоректний формат даних ';
        }
    }
    return 'nomistake';
}

  export const validationNameKirLat = (name:string) => {
    if (name === '') return 'порожнє поле'; // return 'empty'
    if (/^[а-яА-Я]/.test(name)) {
        let mistake = '';
        if (name === '') return 'порожнє поле'; // return 'empty'
        if (/^[А-Я]/.test(name) && /[\wа-яА-Я]{2}/ig.test(name) && /^[а-я]*$/i.test(name)) return 'nomistake';
        if (!/^[А-Я]/.test(name)) mistake += 'перша літера має бути велика ';
        if (!/[\wа-яА-Я]{2}/ig.test(name)) mistake += 'більше літер '
        if (!/^[а-я]*$/i.test(name)) mistake += 'тільки кирилиця '
        return mistake;
      } else if (/^[a-zA-Z]/.test(name)) {
        let mistake = '';
        if (name === '') return 'порожнє поле'; // return 'empty'
        if (/^[A-Z]/.test(name) && /\w\w/ig.test(name) && /^[a-z]*$/i.test(name)) return 'nomistake';
        if (!/^[A-Z]/.test(name)) mistake += 'перша літера має бути велика ';
        if (!/\w\w/ig.test(name)) mistake += 'більше літер '
        if (!/^[a-z]*$/i.test(name)) mistake += 'тільки латиниця '
        return mistake;
      }
}

export const validationStreetKirLat = (name:string) => {

    if (/^[а-яА-Я]/.test(name)) {
        if (name === '') return 'порожнє поле';   
        if (/^[А-Я][а-я]{1,19}( [А-Я][а-я]{1,19}){0,2}$/.test(name)) return 'nomistake';
        return 'wrong input';
      } else if (/^[a-zA-Z]/.test(name)) {
        if (name === '') return 'порожнє поле';   
        if (/^[A-Z][a-z]{1,19}( [A-Z][a-z]{1,19}){0,2}$/.test(name)) return 'nomistake';
        return 'Некоректний формат даних';
      }
}