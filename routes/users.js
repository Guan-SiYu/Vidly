const { User, validate } = require('../models/user')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

router.get('/api/', async (req, res) => {
    //使用joi验证请求的内容，如果请求中的name等属性不合法就返回400错误
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    //确保用户是否已经注册过了
    let newuser = User.findOne({ email: req.body.email })
    if (newuser) return res.status(400).send('已经有此用户注册过')

    //验证通过就在数据库创建新的用户(上面用的是let，所以这里可以重新赋值)
    newuser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    await newuser.save()
    res.send(newuser)
})
