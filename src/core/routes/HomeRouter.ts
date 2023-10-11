import { Router } from "express";
import HomeController from "../controllers/HomeController";
const router = Router()
const Controller: HomeController = new HomeController() 

router.get("/", Controller.Index)

export {router}