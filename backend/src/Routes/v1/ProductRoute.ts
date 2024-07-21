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

}