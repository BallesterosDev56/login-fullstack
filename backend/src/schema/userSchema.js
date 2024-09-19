import { z } from "zod"

export const userSchema = z.object({
    userName: z.string(),
    userPassword: z.string()
})