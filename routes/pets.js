const express = require('express');
const Joi = require('@hapi/joi');

const Pet = require('../models/Pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

router.post('/', validateBody(Joi.object().keys({
    name: Joi.string().required().description('Pet name'),
    age: Joi.number().integer().required().description('Pet age'),
    colour: Joi.string().required().description('Pet colour'),
  }), { stripUnknown: true, }), async (req, res, next) => {
    try {
      const pet = new Pet(req.body);
      await pet.save();
      res.status(201).json(pet);
    } catch (e) {
      next(e);
    }
  }
);

router.get('/', (req, res, next) => {
    try {
        if (req.query.id) {
            Pet.findById(req.query.id, (err, data) => {
                if(err) return next(err);
                res.status(200).send(data);
            })
        } else {
            Pet.find((err, data) => {
                if(err) return next(err);
                res.status(200).send(data);
            })
        }
    } catch (error) {
        next(error)
    }
})

router.delete('/', (req, res, next) => {
    try {
        if (req.query.id) {
            Pet.findOneAndDelete(req.params.id, (err, data) => {
                if(err) return next(err);
                res.status(200).send(data);
            })
        } else {
            Pet.deleteMany((err) => {
                if(err) return next(err);
                res.status(200).send("All data deleted");
            })
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router;