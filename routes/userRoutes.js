import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/",
  (req, res, next) => {
    try {
      createUserValid(req, res, next);
      const data = userService.createUser(req.body)
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

router.get(
  "/",
  (req, res, next) => {
    try {
      const data = userService.getUsers()
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
)

router.get(
  "/:id",
  (req, res, next) => {
    try {
      const data = userService.getUser(req.params)
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
router.put(
  "/:id",
  (req, res, next) => {
    try {
      updateUserValid(req, res, next)
      const data = userService.editUser(req.params, req.body)
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
router.delete(
  "/:id",
  (req, res, next) => {
    try {
      const data = userService.removeUser(req.params)
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
