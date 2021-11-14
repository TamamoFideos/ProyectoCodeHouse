const ContainerCarrito = require('../model/ContainerCarrito');
const containerCarrito = new ContainerCarrito();

const postCarrito = async (req, res) => {
    const newCart = {
        timeStamp : Date.now(),
        products : []
    }
    newCart.id = await containerCarrito.save(newCart);
    res.json(newCart);
}

const deleteCarrito = async (req, res) => {
    const {id} = req.params;
    const carrito = await containerCarrito.deleteById(id);
    if(!carrito){
        return res.json({
            msg : 'Carrito or Product not found'
        })
    }
    res.json(carrito);
}

const deleteCarritoProduct = async (req, res) => {
    const {id, id_pro} = req.params;
    const carrito = await containerCarrito.deleteCartProductById(id, id_pro);
    if(!carrito){
        return res.json({
            msg : 'Carrito or Product not found'
        })
    }
    res.json(carrito);
}

const postProductCarrito = async (req, res) => {
    const {id, id_pro} = req.params;
    const carrito = await containerCarrito.addProduct(id, id_pro);
    if(!carrito){
        return res.json({
            msg : 'Carrito or Product not found'
        })
    }
    res.json(carrito);
}

const getCarritoProducts = async (req, res) => {
    const {id} = req.params;
    const carrito = await containerCarrito.getById(id);
    if(!carrito){
        return res.json({
            msg : 'Carrito not found'
        })
    }
    res.json({
        products : carrito.products
    });
}

module.exports = {
    postCarrito,
    deleteCarrito,
    deleteCarritoProduct,
    postProductCarrito,
    getCarritoProducts
}