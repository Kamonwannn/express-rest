var express = require('express');
var app = express();
var db = require('./database');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
extended: true

}));

//add routing
// index page
//use function res
app.get('/', function (req, res) {
res.send('Express is running');
});


app.get('/api/json', function (req, res) {
res.json({
status: 'success', 
message: 'REST API is working'  
});
});

app.get('/api/products/',db.getAllProducts);

//สร้างเราติ่งใหม่
app.get('/api/products/:id', db.getProductByID);

app.post('/api/products', db.insertProducts);

app.put('/api/products/:id', db.updateProduct);

app.delete('/api/products/:id', db.deleteProduct);

//port server
var port = process.env.PORT || 8080;
app.listen(port, function () {
console.log('App is running on http://localhost:' + port);
});

