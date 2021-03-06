const pgp = require('pg-promise')();
var db = pgp('postgres://lsfslknfpvrgaz:6efc58bd43c601443f09c95dca57f51278a998fe274e1c9d69f054030fcf87f1@ec2-54-204-14-96.compute-1.amazonaws.com:5432/dcv9p2da8fcels?ssl=true');

//PRODUCTS
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

//get product id
function getProductByID(req, res) {
    db.any(`select * from products where id = ${req.params.id}`)
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
            console.log('ERROR:', error)
        })
}

//insert product
function insertProducts(req, res) {
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
    db.none('delete from products where id =' + req.params.id,
    req.body)
    .then(function (data) {
        res.status(200)
            .json({
                status: 'success',
                message: 'Deleted one product'
            });
    })
    .catch(function (error) {
        console.log('ERROR:', error)
    })
}

//update product
function updateProduct(req, res) {
    db.none('update products set title = ${title},price = ${price} , create_at = ${create_at} , tag = ${tag}  where id = ' + req.params.id,
        req.body)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Update one product'
                });
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        });
}


//USERS
//all users
function getAllUsers(req, res) {
    db.any(`select * from users `)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved all users'
                });
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        });
}

//get user by id
function getAllUsersByID(req, res) {
    db.any(`select * from users where id = ${req.params.id}`)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Retrieved users id:' +
                        req.params.id
                });
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        });
}

//insert user
function insertUsers(req, res) {
    db.any('insert into users(email, password, create_at)' +
        'values(${email}, ${password}, ${create_at})', req.body)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Inserted one user'
                });
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        });
}

function updateUsers(req, res) {
    db.none('update users set email = ${email},password = ${password} , create_at = ${create_at} where id = ' + req.params.id,
        req.body)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Update one users'
                });
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        });
}
function deleteUsers(req, res) {
    db.none('delete from users where id =' + req.params.id,
        req.body)
        .then(function (data) {
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Deleted one user'
                });
        })
        .catch(function (error) {
            console.log('ERROR:', error)
        })
}


module.exports = {
    getAllProducts,
    getProductByID,
    insertProducts,
    deleteProduct,
    updateProduct,
    getAllUsers,
    getAllUsersByID,
    insertUsers,
    updateUsers,
    deleteUsers

};