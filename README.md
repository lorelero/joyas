DESAFIO - TIENDA DE JOYAS
En este desafío se crea un API REST que permite limitar recursos, filtrar los recursos por campos, paginación, ordenamiento y estructura de datos HATEOAS.

Requerimientos:
Utiliza las siguientes instrucciones SQL para crear la base de datos joyas y una tabla inventario en PostgreSQL.

CREATE DATABASE joyas;

CREATE TABLE inventario (id SERIAL, nombre VARCHAR(50), categoria
VARCHAR(50), metal VARCHAR(50), precio INT, stock INT);

INSERT INTO inventario values
(DEFAULT, 'Collar Heart', 'collar', 'oro', 20000 , 2),
(DEFAULT, 'Collar History', 'collar', 'plata', 15000 , 5),
(DEFAULT, 'Aros Berry', 'aros', 'oro', 12000 , 10),
(DEFAULT, 'Aros Hook Blue', 'aros', 'oro', 25000 , 4),
(DEFAULT, 'Anillo Wish', 'aros', 'plata', 30000 , 4),
(DEFAULT, 'Anillo Cuarzo Greece', 'anillo', 'oro', 40000 , 2);
Comando para instalacion de dependencias.

npm i
Configuraciones:
Conexion con pg con la base de datos ./database/conexion.js

const pool = new Pool({
     host: 'localhost',
     user: 'your_user',
     password: 'your_password',
     database: 'joyas',
     port: 5432,
     allowExitOnIdle: true,
   });
Uso:
Se pueden utilizar los siguientes comandos.

npm run start
npm run dev