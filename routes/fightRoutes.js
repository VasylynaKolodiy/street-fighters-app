import { Router } from "express";
import {fightService} from "../services/fightService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/",
  (req, res, next) => {
    try {
      const data = fightService.saveFight(req.body)
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
  "/",
  (req, res, next) => {
    try {
      const data = fightService.getFights()
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


export { router };
