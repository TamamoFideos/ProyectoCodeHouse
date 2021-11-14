const fs = require('fs');

const ContainerProduct = require('./ContainerProduct');
const containerProduct = new ContainerProduct();

class ContainerCarrito {
    constructor() {
        this.path = './db/carrito.txt';
    }
    async save (cart){
        let id;
        let carts;
        carts = await this.getAll();
        if(carts.length !== 0){
            const lastProduct = carts[carts.length-1];
            id = lastProduct.id + 1;
        }else{
            id = 1;
        }
        cart.id = id;
        carts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        return id;
    }

    async getById(id){
        const carts = await this.getAll();
        const cart = await carts.find( product => product.id == id);
        if(!cart){
            return null
        }
        return cart;
    }

    async getAll(){
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        }catch (e){
            await fs.promises.writeFile(this.path, JSON.stringify([],null, 2));
            return [];
        }
    }

    async addProduct(idCart, productId){
        const cart = await this.getById(idCart);
        if(!cart){
            return null;
        }
        const carts = await this.getAll();
        const product = await containerProduct.getById(productId);
        if(!product){
            return null;
        }
        cart.products.push(product);
        const newCarts = carts.filter( producto => producto.id !== idCart);
        newCarts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(newCarts, null, 2));
        return cart;
    }

    async deleteCartProductById(idCart, idProduct){
        const cart = await this.getById(idCart);
        const carts = await this.getAll();
        if(!cart){
            return null;
        }
        let deleteProduct = null;
        cart.products.forEach(pro => {
            if(pro.id == idProduct){
                deleteProduct = pro;
            }
        });
        if(!deleteProduct){
            return null;
        }
        const newCarts = carts.filter( c => c.id !== idCart);
        console.log(newCarts);
        const newProducts = cart.products.filter( producto => producto.id !== deleteProduct.id);
        cart.products = newProducts;
        newCarts.push(cart);
        await fs.promises.writeFile(this.path, JSON.stringify(newCarts, null, 2));
        return cart;
    }

    async deleteById (id = 1){
        let products = await this.getAll();
        const deleteProduct = await this.getById(id);
        if(!deleteProduct){
            return null;
        }
        const newProducts = products.filter( producto => producto.id !== deleteProduct.id );
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2));
        return deleteProduct;
    }

    async deleteAll(){
        await fs.promises.writeFile(this.path, JSON.stringify([], null, 2));
    }
}

module.exports = ContainerCarrito;