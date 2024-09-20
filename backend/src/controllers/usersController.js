import { createUser, getUserByName } from "../repository/userRepo.js"
import { userSchema } from "../schema/userSchema.js"
import { ZodError } from "zod"

export async function registerUserController(req, res) {
    try{
        let object = userSchema.parse(req.body)
        const result = await createUser(object.userName, object.userPassword)
        if(!result){
            return res.status(500).json({success: false, error: 'Query error'})
        }else{
            return res.status(200).json({success: true, message: 'User created successfuly'})
        }
    }catch(err){
        if(err instanceof ZodError){
            return res.status(500).json({success: false, error: err.errors})
        }
        return res.status(500).json({success: false, error: err})
    }
}

export async function loginUserController(req, res) {
    try{
        let object = userSchema.parse(req.body)
        const result = await getUserByName(object.userName)
        if(!result){
            return res.status(500).json({success: false, error: 'The user dosent exist'})
        }else if (!(result.user_password == object.userPassword)){
            return res.status(200).json({success: false, error: 'Wrong password'})
        }else{
            return res.status(200).json({success: true, message: 'User logged successfuly'})
        }
    }catch(err){
        if(err instanceof ZodError){
            return res.status(500).json({success: false, error: err.errors})
        }
        return res.status(500).json({success: false, error: err})
    }
}