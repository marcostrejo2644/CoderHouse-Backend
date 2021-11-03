// import express, { Request, Response, NextFunction } from 'express';
// import {
//   listAllProducts,
//   getProductById,
//   addNewProduct,
//   editProduct,
//   deleteProduct,
//   getProductsFaker,
// } from '../controllers/products.controllers';
// import { logged } from '../server';

// const router = express.Router();

// const validateLogIn = (req: Request, res: Response, next: NextFunction) => {
//   if (logged.islogged) next();
//   else res.status(401).json({ msg: 'no estas autorizado' });
// };

// router.get('/getProductsFaker', validateLogIn, getProductsFaker);

// router.get('/listAllProducts', validateLogIn, listAllProducts);

// router.get('/list/:id', validateLogIn, getProductById);

// router.post('/save', validateLogIn, addNewProduct);

// router.put('/edit/:id', validateLogIn, editProduct);

// router.delete('/delete/:id', validateLogIn, deleteProduct);

// export default router;
