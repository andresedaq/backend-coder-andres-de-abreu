import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

const getById = async (id) => {
    const carts = await cartsModel.findById(id);
    return carts;
}

const create = async (data) => {
    const carts = await cartsModel.create(data);
    return carts;
}

const addProductToCart = async (cid, pid) => {
    const product = await productModel.findById(pid);
    if (!product) return {
        product: false
    }

    await cartModel.findByIdAndUpdate(cid, {$push: {products: product} })

    const cart = await cartModel.findById(cid);
    if(!cart) return {
        cart: false
    }

    return cart;
}

export default {
    getById,
    create,
    addProductToCart
}