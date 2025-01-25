export function getPassword(length, lowercase, uppercase, number, symbol){
    const lowercases = 'abcdefghijkmnopqrstuvwxyz';
    const uppercases = 'ABCDEFGHIJKMNOPQRSTUWXYZ';
    const numbers = '1234567890';
    const symbols = '--------';
    let allowChars = '';

    allowChars += lowercase ? lowercases : '';
    allowChars += uppercase ? uppercases : '';
    allowChars += number ? numbers : '';
    allowChars += symbol ? symbols : '';

    if(allowChars.length < 1){
        console.log('You must enter at least 1');
        return '';
    }
    let password = '';
    for(let i=0; i<length; i++){
        let random = Math.floor(Math.random() * allowChars.length) + 1;
        password += allowChars[random];
    }
    return password;
}