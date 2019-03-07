const express = require('express')
const routes = express.Router()

routes.get("/", (res, resp) => {
    res.send("!!");
})
