const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../model/usuario');
const validaciones = require('../validaciones/validaciones');
const usuarioValidacion = require('../validaciones/UsuarioValidacion');
const conexion = require('../database/db');









router.post('/', async (req, res) => {
    // Imprime información sobre la solicitud
    console.log('Cuerpo de la solicitud (req.body):', req.body);
    console.log('Parámetros de la solicitud (req.params):', req.params);
    console.log('Consulta de la solicitud (req.query):', req.query);
    const us_usuario = req.body.us_usuario;
    try {
        const maxUlCodigo = await usuarioValidacion.getMaxUlCodigo();

        const existe = await usuarioValidacion.verificarUsuario(us_usuario);
        console.log('El máximo ul_codigo es:', maxUlCodigo);

        const codigo = validaciones.incrementarSecuencia(maxUlCodigo)
        console.log("este es el username :  "+existe)

        if (existe !== undefined) {
            return res.status(400).json({ mensaje: 'El usuario ya existe.' });
        }

        return res.status(200).json({ mensaje: 'El usuario no existe.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
});


module.exports = router;
