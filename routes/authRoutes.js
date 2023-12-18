import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    try {
      const data = authService.login(req.body)
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
);

export { router };
