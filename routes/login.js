const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../database/db');


router.post('/login', async (req, res) => {
    try {
        const { us_usuario, us_contraseña } = req.body; // Changed variable names

        // Verifica si el nombre de usuario existe en la base de datos
        const getUserQuery = 'SELECT * FROM login WHERE us_usuario = ?'; // Updated SQL query
        connection.query(getUserQuery, [us_usuario], (error, results) => {
            if (error) {
                console.error('Error al buscar el usuario:', error);
                return res.status(500).json({ message: 'Error en el servidor' });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            const user = results[0];

            // Verifica la contraseña
            bcrypt.compare(us_contraseña, user.password, (error, result) => { // Updated to use us_contraseña
                if (error) {
                    console.error('Error al comparar contraseñas:', error);
                    return res.status(500).json({ message: 'Error en el servidor' });
                }

                if (!result) {
                    return res.status(401).json({ message: 'Credenciales inválidas' });
                }

                // Genera el token JWT
                const token = jwt.sign({ id: user.id }, 'secreto', { expiresIn: '1h' });

                res.status(200).json({ message: 'Inicio de sesión exitoso', token });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});
module.exports=router