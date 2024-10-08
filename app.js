const express = require('express');
const app = express();
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/Usuario');
const cors = require('cors'); // Importa el paquete CORS

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//const usersRouter = require('./routes/users'); 
//app.use('/users', usersRouter); 
app.use(cors()); // Habilita CORS para todas las rutas
app.use('/usuario', registerRouter);
app.use('/login', loginRouter);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

