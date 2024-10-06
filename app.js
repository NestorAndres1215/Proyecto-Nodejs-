const express = require('express');
const app = express();
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/registro');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//const usersRouter = require('./routes/users'); 
//app.use('/users', usersRouter); 
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});

