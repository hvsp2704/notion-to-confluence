const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const connection = require('../connection');
const getPgParen = require('../controllers/getPgParen');
router.use(bodyParser.json());

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
    var sql = "SELECT ID,Parent FROM Internship_Task.Page;";
    connection.execute(sql,function (err,result){
        if(err) throw err;
        res.send(result);
    })
})



module.exports = router;