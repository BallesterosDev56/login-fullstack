import { registerUserController, loginUserController } from "../controllers/usersController.js"
import { Router } from "express"

const router = Router()

router.post('/register', registerUserController)
router.post('/login', loginUserController)

export const userRouter = router