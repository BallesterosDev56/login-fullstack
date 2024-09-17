import express from 'express'
import mysql from 'mysql2/promise'

const app = express()
app.use(express.json())

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
            return res.status(200).json({success: true, error: 'User created successfuly'})
        }
    }catch(err){
        res.status(500).json({success: false, error: err})
    }
})

app.listen(3000, () => {console.log('corriendo')})