const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const validaciones = require('../validaciones/validaciones');
const usuarioValidacion = require('../validaciones/UsuarioValidacion');
const conexion = require('../database/db');
const saltRounds = 10;







router.post('/registrar', async (req, res) => {

    const us_usuario = req.body.ul_usuario;
    const { ul_usuario, ul_contra, ul_nombre, ul_apellido, ul_perfil, ul_telefono, ul_rol, ul_correo, ul_direccion, ul_estado } = req.body;

    try {
        const maxUlCodigo = await usuarioValidacion.getMaxUlCodigo();

        const existe = await usuarioValidacion.verificarUsuario(ul_usuario);

        const codigo = validaciones.incrementarSecuencia(maxUlCodigo)

        const hashedPassword = await bcrypt.hash(ul_contra, saltRounds);
        if (existe !== undefined) {
            return res.status(400).json({ mensaje: 'El usuario ya existe.' });
        }

        const Usuario = {
            ul_codigo: codigo,
            ul_usuario: ul_usuario,
            ul_contra: ul_contra,
            ul_nombre: ul_nombre,
            ul_apellido: ul_apellido,
            ul_correo: ul_correo,
            ul_direccion: ul_direccion,
            ul_telefono: ul_telefono,
            ul_rol: ul_rol,
            ul_perfil: ul_perfil,
            ul_estado: ul_estado
        }
        const Login = {
            us_codigo: codigo,
            us_usuario: us_usuario,
            us_contra: hashedPassword,
            us_rol: ul_rol,
        }
        const insertarLogin = 'INSERT INTO login SET ?';
        const insertarUsuario = 'INSERT INTO usuario SET ?';
        conexion.query(insertarLogin, Login, (error) => {
            if (error) {
                return res.status(500).json({ message: 'Error al registrar el Login' });
            }
            conexion.query(insertarUsuario, Usuario, (error) => {
                if (error) {
                    return res.status(500).json({ message: 'Error al registrar el Usuario' });
                }
                return res.status(201).json({ message: 'Login y Usuario registrados correctamente' });
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
});

router.get('/listar', (req, res) => {
    const getUsersQuery = 'SELECT * FROM usuario';
    conexion.query(getUsersQuery, (error, results) => {
        if (error) {
            console.error('Error al obtener los usuarios:', error);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        res.status(200).json(results);
    });
});

router.get('/listar/:ul_codigo', (req, res) => {
    const { ul_codigo } = req.params;

    const getUserByCodigoQuery = 'SELECT * FROM usuario WHERE ul_codigo = ?';

    conexion.query(getUserByCodigoQuery, [ul_codigo], (error, results) => {
        if (error) {
            console.error('Error al obtener el usuario:', error);
            return res.status(500).json({ message: 'Error en el servidor' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(results);
    });
});
router.get('/listar/:ul_usuario', (req, res) => {
    const { ul_usuario } = req.params; 
    
    const getUserByUsuarioQuery = 'SELECT * FROM usuario WHERE ul_usuario = ?';
    
    conexion.query(getUserByUsuarioQuery, [ul_usuario], (error, results) => {
      if (error) {
        console.error('Error al obtener el usuario:', error);
        return res.status(500).json({ message: 'Error en el servidor' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      res.status(200).json(results);
    });
  });
  



module.exports = router;
