const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',       // Replace with your database host
  user: 'root',   // Replace with your database username
  password: '',   // Replace with your database password
  database: 'dbPointOfSale',   // Replace with your database name
});

module.exports = connection

//   connection.end((err) => {
//     if (err) {
//       console.error('Error closing the database connection: ', err);
//       return;
//     }
//     console.log('Connection closed');
//   });