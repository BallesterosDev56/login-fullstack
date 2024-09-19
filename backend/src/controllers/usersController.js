import { createUser, getUserByName } from "../repository/userRepo.js"

export async function registerUserController(req, res) {
    let object = req.body
    try{
        const result = await createUser(object.userName, object.userPassword)
        if(!result){
            return res.status(500).json({success: false, error: 'Query error'})
        }else{
            return res.status(200).json({success: true, message: 'User created successfuly'})
        }
    }catch(err){
        res.status(500).json({success: false, error: err})
    }
}

export async function loginUserController(req, res) {
    let object = req.body
    try{
        const result = await getUserByName(object.userName)
        if(!result){
            return res.status(500).json({success: false, error: 'The user dosent exist'})
        }else if (!(result.user_password == object.userPassword)){
            return res.status(200).json({success: false, error: 'Wrong password'})
        }else{
            return res.status(200).json({success: true, message: 'User logged successfuly'})
        }
    }catch(err){
        res.status(500).json({success: false, error: err})
    }
}