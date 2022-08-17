const express = require('express');
const getDatabases = require('../controllers/getDatabases');
const saveDatabase = require('../controllers/saveDatabase');
const saveContent = require('../controllers/saveContent');
const getPages = require('../controllers/getPages');
const savePage = require('../controllers/savePage');
const getChildren = require('../controllers/getChildren')
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
require('dotenv').config();

router.get('/getDatabases', async(req,res)=>{
    const data = await getDatabases();
    res.send(data);
});

router.post('/saveDatabases',async(req,res)=>{
    const data = await getDatabases();
    const n = data.length;
    for (var i = 0;i<n;i++){
            await saveDatabase(data[i]);
    }
    res.send("Databases Saved!");
})

router.get('/getPages',async(req,res)=>{
    const data = await getPages();
    const n = data.length;
    for (var i = 0;i<n;i++){
        await savePage(data[i]);
    }
    res.send(data);
})

router.post('/savePages',async(req,res)=>{
    const data = await getPages();
    const n = data.length;
    for (var i = 0;i<n;i++){
            await savePage(data[i]);
    }
    res.send("Pages Saved!");
})

router.get('/getChildren', async (req,res)=>{
    const ID = req.body.id;
    const data = await getChildren(ID);
    res.send(data.results);
})

router.post('/saveContent', async(req,res)=>{
    const data = await getPages();
    const n = data.length;
    for (var i = 0;i<n;i++){
        console.log(data[i].id)
        await saveContent(data[i].id);
    }
    res.send("Content Saved!");   
})

module.exports = router;