import { Router } from "express";
import AuthController from "../controllers/AuthController";
const router = Router()

const Controller: AuthController = new AuthController()

router.post("/login", Controller.Login)
router.post("/register", Controller.Register)

export {router}