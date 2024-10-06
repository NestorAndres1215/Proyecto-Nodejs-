const mysql = require('mysql2');


const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'bd_peliculas', // Cambia esto por el nombre de tu base de datos
};

const conexion = mysql.createConnection(dbConfig);

// Conectar a la base de datos
conexion.connect((error)=>{
    if(error){
        console.log('Error:'+error);
    }
    else{
        console.log('conexion exitosa');
    }
});

module.exports = conexion;

   
  


