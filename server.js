const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const connection = require('./db')

const app = express();

// Enable CORS
app.use(cors());

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a MySQL connection
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'my_database',
// });

// Connect to the database
// connection.connect((error) => {
//   if (error) {
//     console.error('Error connecting to MySQL database: ', error);
//   } else {
//     console.log('Connected to MySQL database!');
//   }
// });

// Handle GET request to retrieve data
app.get('/data', (req, res) => {
  connection.query('SELECT * FROM callrecords', (error, results, fields) => {
    if (error) {
      console.error('Error retrieving data from MySQL database: ', error);
    } else {
      res.json(results);
    }
  });
});

// Handle POST request to add data
app.post('/data', (req, res) => {
  const { callDateFrom, callDateTo, phoneNumber, volunteerNumber, campaignId, agentId } = req.body;
  if (!callDateFrom || !callDateTo || !phoneNumber || !volunteerNumber || !campaignId || !agentId) {
    console.error('Invalid data provided for insertion into MySQL table.');
    return;
  }
  else{
    console.log("Data is valid...");
  }
  connection.query(
    `INSERT INTO callrecords (call_date_from, call_date_to, phone_number, volunteer_number, campaign_id, agent_id) VALUES ('${callDateFrom}', '${callDateTo}','${phoneNumber}', '${volunteerNumber}','${campaignId}', ${agentId})`,
    (error, results, fields) => {
      if (error) {
        console.error('Error adding data to MySQL database: ', error);
      } else {
        res.json({ message: 'Data singh added successfully!' });
      }
    }
  );
});

// Handle PUT request to update data
app.put('/data/:id', (req, res) => {
    const { name, age } = req.body;
    const { id } = req.params;
    connection.query(
      `UPDATE callrecords SET name = '${name}', age = ${age} WHERE id = ${id}`,
      (error, results, fields) => {
        if (error) {
          console.error('Error updating data in MySQL database: ', error);
        } else {
          res.json({ message: 'Data updated successfully!' });
        }
      }
    );
  });
  
  // Handle DELETE request to delete data
  app.delete('/data/:id', (req, res) => {
    const { id } = req.params;
    connection.query(`DELETE FROM my_table WHERE id = ${id}`, (error, results, fields) => {
      if (error) {
        console.error('Error deleting data from MySQL database: ', error);
      } else {
        res.json({ message: 'Data deleted successfully!' });
      }
    });
  });
  
  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });
  