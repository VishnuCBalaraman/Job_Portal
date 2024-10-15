const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const PORT=3001;

app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Your MySQL username
    password: 'pass@word1',  // Your MySQL password
    database: 'users'
});
  
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});



// Get All Users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Add a User
app.post('/users', (req, res) => {
    const { userId,userName, userJobId } = req.body;

    const sql = 'INSERT INTO users (userId,userName, userJobId) VALUES (?,?, ?)';
    const values = [userId , userName, userJobId];

    db.query(sql, values, (err, result) => {
        if (err) throw err;
        res.send('User added successfully!');
    });
});

// Get a User by userId
app.get('/users/:userId', (req, res) => {
    const sql = 'SELECT * FROM users WHERE userId = ?';
    db.query(sql, [req.params.userId], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Get Users by userJobId
app.get('/users/job/:userJobId', (req, res) => {
    const sql = 'SELECT * FROM users WHERE userJobId = ?';
    db.query(sql, [req.params.userJobId], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


//Delete a user
app.delete('/users/:userId', (req,res)=>{
    const sql = 'DELETE FROM users WHERE userId=?';
    db.query(sql,[req.params.userId],(err,result)=>{
        if(err) throw err;
        res.send('User deleted successfully!');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});