import { Router } from "express";
import EstablishmentController from "../controllers/EstablishmentController";
const router = Router()

const controller: EstablishmentController = new EstablishmentController()

router.post("/", controller.SaveEstablishment)
router.get("/", controller.FindByCategory)
router.get("/search", controller.SearchEstablishments)
router.get("/all", controller.FindAll)
router.get("/find/:id", controller.FindOne)

export {router}