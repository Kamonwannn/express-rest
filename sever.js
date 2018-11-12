var express = require('express');
var app = express();
var db = require('./database');
var home = require('home')
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true

}));

//add routing
// index page
//use function res
app.use(home())
app.get('/', function (req, res) {
res.send('Express is running ProjectS');
});


// app.get('/api/json', function (req, res) {
// res.json({
// status: 'success', 
// message: 'REST API is working'  
// });
// });
///Product
app.get('/api/products',db.getAllProducts);

app.get('/api/products/:id', db.getProductByID);

app.post('/api/products', db.insertProducts);

app.put('/api/products/:id', db.updateProduct);

app.delete('/api/products/:id', db.deleteProduct);

// Users
app.get('/api/users', db.getAllUsers);

app.get('/api/users/:id', db.getAllUsersByID);

app.post('/api/users', db.insertUsers);

app.put('/api/users/:id', db.updateUsers);

app.delete('/api/users/:id', db.deleteUsers);



//port server
var port = process.env.PORT || 8080;
app.listen(port, function () {
console.log('App is running on http://localhost:' + port);
});

