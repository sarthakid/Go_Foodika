const express = require('express')
const router = express.Router()

router.post('/FoodData', (req,res)=>{
    try{
        res.send([global.Food_Items, global.Food_Category])
    }
    catch(error){
        console.error(error.message);
        res.send("Server Error")
    }
})

module.exports = router;