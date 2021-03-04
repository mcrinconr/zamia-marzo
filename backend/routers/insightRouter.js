import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Insight from '../models/insightModel.js';
import { isAdmin, isAuth } from '../utils.js';

const insightRouter = express.Router();

insightRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const insights = await Insight.find({});
    res.send(insights);
  })
);

insightRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Insight.remove({});
    const createdInsights = await Insight.insertMany(data.insights);
    res.send({ createdInsights });
  })
);

insightRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const insight = await Insight.findById(req.params.id)
    if (insight) {
      res.send(insight);
    } else {
      res.status(404).send({ message: 'Insight Not Found' });
    }
  })
);

insightRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const insight = new Insight({
      title: 'Título que describa tu empresa',
      text: 'resalta tu empresa',
      image: '/images/p1.jpg',
    });
    const createdInsight = await insight.save();
    res.send({ message: 'Insight Created', insight: createdInsight });
  })
);

insightRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const insightId = req.params.id;
    const insight = await Insight.findById(insightId);
    if (insight) {
      insight.title = req.body.title;
      insight.text = req.body.text;
      insight.image = req.body.image;
      const updatedInsight = await insight.save();
      res.send({ message: 'Insight Updated', insight: updatedInsight });
    } else {
      res.status(404).send({ message: 'Insight Not Found' });
    }
  })
);

insightRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const insight = await Insight.findById(req.params.id);
    if (insight) {
      const deleteInsight = await insight.remove();
      res.send({ message: 'Insight Deleted', insight: deleteInsight });
    } else {
      res.status(404).send({ message: 'Insight Not Found' });
    }
  })
);

export default insightRouter;
