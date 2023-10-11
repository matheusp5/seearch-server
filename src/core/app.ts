import dotenv from "dotenv"
dotenv.config();
import express from "express"
import { router as HomeRouter } from "./routes/HomeRouter";
import { router as AuthRouter } from "./routes/AuthRouter";
import { router as CategoryRouter } from "./routes/CategoryRouter";
import { router as EstablishmentRouter } from "./routes/EstablishmentRouter";
const app = express()

app.use(express.json())

app.use("/api", HomeRouter)
app.use("/api/auth", AuthRouter)
app.use("/api/category", CategoryRouter)
app.use("/api/establishment", EstablishmentRouter)

export {app}