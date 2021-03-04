import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Highlight from '../models/highlightModel.js';
import { isAdmin, isAuth } from '../utils.js';

const highlightRouter = express.Router();

highlightRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const highlights = await Highlight.find({});
    res.send(highlights);
  })
);

highlightRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Highlight.remove({});
    const createdHighlights = await Highlight.insertMany(data.highlights);
    res.send({ createdHighlights });
  })
);

highlightRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const highlight = await Highlight.findById(req.params.id)
    if (highlight) {
      res.send(highlight);
    } else {
      res.status(404).send({ message: 'Highlight Not Found' });
    }
  })
);

highlightRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const highlight = new Highlight({
      title: 'Título que describa tu empresa',
      text: 'resalta tu empresa',
      image: '/images/p1.jpg',
    });
    const createdHighlight = await highlight.save();
    res.send({ message: 'Highlight Created', highlight: createdHighlight });
  })
);

highlightRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const highlightId = req.params.id;
    const highlight = await Highlight.findById(highlightId);
    if (highlight) {
      highlight.title = req.body.title;
      highlight.text = req.body.text;
      highlight.image = req.body.image;
      const updatedHighlight = await highlight.save();
      res.send({ message: 'Highlight Updated', highlight: updatedHighlight });
    } else {
      res.status(404).send({ message: 'Highlight Not Found' });
    }
  })
);

highlightRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const highlight = await Highlight.findById(req.params.id);
    if (highlight) {
      const deleteHighlight = await highlight.remove();
      res.send({ message: 'Highlight Deleted', highlight: deleteHighlight });
    } else {
      res.status(404).send({ message: 'Highlight Not Found' });
    }
  })
);

export default highlightRouter;
