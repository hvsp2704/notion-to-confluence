const unirest = require('unirest');
require('dotenv').config();

var url = `${process.env.BASEURL}`+'/rest/api/content';
console.log(url);
const content = "<p><h1>alpha</h1></p>";
var req = unirest('POST', url)
  .headers({
    'Accept': 'application/json',
    'Authorization': `Basic ${process.env.PASSWORD}`
  })
  .type('json')
  .send({
      "space" : {"key" : `${process.env.SPACE}`},
      "type" : "page",
      "title" : `jsdkfgn`,
      "body" : {
          "storage":{
              "value":`${content}`,
              "representation" : "storage"
          }
      }
  })
  .end(function (res) { 
    if (res.error) throw new Error(res.error); 
    console.log(res.raw_body)
  });
