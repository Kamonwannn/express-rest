const pgp = require('pg-promise')();
var db = pgp('postgres://lsfslknfpvrgaz:6efc58bd43c601443f09c95dca57f51278a998fe274e1c9d69f054030fcf87f1@ec2-54-204-14-96.compute-1.amazonaws.com:5432/dcv9p2da8fcels?ssl=true');

//all products
function getAllProducts(req, res) {
    db.any('select * from products')
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved ALL products'
                });
        })
        .catch(function (error) {
            res.status(500).json({
                status: 'failed',
                message: 'REST API is NOT working'
            });
        })
    }

//product id
function getProductByID(req, res) {
    db.any('select * from products where id =' + req.params.id)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved products id:' +
                        req.params.id
                });
        })
        .catch(function (error) {
            res.status(500).json({
                status: 'failed',
                message: 'REST API is NOT working'
            });
        })
}

//insert product
function insertProduct(req, res) {
    db.none('insert into products(id, title, price, created_at, tags)' +
        'values(${id}, ${title}, ${price}, ${created_at}, ${tags})',
        req.body)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one product'
                });
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        })
}
//delete product
function deleteProduct(req, res) {
    db.any('DELETE FROM products where id =' + req.params.id)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved products id:' +
                        req.params.id
                });
        })
        .catch(function (error) {
            res.status(500).json({
                status: 'failed',
                message: 'REST API is NOT working'
            });
        })
}

//update product
function updateProduct(req, res) {
    db.any(`update products set title = '${title}',price=${price} where id = ${id}`)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved products id:' +
                        req.params.id
                });
        })
        .catch(function (error) {
            res.status(500).json({
                status: 'failed',
                message: 'REST API is NOT working'
            });
        })
}


module.exports = {
    getAllProducts,
    getProductByID,
    insertProduct,
    updateProduct,
    deleteProduct
};