const express = require("express");
const UserClass = require("../../classes/UserClass.js");


const auth = express.Router()

auth.post("/signup", async (req, res) => {
    const body = req?.body


    try {
        const user = await UserClass.signUp(body);
        return res.json(user)
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
})

auth.post("/login", async (req, res) => {
    const {username, password} = req?.body


    try {
        if (username && password) {
            const login = await UserClass.login(username, password)
            return res.json(login)
        } else {
            return res.json({
                status: 400,
                message: `Credentials are required`
            })
        }
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }

})


// auth.post("/authenticated", async (req, res) => {
//   const body = req?.body
//
//   const user = new Parse.User();
//
//   user.set({username: body?.username, password: body?.password})
//
//   let authenticated = user.authenticated()
//
//   res.json(authenticated)
//
// })

auth.post('/logout', async (req, res) => {

})


module.exports = auth
