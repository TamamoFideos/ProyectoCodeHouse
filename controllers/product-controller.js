const ContainerProduct = require('../model/ContainerProduct')
const containerProduct = new ContainerProduct();

const postProduct = async (req, res) => {
    const {nombre, descripcion, foto, precio, stock} = req.body;
    const producto = {nombre, descripcion, foto, precio, stock};
    producto.timestamp = Date.now();
    let r = (Math.random() + 1).toString(36).substring(7);
    producto.codigo = `pro${nombre} ${r}`
    producto.id = await containerProduct.save(producto);
    res.json(producto);
}

const deleteProduct = async (req, res) => {
    const {id} = req.params;
    const product = await containerProduct.deleteById(id);
    if(product){
        return res.json(product);
    }
    res.status(404).json({
        msg : "Producto no encontrado"
    })
}

const findProduct = async (req, res) => {
    const {id} = req.params;
    const product = await containerProduct.getById(id);
    if(product){
        return res.json(product);
    }
    res.status(404).json({
        msg : "Producto no encontrado"
    })
}

const putProducts = async (req, res) => {
    const {id} = req.params;
    const {nombre, descripcion, foto, precio, stock} = req.body;
    const producto = {nombre, descripcion, foto, precio, stock};
    const product = await containerProduct.updateProduct(id, producto);
    if(product){
        return res.json(product);
    }
    res.status(404).json({
        msg : "Producto no encontrado"
    })
}

const getProducts = async (req, res) => {
    const products = await containerProduct.getAll();
    res.json(products);
}

module.exports = {
    postProduct,
    deleteProduct,
    findProduct,
    putProducts,
    getProducts
}