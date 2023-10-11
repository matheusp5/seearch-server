import { Router } from "express";
import CategoryController from "../controllers/CategoryController";
const router = Router()

const controller: CategoryController = new CategoryController()

router.get("/:id", controller.FindOne)
router.get("/", controller.FindAll)
router.post("/", controller.SaveCategory)

export {router}