import { Router } from "express"
import { calculateRoute } from "../controllers/graphController.js"

const router = Router()

router.post('/graph', calculateRoute)

export const graphRouter = router