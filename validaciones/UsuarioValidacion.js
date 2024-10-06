const conexion = require('../database/db');

//FUNCION DE TRAER EL ULTIMO CODIGO
function getMaxUlCodigo() {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT MAX(ul_codigo) AS maxCodigo FROM Usuario', (error, results) => {
            if (error) {
                return reject('Error en la consulta');
            }
            resolve(results[0]?.maxCodigo);
        });
    });
}
// REVISAR USUARIO
function verificarUsuario(usuario) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT * FROM usuario WHERE ul_usuario = ?', [usuario], (error, results) => {
            if (error) {
                return reject('Error en la consulta');
            }
            resolve(results[0]?.ul_usuario);
        });
    });
}
//VERIFICAR CORREO
function verificarCorreo(correo) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT * FROM usuario WHERE ul_correo = ?', [correo], (error, results) => {
            if (error) {
                return reject('Error en la consulta');
            }
            resolve(results[0]?.ul_correo);
        });
    });
}
// VERIFICAR TELEFONO
function verificarTelefono(telefono) {
    return new Promise((resolve, reject) => {
        conexion.query('SELECT * FROM usuario WHERE ul_telefono = ?', [telefono], (error, results) => {
            if (error) {
                return reject('Error en la consulta');
            }
            resolve(results[0]?.ul_telefono);
        });
    });
}
module.exports = { getMaxUlCodigo, verificarUsuario,verificarCorreo,verificarTelefono };
