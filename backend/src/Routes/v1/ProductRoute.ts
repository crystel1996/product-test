import express, { Router } from 'express';
import { ProductController } from './../../Controller/ProductController';

export class ProductRoute {

    _router: Router = express.Router();
    _controller: ProductController;

    constructor() {
        this._controller = new ProductController();
    }

    create () {
        if (this._router) {
            this._router.post('/create', this._controller.create);
        }
        return this._router;
    }

    update () {
        if (this._router) {
            this._router.post('/update', this._controller.update);
        }
        return this._router;
    }

    delete () {
        if (this._router) {
            this._router.post('/delete', this._controller.delete);
        }
        return this._router;
    }

    list () {
        if (this._router) {
            this._router.get('/list', this._controller.list);
        }
        return this._router;
    }

    product () {
        if (this._router) {
            this._router.post('/product', this._controller.product);
        }
        return this._router;
    }

}