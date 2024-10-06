function incrementarSecuencia(secuencia) {
    let alphaPart = secuencia.substring(0, secuencia.length - 2);
    let numericPart = secuencia.substring(secuencia.length - 2);

    try {
        let num = parseInt(numericPart, 10);
        num++;
        if (num > 99) {
            alphaPart = incrementarPrefijo(alphaPart);
            num = 0;
        }
        return alphaPart + num.toString().padStart(2, '0');
    } catch (e) {
        console.error(e);
        return null;
    }
}

function incrementarPrefijo(prefix) {
    let chars = prefix.split('');
    for (let i = chars.length - 1; i >= 0; i--) {
        if (chars[i] === 'Z') {
            chars[i] = 'A';
        } else {
            chars[i] = String.fromCharCode(chars[i].charCodeAt(0) + 1);
            break;
        }
    }
    return chars.join('');
}

// Exporta las funciones
module.exports = {
    incrementarSecuencia,
    incrementarPrefijo
};
