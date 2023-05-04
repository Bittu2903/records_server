const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12616070',
  password: 'wFPYWFiFNM',
});

// Check if database exists, create it if it doesn't
// connection.query('CREATE DATABASE IF NOT EXISTS records', (error) => {
//   if (error) {
//     console.error('Error creating MySQL database: ', error);
//   } else {
//     console.log('MySQL database created successfully!');
//   }
// });

connection.query('USE sql12616070');

connection.query(
  'CREATE TABLE IF NOT EXISTS callrecords ( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, call_date_from DATE NOT NULL, call_date_to DATE NOT NULL, phone_number VARCHAR(20) NOT NULL, volunteer_number VARCHAR(20) NOT NULL, campaign_id INT NOT NULL, agent_id INT NOT NULL)',
  (error) => {
    if (error) {
      console.error('Error creating MySQL table: ', error);
    } else {
      console.log('MySQL table created successfully!');
    }
  }
);

module.exports = connection;
