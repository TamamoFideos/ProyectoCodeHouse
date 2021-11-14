const express = require('express');
require('dotenv').config();
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.productsPath = '/api/productos';
        this.carritoPath = '/api/carrito'

        this.middlewares();
        this.routes();
    }
    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }))
    }

    routes (){
        this.app.use(this.productsPath, require('./routes/products-route'));
        this.app.use(this.carritoPath, require('./routes/carrito-route'));
    }

    listen (){
        this.app.listen( this.port, () => {
            console.log(`This server is now running in port: ${this.port}`);
        })
    }
}

module.exports = Server;