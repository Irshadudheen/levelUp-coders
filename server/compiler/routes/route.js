const router = require('express').Router()
const {runCode} = require('../controller/compilerController')
router.post('/execute',runCode )
module.exports= router