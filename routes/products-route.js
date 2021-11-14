const {Router} = require('express');
const {postProduct, getProducts, putProducts, deleteProduct, findProduct} = require("../controllers/product-controller");
const {isAdmin} = require("../middlewares/role-validator");

const router = Router();

router.post('/',[
    isAdmin
], postProduct);



router.get('/', getProducts);

router.put('/:id',[
    isAdmin
], putProducts);

router.delete('/:id',[
    isAdmin
], deleteProduct);

router.get('/:id', findProduct);




module.exports = router;