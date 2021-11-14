const fs = require('fs');

class ContainerProduct {
    constructor() {
        this.path = './db/products.txt';
    }
    async save (product){
        let id;
        let products;
        products = await this.getAll();
        if(products.length !== 0){
            const lastProduct = products[products.length-1];
            id = lastProduct.id + 1;
        }else{
            id = 1;
        }
        product.id = id;
        products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return id;
    }

    async getById(id){
        const products = await this.getAll();
        const product = await products.find( product => product.id == id);
        if(!product){
            return null
        }
        return product;
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

    async updateProduct (id, product){
        const products  = await this.getAll();
        const index = products.findIndex(product => product.id == id);
        if(index === -1){
            return null;
        }
        products[index] = product;
        products[index].id = id;
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return product;
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

module.exports = ContainerProduct;