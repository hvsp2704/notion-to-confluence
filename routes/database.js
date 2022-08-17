const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const connection = require('../connection');
const getPgParen = require('../controllers/getPgParen');
router.use(bodyParser.json());
const delPages = require('../controllers/delPages');
const delDatabases = require('../controllers/delDatabases');
const delParas = require('../controllers/delParas');

router.get('/checkdb', async(req,res)=>{
    const ID = req.body.id;
    var sql = "SELECT EXISTS(SELECT * from `Internship_Task`.`Databases` WHERE ID ='"+ID+"');"
    connection.execute(sql,function (err,result){
        if(err) throw err;
        res.send(JSON.stringify(result[0]["EXISTS(SELECT * from `Internship_Task`.`Databases` WHERE ID ='"+ID+"')"]));
    })
});

router.get('/checkpg', async(req,res)=>{
    const ID = req.body.id;
    var sql = "SELECT EXISTS(SELECT * from `Internship_Task`.`Page` WHERE ID ='"+ID+"');"
    connection.execute(sql,function (err,result){
        if(err) throw err;
        res.send(JSON.stringify(result[0]["EXISTS(SELECT * from `Internship_Task`.`Page` WHERE ID ='"+ID+"')"]));
    })
});

router.get('/pgParen',async(req,res)=>{
    var sql = "SELECT ID,parentType FROM Internship_Task.Page;";
    connection.execute(sql,function (err,result){
        if(err) throw err;
        res.send(result);
    })
})

router.delete('/delPages', async(req,res)=>{
    var x = await delPages();
    res.send("Pages Deleted!")
})

router.delete('/delDatabases', async(req,res)=>{
    var x = await delDatabases();
    res.send("Databases Deleted!")
})

router.delete('/delParas', async(req,res)=>{
    var x = await delParas();
    res.send("Paragraphs Deleted!")
})

router.delete('/clearAll', async(req,res)=>{
    var x = await delParas();
    var x = await delDatabases();
    var x = await delPages();
    res.send("Backend Database Clear")
})

router.get('/indPages',async(req,res)=>{
    const l = await getPgParen();
    n = l.length;
    arr = [];
    for(var i = 0;i<n;i++){
        if ((l[i].parentType) == "workspace"){
            arr.push(l[i])
        }
    }
    res.send(arr);
})

router.get('/getDatabases',async(req,res)=>{
    var sql = "SELECT * from `Internship_Task`.`Databases`;"
    connection.execute(sql,function (err,result){
        if(err) throw err;
        res.send(result);
    })
})

router.get('/getConPages',async(req,res)=>{
    var ID = req.body.id;
    var sql = "SELECT * from `Internship_Task`.`Page` WHERE parentID = '"+ID+"';";
    connection.execute(sql,function (err,result){
        if(err) throw err;
        res.send(result);
    })
})

router.get('/getPara', async(req,res)=>{
    var ID = req.body.id;
    var sql = "SELECT * from `Internship_Task`.`para` WHERE parentID = '"+ID+"';";
    connection.execute(sql,function (err,result){
        if(err) throw err;
        res.send(result);
    })
})


module.exports = router ;