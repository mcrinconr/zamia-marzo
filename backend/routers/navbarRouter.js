import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Navbar from '../models/navbarModel.js';
import { isAdmin, isAuth } from '../utils.js';

const navbarRouter = express.Router();

navbarRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const navbars = await Navbar.find({});
    res.send(navbars);
  })
);

navbarRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Navbar.remove({});
    const createdNavbars = await Navbar.insertMany(data.navbars);
    res.send({ createdNavbars });
  })
);

navbarRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const navbar = await Navbar.findById(req.params.id)
    if (navbar) {
      res.send(navbar);
    } else {
      res.status(404).send({ message: 'Navbar Not Found' });
    }
  })
);

navbarRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const navbarId = req.params.id;
    const navbar = await Navbar.findById(navbarId);
    if (navbar) {
      navbar.nombre = req.body.nombre;
      const updatedNavbar = await navbar.save();
      res.send({ message: 'Navbar Updated', navbar: updatedNavbar });
    } else {
      res.status(404).send({ message: 'Navbar Not Found' });
    }
  })
);


export default navbarRouter;
