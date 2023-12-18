import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

router.get(
  "/",
  (req, res, next) => {
    try {
      const data = fighterService.getFighters()
      res.data = data;
      res.status(200).json(res.data)
    } catch (err) {
      res.err = err;
      res.status(400).json({error: true, message: err.message})
    } finally {
      next();
    }
  },
  responseMiddleware
)

router.post(
  "/",
  (req, res, next) => {
    try {
      createFighterValid(req, res, next);
      const data = fighterService.createFighter(req.body)
      res.data = data;
      res.status(200).json(res.data)
    } catch (err) {
      res.err = err;
      res.status(400).json({error: true, message: err.message})
    } finally {
      next();
    }
  },
  responseMiddleware
)
router.get(
  "/:id",
  (req, res, next) => {
    try {
      const data = fighterService.createFighter(req.params)
      res.data = data;
      res.status(200).json(res.data)
    } catch (err) {
      res.err = err;
      res.status(400).json({error: true, message: err.message})
    } finally {
      next();
    }
  },
  responseMiddleware
)
router.delete(
  "/:id",
  (req, res, next) => {
    try {
      const data = fighterService.removeFighter(req.params)
      res.data = data;
      res.status(200).json(res.data)
    } catch (err) {
      res.err = err;
      res.status(400).json({error: true, message: err.message})
    } finally {
      next();
    }
  },
  responseMiddleware
)

router.put(
  "/:id",
  (req, res, next) => {
    try {
      updateFighterValid(req, res, next)
      const data = fighterService.editFighter(req.params, req.body)
      res.data = data;
      res.status(200).json(res.data)
    } catch (err) {
      // res.err = err;
      res.status(400).json({error: true, message: err.message});
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
