const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const getIndPages = require('../controllers/getIndPages');
const makeContent = require('../controllers/makeContent');
const makePage = require('../controllers/makePage');
const pgTitle = require('../controllers/pgTitle');
const getPara = require('../controllers/getPara');
router.use(bodyParser.json());
require('dotenv').config();

router.post('/uploadIndPages',async(req,res)=>{
    const arr = await getIndPages();
    console.log("got pages",arr);
    n = arr.length ;
    for(var i = 0; i<n; i++){
        var paralist = await getPara(arr[i].ID);
        console.log("got para",paralist);
        var content = await makeContent(paralist);
        console.log("made content",content);
        // const title = await pgTitle(arr.ID);
        // console.log("got title",title);
        var something = await makePage("title",content);
        console.log("page made");
    }
    res.send('Page uploaded to confluence');
})


module.exports = router;