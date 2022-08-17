const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const getIndPages = require('../controllers/getIndPages');
const makeContent = require('../controllers/makeContent');
const unirest = require('unirest');
const makePage = require('../controllers/makePage');
const pgTitle = require('../controllers/pgTitle');
const getPara = require('../controllers/getPara');
const dtb = require('../controllers/databaseToTable');
const getType = require('../controllers/getType');
const res = require('express/lib/response');
router.use(bodyParser.json());
require('dotenv').config();
const delPages = require('../controllers/delPages');
const delDatabases = require('../controllers/delDatabases');
const delParas = require('../controllers/delParas');

router.post('/uploadIndPages',async(req,res)=>{
    const arr = await getIndPages();
    n = arr.length ;
    for(var i = 0; i<n; i++){
        var paralist = await getPara(arr[i].ID);
        var content = await makeContent(paralist);
        const title = await pgTitle(arr[i].ID);
        var something = await makePage(title,content);
    }
    res.send('Page uploaded to confluence');
})

router.post('/uploadDatabases',async(req,res)=>{
    function getToken() {
        return new Promise((resolve, reject) => {
          unirest
            .get('http://localhost:3005/database/getDatabases')
            .headers({
                'Content-Type': 'application/json'
              })
            .end(function (response) {
              if (response.error) {
                return reject(response.error)
              }
              return resolve(response.body);
            });
            })
          }
        var l = await getToken();
        var n = l.length;
        for(var i = 0;i<n; i++){
            var y = await getType(l[i].ID);
            const x = await dtb(l[i],y);
            
        }

        
    res.send("Database Uploaded");
})

router.post('/toConfluence',async(req,res)=>{

    //Phase 1: Calling data from notion and saving it.
    
    //To delete data of the previous call
    var x = await delParas();
    var x = await delDatabases();
    var x = await delPages();


    //Save all the pages of the notion workspace
    function hOne() {
      return new Promise((resolve, reject) => {
        unirest
          .post('http://localhost:3005/notion/savePages')
          .end(function (response) {
            if (response.error) {
              return reject(response.error)
            }
            return resolve(response.body);
          });
          })
        }
      var l = await hOne();


    //Save all the databases(containers of pages) of the notion workspace
    function hTwo() {
      return new Promise((resolve, reject) => {
        unirest
          .post('http://localhost:3005/notion/saveDatabases')
          .end(function (response) {
            if (response.error) {
              return reject(response.error)
            }
            return resolve(response.body);
          });
          })
        }
        var l = await hTwo();
    

    //Save content of all the pages
    function hThree() {
          return new Promise((resolve, reject) => {
            unirest
              .post('http://localhost:3005/notion/saveContent')
              .end(function (response) {
                if (response.error) {
                  return reject(response.error)
                }
                return resolve(response.body);
              });
              })
            }
          var l = await hThree();

    //Phase 2: Calling data from SQL and uploading to confluence


    //Uploads pages are not part of any database, independent pages.
    function getToken() {
        return new Promise((resolve, reject) => {
          unirest
            .post('http://localhost:3005/confluence/uploadIndPages')
            .end(function (response) {
              if (response.error) {
                return reject(response.error)
              }
              return resolve(response.body);
            });
            })
          }
          var l = await getToken();
    //Uploads all the databses and their pages with their content.
    function getTkn() {
      return new Promise((resolve, reject) => {
        unirest
          .post('http://localhost:3005/confluence/uploadDatabases')
          .end(function (response) {
            if (response.error) {
              return reject(response.error)
            }
            return resolve(response.body);
          });
          })
        }
      var l = await getTkn();
    res.send("Transfer Complete!");

})


module.exports = router;