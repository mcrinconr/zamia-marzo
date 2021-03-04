import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Footer from '../models/footerModel.js';
import { isAdmin, isAuth } from '../utils.js';

const footerRouter = express.Router();

footerRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const footers = await Footer.find({});
    res.send(footers);
  })
);

footerRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Footer.remove({});
    const createdFooters = await Footer.insertMany(data.footers);
    res.send({ createdFooters });
  })
);

footerRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const footer = await Footer.findById(req.params.id)
    if (footer) {
      res.send(footer);
    } else {
      res.status(404).send({ message: 'Footer Not Found' });
    }
  })
);

footerRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const footerId = req.params.id;
    const footer = await Footer.findById(footerId);
    if (footer) {
      footer.nosotros = req.body.nosotros;
      footer.nosotrosParrafo = req.body.nosotrosParrafo;
      footer.nosotrosLinea1 = req.body.nosotrosLinea1;
      footer.nosotrosLinea2 = req.body.nosotrosLinea2;
      footer.nosotrosLinea3 = req.body.nosotrosLinea3;
      footer.enlaces = req.body.enlaces;
      footer.enlace1 = req.body.enlace1;
      footer.enlace2 =  req.body.enlace2;
      footer.social = req.body.social;
      footer.social1 = req.body.social1;
      footer.social2 = req.body.social2;
      footer.copyright = req.body.copyright;
      const updatedFooter = await footer.save();
      res.send({ message: 'Footer Updated', footer: updatedFooter });
    } else {
      res.status(404).send({ message: 'Footer Not Found' });
    }
  })
);


export default footerRouter;
