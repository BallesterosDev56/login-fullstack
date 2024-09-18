import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "basic_crud"
})

app.post("/register", async (req, res) => { // 8 
    let {userName, userPassword} = req.body
    try{
        const [result] = await db.query('INSERT INTO users (user_name,user_password) VALUES (?,?)', [userName,userPassword])
        if(result.affectedRows == 0){
            return res.status(500).json({success: false, error: 'Query error'})
        }else{
            return res.status(200).json({success: true, message: 'User created successfuly'})
        }
    }catch(err){
        res.status(500).json({success: false, error: err})
    }
})

app.post("/login", async (req, res) => { // 13
    let {userName, userPassword} = req.body
    try{
        const [result] = await db.query('SELECT * FROM users WHERE user_name = ?', [userName])
        if(result.length == 0){
            return res.status(500).json({success: false, error: 'The user dosent exist'})
        }else if (!(result[0].user_password == userPassword)){
            return res.status(200).json({success: false, error: 'Wrong password'})
        }else{
            return res.status(200).json({success: true, message: 'User logged successfuly'})
        }
    }catch(err){
        res.status(500).json({success: false, error: err})
    }
})

app.listen(3000, () => {console.log('corriendo')})