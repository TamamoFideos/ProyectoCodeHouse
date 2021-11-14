const {Router} = require('express');
const Container = require('../model/ContainerProduct');
const {postCarrito, getCarritoProducts, postProductCarrito, deleteCarrito, deleteCarritoProduct} = require("../controllers/carrito-controller");


const router = Router();

router.post('/', postCarrito);

router.get('/:id/productos', getCarritoProducts);

router.post('/:id/productos/:id_pro', postProductCarrito);

router.delete('/:id', deleteCarrito);

router.delete('/:id/productos/:id_pro', deleteCarritoProduct);





module.exports = router;