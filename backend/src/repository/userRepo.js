import { db } from "../config/dbConfig.js"

export async function createUser(userName, userPassword) {
    try{
        const [result] = await db.query('INSERT INTO users (user_name,user_password) VALUES (?,?)', [userName, userPassword])
        if(result.affectedRows == 0){
            return false
        }else{
            return true 
        }
    }catch (err){
        console.log('ERROR CREANDO USUARIO, ERROR: ', err)
    }
}

export async function getUserByName(userName) {
    try{
        const [result] = await db.query('SELECT * FROM users WHERE user_name = ?', [userName])
        if(result.length == 0){
            return false
        }else{
            return result[0]
        }
    }catch (err){
        console.log('ERROR TRAYENDO USUARIO, ERROR: ', err)
    }
}