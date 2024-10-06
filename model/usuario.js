// models/Usuario.js
const connection = require('../database/db'); // Importa la conexión

// Clase Usuario que representa la entidad usuario
class Usuario {
    constructor(data) {
        this.ul_codigo = data.ul_codigo; // Código del usuario
        this.ul_usuario = data.ul_usuario; // Nombre de usuario
        this.ul_contra = data.ul_contra; // Contraseña
        this.ul_nombre = data.ul_nombre; // Nombre
        this.ul_apellido = data.ul_apellido; // Apellido
        this.ul_correo = data.ul_correo; // Correo electrónico
        this.ul_direccion = data.ul_direccion; // Dirección
        this.ul_telefono = data.ul_telefono; // Teléfono
        this.ul_rol = data.ul_rol; // Rol
        this.ul_estado = 'activo'; // Estado por defecto
    }

    // Método para guardar el usuario en la base de datos
    save(callback) {
        const query = 'INSERT INTO usuario (ul_codigo, ul_usuario, ul_contra, ul_nombre, ul_apellido, ul_correo, ul_direccion, ul_telefono, ul_rol, ul_estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const values = [this.ul_codigo, this.ul_usuario, this.ul_contra, this.ul_nombre, this.ul_apellido, this.ul_correo, this.ul_direccion, this.ul_telefono, this.ul_rol, this.ul_estado];

        connection.query(query, values, (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results.insertId); // Retorna el ID del nuevo usuario
        });
    }

    // Método estático para obtener el siguiente código de usuario
    static getNextCodigo(callback) {
        const query = 'SELECT MAX(CAST(ul_codigo AS UNSIGNED)) AS maxCodigo FROM usuario';
        connection.query(query, (error, results) => {
            if (error) {
                return callback(error);
            }

            const maxCodigo = results[0].maxCodigo;
            const nextCodigo = maxCodigo ? (parseInt(maxCodigo) + 1).toString().padStart(4, '0') : '0001'; // Si es nulo, empieza en 0001
            callback(null, nextCodigo);
        });
    }
}

module.exports = Usuario; // Exporta la clase Usuario
